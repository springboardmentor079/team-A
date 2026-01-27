import mongoose from 'mongoose';

const petitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
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
  targetSignatures: {
    type: Number,
    default: 100
  },
  signatures: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    signedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'achieved'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Petition', petitionSchema);
