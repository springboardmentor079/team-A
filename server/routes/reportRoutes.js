import express from 'express';
import { 
  createReport, 
  getReports, 
  getReportById, 
  updateReportStatus 
} from '../controllers/reportController.js';
import { protect, admin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(protect, getReports)
  .post(protect, upload.array('images', 5), createReport);

router.get('/:id', protect, getReportById);
router.put('/:id/status', protect, admin, updateReportStatus);

export default router;
