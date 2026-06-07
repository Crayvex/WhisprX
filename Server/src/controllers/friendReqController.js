import FriendRequest from '../models/FriendReq.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const sendReq = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const { id: receiverId } = req.params;

  if (!receiverId) {
    throw new AppError('Receiver id is required', 400);
  }

  if (sender.equals(receiverId)) {
    throw new AppError('You cannot send a friend request to yourself', 400);
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new AppError('User not found', 404);
  }

  const reversePending = await FriendRequest.findOne({
    sender: receiverId,
    receiver: sender,
    status: 'pending',
  });

  if (reversePending) {
    reversePending.status = 'accepted';
    await reversePending.save();

    return res.status(200).json({
      success: true,
      message: 'Friend request accepted',
      data: reversePending.toPublicJSON(),
    });
  }

  const existing = await FriendRequest.findOne({ sender, receiver: receiverId });

  if (existing) {
    if (existing.status === 'accepted') {
      throw new AppError('You are already friends with this user', 409);
    }

    if (existing.status === 'pending') {
      throw new AppError('Friend request already pending', 409);
    }

    existing.status = 'pending';
    await existing.save();

    return res.status(200).json({
      success: true,
      message: 'Friend request sent successfully',
      data: existing.toPublicJSON(),
    });
  }

  const newFriendReq = await FriendRequest.create({
    sender,
    receiver: receiverId,
  });

  res.status(201).json({
    success: true,
    message: 'Friend request sent successfully',
    data: newFriendReq.toPublicJSON(),
  });
});

export const acceptReq = asyncHandler(async (req, res) => {
  const receiverId = req.user._id;
  const { id: senderId } = req.params;

  if (!senderId) {
    throw new AppError('Sender id is required', 400);
  }

  const friendRequest = await FriendRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: 'pending',
  });

  if (!friendRequest) {
    throw new AppError('Friend request not found', 404);
  }

  friendRequest.status = 'accepted';
  await friendRequest.save();

  res.status(200).json({
    success: true,
    message: 'Friend request accepted',
    data: friendRequest.toPublicJSON(),
  });
});

export const rejectReq = asyncHandler(async (req, res) => {
  const receiverId = req.user._id;
  const { id: senderId } = req.params;

  if (!senderId) {
    throw new AppError('Sender id is required', 400);
  }

  const friendRequest = await FriendRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: 'pending',
  });

  if (!friendRequest) {
    throw new AppError('Friend request not found', 404);
  }

  friendRequest.status = 'rejected';
  await friendRequest.save();

  res.status(200).json({
    success: true,
    message: 'Friend request rejected',
    data: friendRequest.toPublicJSON(),
  });
});

export const cancelReq = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { id: receiverId } = req.params;

  if (!receiverId) {
    throw new AppError('Receiver id is required', 400);
  }

  const friendRequest = await FriendRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: 'pending',
  });

  if (!friendRequest) {
    throw new AppError('Friend request not found', 404);
  }

  await friendRequest.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Friend request cancelled',
  });
});

export const getIncomingRequests = asyncHandler(async (req, res) => {
  const requests = await FriendRequest.find({
    receiver: req.user._id,
    status: 'pending',
  })
    .populate('sender', 'username email profilePic')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: requests.length,
    requests: requests.map((request) => ({
      ...request.toPublicJSON(),
      sender: request.sender?.toPublicJSON?.() ?? request.sender,
    })),
  });
});

export const getSentRequests = asyncHandler(async (req, res) => {
  const requests = await FriendRequest.find({
    sender: req.user._id,
    status: 'pending',
  })
    .populate('receiver', 'username email profilePic')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: requests.length,
    requests: requests.map((request) => ({
      ...request.toPublicJSON(),
      receiver: request.receiver?.toPublicJSON?.() ?? request.receiver,
    })),
  });
});

export const getFriends = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const friendships = await FriendRequest.find({
    status: 'accepted',
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate('sender', 'username email profilePic')
    .populate('receiver', 'username email profilePic')
    .sort({ updatedAt: -1 });

  const friends = friendships
    .map((friendship) => {
      const friend =
        friendship.sender?._id?.equals(userId) ? friendship.receiver : friendship.sender;

      return friend?.toPublicJSON?.() ?? null;
    })
    .filter(Boolean);

  res.status(200).json({
    success: true,
    count: friends.length,
    friends,
  });
});
