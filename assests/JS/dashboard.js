  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getDatabase,set,ref ,update,remove,child,get} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
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

let publish_btn = document.getElementById("publish-btn");
publish_btn.addEventListener("click", () => {
  let blog_heading = document.getElementById("blog-heading").value;
let blog_content = document.getElementById("blog-content").value;
  alert("Published Blog Post");
  // let published_blog = document.getElementById("publish-content");
  const publishedDate = new Date().toLocaleString();
  insertData();
  // Create new blog element
 const blogElement = document.createElement('div');
 blogElement.innerHTML = `<div class="div"></div>
 <h1 id="h2">${blog_heading}</h1>
<p id="on"><b>Published on:</b> ${publishedDate}</p>
    <p class="para">${blog_content}</p>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
`;
  // Add event listeners for edit and delete buttons
  const editBtn = blogElement.querySelector('.editBtn');
  editBtn.addEventListener('click', function () {
    let blog_heading = document.getElementById("blog-heading").value;
    let blog_content = document.getElementById("blog-content").value;
    const New_heading = prompt('Enter new title:', blog_heading);
    const New_content = prompt('Edit blog', blog_content)
    if (New_heading !== null || New_content !== null) {
      blogElement.querySelector('h2').textContent = New_heading;
      blogElement.querySelector('.para').textContent = New_content;
      let uniqueId = auth.currentUser.uid;
      update(ref(database, "data/" + uniqueId), {
        New_heading: New_heading,
        New_content: New_content
      })
        .then(function () {
          alert("Attendance Marked successfully");
        })
        .catch(function (error) {
          alert("Error updating attendance: " + error);
        });
        document.getElementById("blog-heading").value = "";
        document.getElementById("blog-content").value = "";
    }
  });

  const deleteBtn = blogElement.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', function () {
    const confirmDelete = confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      let uniqueId = auth.currentUser.uid;
      remove(ref(database, "data/" + uniqueId))
        .then(function () {
          alert("Blog deleted successfully");
        })
        .catch(function (error) {
          alert("Error deleting blog: " + error);
        });
      blogElement.innerHTML = ""
    }
  });
  // Append new blog to the list
  myblog.appendChild(blogElement);
getData();
});
function insertData() {
  let blog_heading = document.getElementById("blog-heading").value;
  let blog_content = document.getElementById("blog-content").value;
  let uniqueId = auth.currentUser.uid;
  console.log(uniqueId);
  set(ref(database, "data/" + uniqueId), {
    blog_heading: blog_heading,
    blog_content: blog_content
  }).then((resolve) => {
    console.log("load Successfully");

  }).catch((error) => {
    console.log("Unload");
  })
}
const getData = () =>{
  const dbRef = ref(getDatabase());
  let uniqueId = auth.currentUser.uid;
get(child(dbRef, `blog/${uniqueId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);})}