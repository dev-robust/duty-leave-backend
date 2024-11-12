// backend/controllers/eventController.js
import { admin } from '../config/firebaseConfig.mjs'; // Import the Firebase Admin instance
import { db } from '../config/firebaseConfig.mjs';
// Request leave and create an event
export const requestLeave = async (req, res) => {
  try {
    const { uid, eventDetails } = req.body;
    const eventRef = db.collection('events').doc(); // Create a new event in Firestore
    await eventRef.set({ uid, ...eventDetails });

    res.status(200).json({ message: 'Leave requested successfully', eventId: eventRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error requesting leave: ' + error.message });
  }
};

// Get all events for the user
export const getEvents = async (req, res) => {
  try {
    const { uid } = req.query; // Get user id from query parameters
    const events = [];
    const snapshot = await db.collection('events').where('uid', '==', uid).get();

    snapshot.forEach(doc => events.push({ id: doc.id, ...doc.data() }));
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events: ' + error.message });
  }
};
