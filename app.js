import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDR4hxmmIZWTdauT7B-5W6bshfYuRxiuEU",
  authDomain: "login-21e21.firebaseapp.com",
  projectId: "login-21e21",
  storageBucket: "login-21e21.firebasestorage.app",
  messagingSenderId: "142882208838",
  appId: "1:142882208838:web:6ca22fe9324451dbd51e47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("signup")?.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Account Created Successfully");
  } catch (e) {
    alert(e.message);
  }
});

document.getElementById("login")?.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    location.href = "home.html";
  } catch (e) {
    alert(e.message);
  }
});

document.getElementById("googleLogin")?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    location.href = "home.html";
  } catch (e) {
    alert(e.message);
  }
});

document.getElementById("forgotPassword")?.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!email.value) {
    alert("Enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.value);
    alert("Password reset email sent.");
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("logout")?.addEventListener("click", async () => {
  await signOut(auth);
  location.href = "index.html";
});

onAuthStateChanged(auth, (user) => {
  if (location.pathname.includes("home.html")) {
    if (!user) {
      location.href = "index.html";
    } else {
      const userEmail = document.getElementById("userEmail");
      if (userEmail) {
        userEmail.textContent = "Logged in as: " + user.email;
      }
    }
  }
});
