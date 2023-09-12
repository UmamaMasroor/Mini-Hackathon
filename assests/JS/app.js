// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase,set,ref ,update} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCwolGFKyuRkOHdlNu5BDjGscEJR5lKRX0",
  authDomain: "practice-c80fc.firebaseapp.com",
  databaseURL: "https://practice-c80fc-default-rtdb.firebaseio.com",
  projectId: "practice-c80fc",
  storageBucket: "practice-c80fc.appspot.com",
  messagingSenderId: "809908034166",
  appId: "1:809908034166:web:1069915178d2c55f225d57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
//signup......
let signup = document.getElementById('signup')
signup.addEventListener('click',(e)=>{
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let repeatPassword = document.getElementById('repeatPassword').value;
  createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  set(ref(database,'users/'+user.uid),{ 
      firstName : firstName,
      lastName : lastName,
      email : email,
      password: password,
      repeatPassword:repeatPassword,})
     
  alert('user created!');  
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);
});
})

//login................
let login = document.getElementById('login')

login && login.addEventListener('click',(e)=>{

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const dt = new Date();
    const user = userCredential.user;
    update(ref(database,'users/'+user.uid),{ 
      last_login : dt,
  })
  if (!user) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const isValid = validateLogin(email, password); // Implement this function

    if (isValid) {
      // Redirect to the dashboard page
      window.location.href = "data.html";
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Invalid credentials. Please try again.",
      })
    }
  } else {
    // Redirect to the dashboard page if already logged in
    window.location.href = "data.html";
  }
    alert('user loggedIn!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
})