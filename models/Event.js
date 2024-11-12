// Event.js
import { db } from '../config/firebaseConfig.mjs';

class Event {
  static async createEvent(data) {
    const eventRef = db.collection("events").doc();
    await eventRef.set(data);
  }

  static async getEventsByUser(uid) {
    const events = [];
    const snapshot = await db.collection("events").where("uid", "==", uid).get();
    snapshot.forEach(doc => events.push({ id: doc.id, ...doc.data() }));
    return events;
  }

  static async getAllEvents() {
    const events = [];
    const snapshot = await db.collection("events").get();
    snapshot.forEach(doc => events.push({ id: doc.id, ...doc.data() }));
    return events;
  }

  static async updateEventStatus(eventId, status) {
    const eventRef = db.collection("events").doc(eventId);
    await eventRef.update({ status });
  }

  static async markCertificateUploaded(eventId, certificateUrl) {
    const eventRef = db.collection("events").doc(eventId);
    await eventRef.update({ certificateUrl, status: "Certificate Uploaded" });
  }
}

export default Event;  // Default export
