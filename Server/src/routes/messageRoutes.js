import { Router } from "express";
import { deleteMessage, getChat, sendMessage, updateMessage } from "../controllers/messagesController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post('/send-msg/:id', authenticate, sendMessage);

router.get('/get-chat/:id', authenticate, getChat)

router.patch('/update-msg/:id', authenticate, updateMessage)

router.delete('/delete-msg/:id', authenticate, deleteMessage)

export default router;