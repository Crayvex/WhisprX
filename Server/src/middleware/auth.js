import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { verifyAccessToken } from '../utils/tokens.js';

const extractAccessToken = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return req.cookies?.accessToken;
};

export const authenticate = async (req, res, next) => {
  try {
    const token = extractAccessToken(req);

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    req.user = user;
    req.auth = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      next(new AppError('Invalid or expired access token', 401));
      return;
    }

    next(error);
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    next(new AppError('Authentication required', 401));
    return;
  }

  if (!roles.includes(req.user.role)) {
    next(new AppError('You do not have permission to perform this action', 403));
    return;
  }

  next();
};

export const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = extractAccessToken(req);

    if (!token) {
      next();
      return;
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId);

    if (user) {
      req.user = user;
      req.auth = decoded;
    }

    next();
  } catch {
    next();
  }
};
