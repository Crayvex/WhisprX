import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender is required'],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Receiver is required'],
    },
    text: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre('validate', function validateContent() {
  if (!this.text?.trim() && !this.img) {
    this.invalidate('text', 'Message must contain text or an image');
  }
});

messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });
messageSchema.index({ receiverId: 1, senderId: 1, createdAt: -1 });

messageSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id,
    senderId: this.senderId,
    receiverId: this.receiverId,
    text: this.text,
    img: this.img,
    readAt: this.readAt,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Message = mongoose.model('Message', messageSchema);

export default Message;
