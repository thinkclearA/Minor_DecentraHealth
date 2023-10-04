import { initializeApp } from 'firebase/app';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8gABqn8ga_qJtrPN0sZxED-16ErYY_ZQ",
    authDomain: "decentrahealth-6f444.firebaseapp.com",
    projectId: "decentrahealth-6f444",
    storageBucket: "decentrahealth-6f444.appspot.com",
    messagingSenderId: "995410992318",
    appId: "1:995410992318:web:5322a491d0fef76c9f12ef"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "it";
export default auth;