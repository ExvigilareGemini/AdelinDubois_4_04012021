function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// arrays
const inputId = [
  "first",
  "last",
  "email",
  "birthdate",
  "quantity",
  "location",
  "checkbox1"
]

// DOM Elements
const modalbg = document.querySelector(".bground"); //open/close modal
const modalBtn = document.querySelectorAll(".modal-btn"); //event open modal
const closingCross = document.querySelector(".close"); //event close modal
const formData = document.querySelectorAll(".formData"); //data-attribute
const validationForm = document.querySelector(".validationForm"); //event submit 
const pCitiesAndThanks = document.querySelector(".text-label");
const submitButton = document.querySelector(".btn-submit");
const closingButton = document.querySelector(".btn-closing"); //closing button appearing after submitting complete

// variables
var formIsValid = false;


// --------------EVENTS----------------

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event : on close cross click
closingCross.addEventListener("click", closeModal);
closingButton.addEventListener("click", closeModal);

// Listen the submission of the <form> .validationForm
validationForm.addEventListener('submit', function(e){ 
  //prevent the submitting
  e.preventDefault(); 
      
      // the function validate() is testing each input, if everything is ok, it return true
      if(validate()){
        // disparition formulaire
        for (let index = 0; index < formData.length; index++) {
          formData[index].style.display = "none";
        }
        // transformation of <p> .text-label used for the text "Quelles villes?" to display the thanks message
        pCitiesAndThanks.textContent = "Thank you for submitting your registration details";
        pCitiesAndThanks.classList.replace("text-label", "thank-message");

        // making submit button a closing button
        submitButton.style.display = "none";
        closingButton.style.display = "block";

        //TODO submit without redirect? 

        // validationForm.submit();
      }   
  }
);

// -------------FUNCTIONS--------------

// test function
function test () {
  console.log("ok");
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display ="none";
}

// applying data-attribute to display error messages
// indexOfFormData, corresponding to the position oh the <div> .formData in the <form> .validationForm
// errorText is the displayed text in the error message
function errorAlert(indexOfFormData, errorText){
    formData[indexOfFormData].setAttribute("data-error-visible","true");
    formData[indexOfFormData].setAttribute("data-error",errorText);
    formIsValid = false;
}

// remove data-attribute that is diplaying the error message
// indexOfFormData, corresponding to the position oh the <div> .formData in the <form> .validationForm
function noMoreAlert(indexOfFormData){
    formData[indexOfFormData].removeAttribute("data-error-visible");
    formData[indexOfFormData].removeAttribute("data-error");
}

// testing radio button with id #location#, if one is checked -> return true, else return false
// numberofradiobutton is the number of radio button in the form
// !!! It work only if the location is in the 6th place within formdata div, if it change, must change inputId[#]
function radioButtonTest(NumberOfRadioButton){
  let isChecked = false;
  // search in a loop for a number equal to the number of radio button, starting from 1 to number+1 because the first radiobutton is under the id #location1
  for (let index = 1; index < NumberOfRadioButton+1; index++) {
    // search from #location1, location2,... incrementation of index give the number of the location
    if(document.querySelector("#"+inputId[5]+index).checked){
      isChecked = true;
    }
  }
  return isChecked;
}

// validation des champs du formulaire
function validate () {
  // formIsValid is set on true first, if while going through the function everything is OK, it will stay true and validate the submit,
  // but if at least 1 test is NOK, formIsValid become false and there is not submit
  formIsValid = true;

  // firstname validation | more than 2 caracters | number of formData = 0
  if (document.querySelector("#"+inputId[0]).value.length < 2){
    errorAlert(0, "Veuillez entrer au minimum 2 caractères pour le prénom")
  }
  else {
    noMoreAlert(0);
  }
  
  // lastname validation | more than 2 caracters | number of formData = 1
  if (document.querySelector("#"+inputId[1]).value.length < 2){
    errorAlert(1, "Veuillez entrer au minimum 2 caractères pour le nom");
  }
  else {
    noMoreAlert(1);
  }

  // email validation | email valid regex | number of formdata = 2
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let testEmail = re.test(document.querySelector("#"+inputId[2]).value);//On crée une variable renvoyant à un objet RegExp. Le .test(inputEmail.value) va tester la validité Regex de 
  if (testEmail){
    noMoreAlert(2);
  }
  else {
    errorAlert(2, "Veuillez entrer une adresse email valide");
  }

// birthdate validation | not null | number of formdata = 3
  if (document.querySelector("#"+inputId[3]).value == "") {
    errorAlert(3, "Veuillez entrer une adresse de naissance");
  }  
  else {
    noMoreAlert(3);
  }

  // quantity validation | not null | number of formdata = 4
  if (document.querySelector("#"+inputId[4]).value == "") {
    errorAlert(4, "Veuillez entrer un nombre de participation");
  }  
  else {
    noMoreAlert(4);
  }

  // location validation | one is checked | number of formdata = 5
  if(radioButtonTest(6)){
    noMoreAlert(5);
  }
  else {
    errorAlert(5, "Veuillez choisir une ville");
  }

  // chexkbox1 validation | is checked | number of formdata = 6
  if(document.querySelector("#"+inputId[6]).checked)
  {
    noMoreAlert(6);
  }
  else {
    errorAlert(6, "Vous devez accepter les conditions d'utilisation");
  }

  return formIsValid;
  
}
