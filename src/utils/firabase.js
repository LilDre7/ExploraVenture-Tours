// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE,
  appId: process.env.FIREBASE_APP_ID,
};

const fireBaseApp = initializeApp(firebaseConfig);

const storage = getStorage(fireBaseApp);

module.exports = { storage };
