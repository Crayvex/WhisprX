import Message from '../models/Message.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const { text, img } = req.body;
  const senderId = req.user._id;
  const { id: receiverId } = req.params;

  if (!receiverId) {
    throw new AppError('Receiver id is required', 400);
  }

  if (!text?.trim() && !img?.trim()) {
    throw new AppError('Text or image is required', 400);
  }

  if (senderId.equals(receiverId)) {
    throw new AppError('You cannot message yourself', 400);
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new AppError('Receiver not found', 404);
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    img,
  });

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: newMessage.toPublicJSON(),
  });
});

export const getChat = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { id: receiverId } = req.params;

  if (!receiverId) {
    throw new AppError('Receiver id is required', 400);
  }

  if (senderId.equals(receiverId)) {
    throw new AppError('Invalid chat', 400);
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new AppError('User not found', 404);
  }

  await Message.updateMany(
    {
      senderId: receiverId,
      receiverId: senderId,
      readAt: null,
    },
    { readAt: new Date() }
  );

  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    count: messages.length,
    messages: messages.map((msg) => msg.toPublicJSON()),
  });
});

