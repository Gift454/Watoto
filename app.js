// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM8nevINzAsc2t5e1GrpXqYhkB7iVciTU",
  authDomain: "watoto-d3928.firebaseapp.com",
  projectId: "watoto-d3928",
  storageBucket: "watoto-d3928.appspot.com",
  messagingSenderId: "830266640596",
  appId: "1:830266640596:web:1510452e34692f90c91341",
  measurementId: "G-53XXY7KYYY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Redirect to main page
      window.location.href = "main.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Register
document.getElementById("register-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Registration successful! Please login.");
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    // Redirect to main.html if user is logged in and on index.html
    if (window.location.pathname.endsWith("index.html")) {
      window.location.href = "main.html";
    }
  } else {
    console.log("No user is logged in.");
    // Redirect to index.html if user is logged out and on main.html
    if (window.location.pathname.endsWith("main.html")) {
      window.location.href = "index.html";
    }
  }
});