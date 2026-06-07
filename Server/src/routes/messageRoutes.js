import { Router } from "express";
import { getChat, sendMessage } from "../controllers/messagesController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post('/send-msg/:id', authenticate, sendMessage);

router.get('/get-chat/:id', authenticate, getChat)

export default router;