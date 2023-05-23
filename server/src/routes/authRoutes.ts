import express from 'express';
import { signUp } from '../controller/authController';
const router = express.Router();

router.get('/signUp', signUp)

export default router