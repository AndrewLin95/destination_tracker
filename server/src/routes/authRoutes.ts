import express, { Express, Request, Response } from 'express';
const authController = require('../controller/authController');
const router = express.Router();

router.get('/', authController.getAuth)

export default router