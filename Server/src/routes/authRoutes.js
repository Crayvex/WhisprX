import { Router } from 'express';
import {
  getMe,
  listUsers,
  login,
  logout,
  refreshAccessToken,
  register,
  updateMe,
  updateUserRole,
} from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', authenticate, logout);

router.get('/me', authenticate, getMe);
router.put('/update-profile', authenticate, updateMe);

router.get('/users', authenticate, authorize('admin'), listUsers);
router.patch('/users/:userId/role', authenticate, authorize('admin'), updateUserRole);

export default router;
