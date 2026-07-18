import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Replace these values with YOUR Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDR4hxmmIZWTdauT7B-5W6bshfyURxiuEU",
  authDomain: "login-21e21.firebaseapp.com",
  projectId: "login-21e21",
  storageBucket: "login-21e21.firebasestorage.app",
  messagingSenderId: "142882208838",
  appId: "1:142882208838:web:6ca22fe9324451dbd51e47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const logout = document.getElementById("logout");

if (signup) {
  signup.onclick = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        alert("Account created successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

if (login) {
  login.onclick = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        window.location.href = "home.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

if (logout) {
  logout.onclick = () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  };
}

onAuthStateChanged(auth, (user) => {
  if (location.pathname.includes("home.html") && !user) {
    window.location.href = "index.html";
  }
});
