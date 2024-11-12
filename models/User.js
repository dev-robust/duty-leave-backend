const { db } = require("../config/firebaseConfig.mjs");

class User {
  static async createUser(data) {
    const userRef = db.collection("users").doc(data.uid);
    await userRef.set(data);
  }

  static async getUser(uid) {
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    return doc.exists ? doc.data() : null;
  }
}

module.exports = User;
