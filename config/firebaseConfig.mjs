import { readFileSync } from 'fs';
import path from 'path';

const serviceAccountPath = path.resolve('config', 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyDquyHA64G7hwNzpZG4LY0HWZ4TOG99rls",
  authDomain: "duty-leave-app.firebaseapp.com",
  projectId: "duty-leave-app",
  storageBucket: "duty-leave-app.firebasestorage.app",
  messagingSenderId: "1062670502477",
  appId: "1:1062670502477:web:878a9d8a05ba3914abaa04",
  measurementId: "G-FSJ3ZYMTZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Admin SDK with service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export the db for client-side Firestore usage
export { db, admin };
