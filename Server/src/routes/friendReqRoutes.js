import { Router } from 'express';
import {
  acceptReq,
  cancelReq,
  getFriends,
  getIncomingRequests,
  getSentRequests,
  rejectReq,
  sendReq,
} from '../controllers/friendReqController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/send-req/:id', authenticate, sendReq);
router.patch('/accept-req/:id', authenticate, acceptReq);
router.patch('/reject-req/:id', authenticate, rejectReq);
router.delete('/cancel-req/:id', authenticate, cancelReq);
router.get('/incoming', authenticate, getIncomingRequests);
router.get('/sent', authenticate, getSentRequests);
router.get('/friends', authenticate, getFriends);

export default router;
