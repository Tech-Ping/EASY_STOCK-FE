// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCe3ood_SKWn4nK8C5ew8L6akOF8t7KWoc",
  authDomain: "easy-stock-4929e.firebaseapp.com",
  projectId: "easy-stock-4929e",
  storageBucket: "easy-stock-4929e.firebasestorage.app",
  messagingSenderId: "533808782901",
  appId: "1:533808782901:web:e10a3c52c135f057ed9b7c",
  measurementId: "G-6TQYJBHC7K"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();