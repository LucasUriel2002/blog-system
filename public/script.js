// ---- SELECT ITEMS ----
const form = document.querySelector(".post-form");
const submitBtn = document.querySelector(".submitBtn");
const imageInput = document.getElementById("post-image-input");
const titleInput = document.getElementById("post-title-input");
const textInput = document.getElementById("post-text-input");
const authorInput = document.getElementById("post-author-input");
const errorMessage = document.getElementById("errorMessage");
// ---- VARIABLES ----

// ---- FUNCTIONS ----

// function submitForm() {
//   if (imageInput.value == "") {
//     errorMessage.innerText = "Send a File";
//     return;
//   }

//   if (titleInput.value == "") {
//     errorMessage.innerText = "Fill the title field";
//     return;
//   }

//   if (textInput.value == "") {
//     errorMessage.innerText = "Fill the text field";
//     return;
//   }

//   if (authorInput.value == "") {
//     errorMessage.innerText = "Fill the author field";
//     return;
//   }

// const formData = new URLSearchParams(new FormData(form));
// fetch("http://localhost:8080/add-post", {
//   method: "POST",
//   body: formData,
// });

// }
