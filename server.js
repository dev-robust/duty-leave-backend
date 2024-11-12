import { readFileSync } from 'fs';
import path from 'path';
import * as admin from 'firebase-admin';  // Firebase Admin SDK for backend

// For reading the service account credentials locally (during development)
const serviceAccountPath = path.resolve('config', 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK for backend operations
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  // Use the service account key to initialize the Admin SDK
});

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { authMiddleware, adminOnly } from './middleware/authMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import sendReminderForCertificateUpload from './utils/reminder.js'; // Ensure the path is correct

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Middleware and route setup
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/api/admin', authMiddleware, adminOnly, adminRoutes);

// Set the port for local development or production environment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Schedule reminders once per day
  setInterval(sendReminderForCertificateUpload, 24 * 60 * 60 * 1000); // 24 hours
});
