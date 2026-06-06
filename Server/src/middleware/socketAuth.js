import { verifyAccessToken } from '../utils/tokens.js';

const extractSocketToken = (socket) => {
  const authToken = socket.handshake.auth?.token;

  if (authToken) {
    return authToken.startsWith('Bearer ') ? authToken.slice(7) : authToken;
  }

  const cookieHeader = socket.handshake.headers.cookie;

  if (!cookieHeader) {
    return null;
  }

  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((part) => {
      const [key, ...valueParts] = part.trim().split('=');
      return [key, decodeURIComponent(valueParts.join('='))];
    })
  );

  return cookies.accessToken || null;
};

export const socketAuth = async (socket, next) => {
  try {
    const token = extractSocketToken(socket);

    if (!token) {
      next(new Error('Authentication required'));
      return;
    }

    const decoded = verifyAccessToken(token);
    socket.userId = decoded.userId;
    socket.userRole = decoded.role;
    next();
  } catch {
    next(new Error('Invalid or expired token'));
  }
};

export default socketAuth;
