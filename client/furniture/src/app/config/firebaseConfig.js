import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA-I9DwIAYQHfOyYwxpG8ng8UEKLHXj_cU",
  authDomain: "furniture-f34ee.firebaseapp.com",
  projectId: "furniture-f34ee",
  storageBucket: "furniture-f34ee.firebasestorage.app",
  messagingSenderId: "13282885106",
  appId: "1:13282885106:web:fd36a5b495d8fd4a803f6b"
};

export const app = initializeApp(firebaseConfig);