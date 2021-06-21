import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACK_APP_API_KEY,
  authDomain: process.env.REACK_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACK_APP_DATABASE_URL,
  projectId: process.env.REACK_APP_PROJECT_ID,
  storageBucket: process.env.REACK_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACK_APP_MESSAGIND_SENDER_ID,
  appId: process.env.REACK_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const database = firebase.database;
