import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender is required'],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Receiver is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

friendRequestSchema.pre('validate', function validateParticipants() {
  if (this.sender && this.receiver && this.sender.equals(this.receiver)) {
    this.invalidate('receiver', 'You cannot send a friend request to yourself');
  }
});

friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });
friendRequestSchema.index({ receiver: 1, status: 1, createdAt: -1 });
friendRequestSchema.index({ sender: 1, status: 1, createdAt: -1 });

friendRequestSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id,
    sender: this.sender,
    receiver: this.receiver,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;
