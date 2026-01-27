import express from 'express';
import { createPoll, getPolls, getPollById, votePoll } from '../controllers/pollController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPolls)
  .post(protect, createPoll);

router.get('/:id', getPollById);
router.post('/:id/vote', protect, votePoll);

export default router;
