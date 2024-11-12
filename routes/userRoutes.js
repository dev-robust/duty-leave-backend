// routes/userRoutes.js
import express from 'express';
import { registerUser, getUserDetails } from '../controllers/userController.js';  // Ensure correct import
const router = express.Router();

// Route to register a user
router.post('/register', registerUser);
// Example in userRoutes.js
router.post("/login", userController.loginUser);

// Route to get user details by ID
router.get('/:userId', getUserDetails);

export default router;
