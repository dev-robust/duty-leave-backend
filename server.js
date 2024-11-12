import express from "express";
import cors from "cors";
import axios from "axios";
import { authMiddleware, adminOnly } from "./middleware/authMiddleware.js";  // Import both
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import sendReminderForCertificateUpload from "./utils/reminder.js"; // Ensure the path is correct

const app = express();

app.use(cors());
app.use(express.json());

// Middleware and route setup
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/events", authMiddleware, eventRoutes);
app.use("/api/admin", authMiddleware, adminOnly, adminRoutes);

app.listen(`https://duty-leave-frontend19.vercel.app/`, () => {
  console.log("Server running on http://localhost:3000");

  // Schedule reminders
  setInterval(sendReminderForCertificateUpload, 24 * 60 * 60 * 1000); // Once per day
});
