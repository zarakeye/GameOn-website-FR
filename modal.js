// DOM Elements
const navbar = document.querySelector(".main-navbar");
const navlinks = document.querySelectorAll(".navlink");
const navicon = document.querySelector(".navicon");
const modalbg = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const XFormCloseBtn = document.getElementById("XFormCloseBtn");
const modalBody = document.querySelector(".modal-body");
const form = document.querySelector('form[name="reserve"]');
const formData = document.querySelectorAll(".formData");
const modalBtn = document.querySelectorAll(".modal-btn");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const nbPassedTournaments = document.getElementById("nbPassedTournaments");
const locationLastTournament = document.getElementsByName("locationLastTournament");
const tournaments = document.getElementsByName("locationLastTournament");
const locations = document.getElementById("locations");
const termsOfUse = document.getElementById("termsOfUse");

// Give active class to one link at a time, the one that trigger the event, and remove it from others 
navlinks.forEach((link) => link.addEventListener("click", (e) => {
  e.preventDefault();

  if (!link.classList.contains("active")) {
    navlinks.forEach((otherlink) => otherlink.classList.remove("active"));
    link.classList.add("active");
  }
}));


// Toggle between displaying/collapsing navbar as a vertical list when clicking on the burger icon
navicon.addEventListener("click", (e) => {
    if (navbar.style.display === "none") {
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

const errors = {
  firstName: [],
  lastName: [],
  email: [],
  birthdate: [],
  nbPassedTournaments: [],
  locationLastTournament: [],
  termsOfUse: []
};

const formEventsHandler = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const firstName = formData.get('firstName').trim();
  const lastName = formData.get('lastName').trim();
  const email = formData.get('email').trim();
  const birthdate = formData.get('birthdate').trim();
  const nbPassedTournaments = parseInt(formData.get('nbPassedTournaments'), 10);
  const locationLastTournament = formData.get('locationLastTournament');
  const termsOfUse = formData.get('termsOfUse');

  // FormRegexp
  const regexpName = /^(?![-'\\d])[-'a-zA-ZÀ-ÿ]+$/;
  const regexpNameForbiddenBeginning = /^[-'\\d]+[-'a-zA-ZÀ-ÿ]*$/
  const regexpEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]{2,}$/;
  const regexpBirthdate =
    /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19[0-9]{2}|20[0-9]{2})$/;
  const regexpNbPassedTournaments = /^[0-9]+$/;

  // first name input validation rules
  if (!regexpName.test(firstName)) {
    errors.firstName.push("Le prénom entré n'est pas valide")
  } else {
    errors.firstName = [];
  }
  if (firstName.length < 2) {
    errors.firstName.push('Le prénom doit contenir au moins 2 caractères');
  }
  if (regexpNameForbiddenBeginning.test(firstName)) {
    errors.firstName.push('Le prénom doit obligatoirement commencer par une lettre');
  }
  if (firstName.length === 0) {
    errors.firstName.push('Veuillez entrer votre prénom');
  }

  // last name input validation rules
  if (!regexpName.test(lastName)) {
    errors.lastName.push("Le nom entré n'est pas valide");
  } else {
    errors.lastName = [];
  }
  if (lastName.length < 2) {
    errors.lastName.push("Le nom doit contenir au moins 2 caractères");
  }
  if (regexpNameForbiddenBeginning.test(lastName)) {
    errors.lastName.push('Le nom doit obligatoirement commencer par une lettre');
  }
  if (lastName.length === 0) {
    errors.lastName.push("Veuillez entrer votre nom");
  }

  // email input validation rules
  if (email.length === 0) {
    errors.email.push("Veuillez entrer votre email");
  }
  if (email.length > 0 && !regexpEmail.test(email)) {
    errors.email.push("L'email entré n'est pas valide");
  }
  if (e.type !== 'submit' && regexpEmail.test(email)) {
    errors.email = [];
  }

  // birth date input validation rules
  const date = new Date(birthdate);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const formattedBirthdate = `${day}/${month}/${year}`;
  if (formattedBirthdate === `NaN/NaN/NaN`) {
    errors.birthdate.push("Veuillez entrer votre date de naissance");
  }
  if (formattedBirthdate !== `NaN/NaN/NaN` && !regexpBirthdate.test(formattedBirthdate)) {
    errors.birthdate.push("La date entrée n'est pas valide");
  }
  if (e.type !== 'submit' && regexpBirthdate.test(formattedBirthdate)) {
    errors.birthdate = [];
  }

  // number of passed tournaments input validation rules
  if (nbPassedTournaments >= 0 && !regexpNbPassedTournaments.test(nbPassedTournaments)) {
    errors.nbPassedTournaments.push("Le nombre entré n'est pas valide");
  }
  if (nbPassedTournaments < 0) {
    errors.nbPassedTournaments.push("Le nombre doit être positif ou nul");
  }
  if (e.type !== 'submit' && regexpNbPassedTournaments.test(nbPassedTournaments)) {
    errors.nbPassedTournaments = [];
  }

  // Rule for the location of the last tournament
  if (locationLastTournament === null) {
    errors.locationLastTournament.push("Veuillez sélectionner la ville du tournoi auquel vous souhaitez participer cette année");
  }
  if (e.type !== 'submit' && locationLastTournament !== null) {
    errors.locationLastTournament = [];
  }

  // Rule for terms of use
  if (termsOfUse !== 'on') {
    errors.termsOfUse.push("Veuillez accepter les conditions d'utilisation pour pouvoir valider votre inscription, ou cliquer sur la croix en haut a droite pour abandonner l'inscription");
  }
  if (e.type !== 'submit' && termsOfUse === 'on') {
    errors.termsOfUse = [];
  }

  displayErrors(e, errors);
  displayThanksMessage(e, errors);

  // Display errors by calling the good display function depending on the event type
  function displayErrors(event, errors) {
    // Display errors
    if (event.type === 'submit') {
      // Displays all errors at submit
      displayFormErrors(errors);
    } else {
      // Displays the current error of the focused input
      // displayFormInputErrors(errors, event.target.name);
      displayFormInputErrors(errors, event.target.name);
    }
  }

  // Display thanks message
  function displayThanksMessage(event, errors) {
    // Display thanks message
    if (event.type === 'submit' && validate(errors)) {
      let thanksMessageModal = document.createElement("div");
      thanksMessageModal.classList.add("modal");
      let thanksMessageModalContent = `
        <div class="modal">
        <span id="thanksXBtnClose" class="modal--close"></span>
          <p class="thanks-message">Merci pour votre inscription</p>
          <button id="thanksBtnClose" class="cta" type="button" value="close">Fermer</button>
        </div>
      `;

      thanksMessageModal.innerHTML = thanksMessageModalContent;
      modal.appendChild(thanksMessageModal);

      const thanksXBtnClose = document.getElementById("thanksXBtnClose");
      const thanksBtnClose = document.getElementById("thanksBtnClose");
          
      thanksBtnClose.addEventListener('click', closeModal);
      thanksXBtnClose.addEventListener('click', closeModal);
    }
  }
};

/*** Event Listeners on form inputs */
firstName.addEventListener('input', formEventsHandler);
lastName.addEventListener('input', formEventsHandler);
email.addEventListener('input', formEventsHandler);
birthdate.addEventListener('input', formEventsHandler);
nbPassedTournaments.addEventListener('input', formEventsHandler);
locations.addEventListener('input', formEventsHandler);
termsOfUse.addEventListener('input', formEventsHandler);
form.addEventListener('submit', formEventsHandler);
XFormCloseBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Display all errors at submit
function displayFormErrors(errors) {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  })

  const errorsKeys = Object.keys(errors);

  errorsKeys.forEach((key) => {
    const inputErrors = errors[key];
    let lastErrorOfKey;
    if (inputErrors !== undefined && inputErrors.length > 0) {
      lastErrorOfKey = inputErrors[inputErrors.length - 1];
      const input = document.querySelector(`[name="${key}"]`);
      input.classList.add('error');
      const errorMessage = document.createElement("p");
      errorMessage.classList.add('error-message');
      errorMessage.setAttribute('data-error', 'true');
      errorMessage.setAttribute('data-error-visible', 'true');
      errorMessage.innerHTML = "";
      errorMessage.innerHTML = lastErrorOfKey;

      // Exception for this input which is an input of type radio
      // because the error message should be displayed after the radio button.
      // The error message should be displayed before the radio button.
      if (key === 'locationLastTournament') {
        errorMessage.style.paddingBottom = '11px';
        input.parentNode.insertAdjacentElement("beforebegin", errorMessage);
      } else {
        input.insertAdjacentElement("afterend", errorMessage);
      }
    }
  });
}

// Display the last error of the input
function displayFormInputErrors(errors, key) {
  const inputErrors = errors[key];
  let input = document.querySelector(`[name="${key}"]`);
  let errorMessage = document.querySelector(`[name="${key}"] ~ .error-message`);
  const newErrorMessage = document.createElement("p");
  newErrorMessage.classList.add('error-message');
  newErrorMessage.setAttribute('data-error', 'true');
  newErrorMessage.setAttribute('data-error-visible', 'true');

  if (inputErrors && inputErrors.length > 0) {
    input.classList.add('error');
    errorMessage?.remove();

    const lastErrorOfKey = inputErrors[inputErrors.length - 1];
    newErrorMessage.innerHTML = lastErrorOfKey;

    if (input.name === 'locationLastTournament') {
      newErrorMessage.style.paddingBottom = '11px';
      input.parentNode.insertAdjacentElement("beforebegin", newErrorMessage);
    }
    input.insertAdjacentElement("afterend", newErrorMessage);
  } else {
    input.classList.remove('error');
    if (input.name === 'locationLastTournament') {
      document.querySelector("#lastTournament ~ .error-message")?.remove();
    }
    errorMessage?.remove();
  }
}

// Values are valid if all errors are empty
function validate(errors) {
  for (const error in errors) {
    if (errors[error].length > 0) {
      return false;
    }
  }
  return true;
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}