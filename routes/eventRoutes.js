// backend/routes/eventRoutes.js
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Middleware for auth
import { requestLeave, getEvents } from '../controllers/eventController.js';

const router = express.Router();

// Route to request leave (protected by authMiddleware)
router.post('/request-leave', authMiddleware, requestLeave);

// Route to get all events (protected by authMiddleware)
router.get('/events', authMiddleware, getEvents);

export default router;
