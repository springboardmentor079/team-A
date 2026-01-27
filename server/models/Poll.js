import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Transport', 'Education', 'Safety', 'Women Safety', 'Healthcare', 'Environment', 'Infrastructure', 'Employment', 'Housing', 'Other']
  },
  location: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    votes: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      votedAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  expiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Poll', pollSchema);
