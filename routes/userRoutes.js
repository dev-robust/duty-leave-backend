// routes/userRoutes.js
import express from 'express';
import { registerUser, getUserDetails, loginUser } from '../controllers/userController.js';  // Import all needed functions

const router = express.Router();

// Route to register a user
router.post('/register', registerUser);

// Route to log in a user
router.post("/login", loginUser);  // Use the imported loginUser function

// Route to get user details by ID
router.get('/:userId', getUserDetails);

export default router;
