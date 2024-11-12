import express from 'express';
import { reviewLeaveRequest, markCertificateAsUploaded } from '../controllers/adminController.js'; // Import controller methods

const router = express.Router();

router.post("/review-leave", reviewLeaveRequest);  // Route for reviewing leave requests
router.post("/upload-certificate", markCertificateAsUploaded);  // Route for marking certificate as uploaded

export default router;  // Export the router as the default export
