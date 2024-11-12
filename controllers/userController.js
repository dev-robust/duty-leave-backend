// controllers/userController.js
import jwt from 'jsonwebtoken';  // For generating JWT tokens
import User from '../models/User.js';  // Assuming you have a User model for database operations

import bcrypt from 'bcryptjs';

// Function to register a new user
export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password before saving to database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  try {
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    // Send response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Function to log in a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Compare entered password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send the response with the token
  res.status(200).json({ message: "Login successful", token });
};

// Function to get user details by ID
export const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  // Find the user by ID
  try {
    const user = await User.findById(userId).select('-password');  // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user details
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};
