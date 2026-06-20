import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import cloudinary from '../config/cloudinary.js';
import {
  buildTokenPayload,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/tokens.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 6 * 60 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
};

const issueTokens = async (user, res) => {
  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setAuthCookies(res, accessToken, refreshToken);

  return { accessToken, refreshToken };
};

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    throw new AppError('Username, email, and password are required', 400);
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new AppError('Email or username is already registered', 409);
  }

  const user = await User.create({
    username,
    email,
    password,
    ...(role === 'admin' && process.env.ALLOW_ADMIN_REGISTRATION === 'true'
      ? { role: 'admin' }
      : {}),
  });

  await issueTokens(user, res);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: user.toPublicJSON(),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const user = await User.findOne({ email }).select('+password +refreshToken');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  await issueTokens(user, res);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: user.toPublicJSON(),
  });
});

export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    req.user.refreshToken = undefined;
    await req.user.save({ validateBeforeSave: false });
  }

  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user.toPublicJSON(),
  });
});

export const updateMe = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    throw new AppError('Profile picture is required', 400);
  }

  const uploadResponse = await cloudinary.uploader.upload(profilePic);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic: uploadResponse.secure_url },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: updatedUser.toPublicJSON(),
  });
});

export const deleteMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  if(!userId) {
    throw new AppError("User Id is Required", 400)
  }
  
  const user = await User.findById(userId);
  
  if(!user){
    throw new AppError("User Does NOT Exist", 404)
  }
  
  await User.deleteOne(user)
  
  res.status(200).json({
    success: true,
    message: 'User Deleted',
  });

})

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!refreshToken) {
    throw new AppError('Refresh token is required', 401);
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  const user = await User.findById(decoded.userId).select('+refreshToken');

  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError('Invalid refresh token', 401);
  }

  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: 'Access token refreshed',
    accessToken,
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { userId } = req.params;

  if (!['user', 'admin'].includes(role)) {
    throw new AppError('Role must be either user or admin', 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user._id.equals(req.user._id)) {
    throw new AppError('You cannot change your own role', 400);
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User role updated',
    user: user.toPublicJSON(),
  });
});

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    users: users.map((user) => user.toPublicJSON()),
  });
});

export const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const currentUserId = req.user._id;

  if (!query || query.trim() === '') {
    return res.status(200).json({
      success: true,
      users: [],
    });
  }

  const users = await User.find({
    $and: [
      { _id: { $ne: currentUserId } },
      {
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      },
    ],
  }).limit(20);

  res.status(200).json({
    success: true,
    count: users.length,
    users: users.map((user) => user.toPublicJSON()),
  });
});
