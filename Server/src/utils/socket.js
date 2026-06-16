let ioInstance = null;
const onlineUsers = new Map();

export const initSocket = (io) => {
  ioInstance = io;
};

export const addOnlineUser = (userId, socketId) => {
  const userSockets = onlineUsers.get(userId) || new Set();
  userSockets.add(socketId);
  onlineUsers.set(userId, userSockets);
};

export const removeOnlineUser = (socketId) => {
  for (const [userId, socketSet] of onlineUsers.entries()) {
    if (socketSet.has(socketId)) {
      socketSet.delete(socketId);
      if (socketSet.size === 0) {
        onlineUsers.delete(userId);
      } else {
        onlineUsers.set(userId, socketSet);
      }
      return userId;
    }
  }
  return null;
};

export const getOnlineUsers = () => [...onlineUsers.keys()];

export const emitToUser = (userId, event, payload) => {
  if (!ioInstance) return;
  const socketSet = onlineUsers.get(userId);
  if (!socketSet) return;

  for (const socketId of socketSet) {
    ioInstance.to(socketId).emit(event, payload);
  }
};

export const broadcastOnlineUsers = () => {
  if (!ioInstance) return;
  ioInstance.emit('getOnlineUsers', getOnlineUsers());
};
