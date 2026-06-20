import { Router } from 'express';
import {
  deleteMe,
  getMe,
  listUsers,
  login,
  logout,
  refreshAccessToken,
  register,
  searchUsers,
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
router.get('/search', authenticate, searchUsers);
router.get('/users', authenticate, authorize('admin'), listUsers);

router.put('/update-profile', authenticate, updateMe);
router.delete('/delete-profile', authenticate, deleteMe);
router.patch('/users/:userId/role', authenticate, authorize('admin'), updateUserRole);

export default router;