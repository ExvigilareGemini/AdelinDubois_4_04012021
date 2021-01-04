function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeCross = document.querySelector(".close");


// --------------EVENTS----------------

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event : on close cross click
closeCross.addEventListener("click", closeModal);

// -------------FUNCTIONS--------------

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display ="none";
}


