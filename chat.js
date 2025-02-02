// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjWCpVTXPoKRZQgv5iPojIMUERiV9cw7Q",
  authDomain: "sho-ed145.firebaseapp.com",
  projectId: "sho-ed145",
  storageBucket: "sho-ed145.firebasestorage.app",
  messagingSenderId: "898816513417",
  appId: "1:898816513417:web:5b1578b1b10421102c7d58",
  measurementId: "G-XK3RHF1VJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messagesDiv = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

// Send message to Firestore
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = messageInput.value;
  await db.collection("messages").add({
    text: message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    sender: "user" // Change to "admin" if it's an admin message
  });

  messageInput.value = "";
});

// Load messages in real-time
db.collection("messages")
  .orderBy("createdAt")
  .onSnapshot((snapshot) => {
    messagesDiv.innerHTML = ""; // Clear messages

    snapshot.forEach((doc) => {
      const message = doc.data();
      const messageDiv = document.createElement("div");
      messageDiv.textContent = message.text;

      // Apply user/admin class for styling
      messageDiv.className = message.sender === "user" ? "user" : "admin";
      messagesDiv.appendChild(messageDiv);
    });

    // Auto-scroll to the bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
