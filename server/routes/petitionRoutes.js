import express from 'express';
import { 
  createPetition, 
  getPetitions, 
  getPetitionById, 
  signPetition,
  getSignedPetitions 
} from '../controllers/petitionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPetitions)
  .post(protect, createPetition);

router.get('/signed', protect, getSignedPetitions);
router.get('/:id', getPetitionById);
router.post('/:id/sign', protect, signPetition);

export default router;
