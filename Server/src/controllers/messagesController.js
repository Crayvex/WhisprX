import cloudinary from '../config/cloudinary.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { emitToUser } from '../utils/socket.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const { text, img } = req.body;
  const senderId = req.user._id;
  const { id: receiverId } = req.params;

  if (!receiverId) {
    throw new AppError('Receiver id is required', 400);
  }

  const hasText = Boolean(text?.trim());
  const hasImg = typeof img === 'string' && Boolean(img.trim());

  if (!hasText && !hasImg) {
    throw new AppError('Text or image is required', 400);
  }

  if (senderId.equals(receiverId)) {
    throw new AppError('You cannot message yourself', 400);
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new AppError('Receiver not found', 404);
  }

  let imgURL;
  if (hasImg) {
    const uploadResponse = await cloudinary.uploader.upload(img);
    imgURL = uploadResponse.secure_url;
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    img: imgURL,
  });

  const payload = newMessage.toPublicJSON();
  emitToUser(receiverId.toString(), 'receiveMessage', payload);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: payload,
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