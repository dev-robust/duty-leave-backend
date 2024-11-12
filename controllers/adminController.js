import Event from '../models/Event.js';  // Import Event class as default export

export const reviewLeaveRequest = async (req, res) => {
  try {
    const { eventId, status } = req.body;
    await Event.updateEventStatus(eventId, status);
    res.status(200).json({ message: `Request ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markCertificateAsUploaded = async (req, res) => {
  try {
    const { eventId, certificateUrl } = req.body;
    await Event.markCertificateUploaded(eventId, certificateUrl);
    res.status(200).json({ message: "Certificate marked as uploaded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
