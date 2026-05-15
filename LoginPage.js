 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA9QLSMgxcOTKOvISa7H5UIaKeD2LdI9r8",
    authDomain: "sadad-595e2.firebaseapp.com",
    projectId: "sadad-595e2",
    storageBucket: "sadad-595e2.firebasestorage.app",
    messagingSenderId: "571150244056",
    appId: "1:571150244056:web:d34b975ccbb0594d11dfad",
    measurementId: "G-6VZCM8ECST"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);



const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
  event.preventDefault()
  
  //inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  ;
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    window.location.href = "Dashboard.html";
})
.catch((error) => {
    alert("Enter valid credentials");
});

  });





