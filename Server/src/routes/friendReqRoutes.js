import { Router } from "express";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post('/send-req', authenticate)