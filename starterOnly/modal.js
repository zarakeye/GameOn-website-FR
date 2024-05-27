// DOM Elements
const form = document.querySelector('form[name="reserve"]');
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const iconNav = document.querySelector(".main-navbar .icon");
const modalCloseBtn = document.querySelector(
  ".modal--close"
);
const modalBody = document.querySelector(".modal-body");


const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const nbPassedTournaments = document.getElementById("nbPassedTournaments");
const locationLastTournament = document.getElementsByName("locationLastTournament");
const tournaments = document.getElementsByName("locationLastTournament");
const locations = document.getElementById("locations");
const termsOfUse = document.getElementById("termsOfUse");

locations.style.display = "grid";
locations.style.gridTemplateColumns = "1fr 1fr 1fr";

// Regexp
const regexpName = /^(?![-'\\d])[-'a-zA-ZÀ-ÿ]+$/;
const regexpEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]{2,4}$/;
const regexpBirthdate =
  /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19[0-9]{2}|20[0-9]{2})$/;
const regexpNbPassedTournaments = /^[0-9]+$/;

function editNav() {
  var header = document.getElementById("myTopnav");
  if (header.className === "topnav") {
    header.classList.add("responsive");
  } else {
    header.classList.remove("responsive");
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

iconNav.addEventListener("click", (e) => {
  e.preventDefault();
  editNav();
});

modalCloseBtn.addEventListener("click", closeModal);

const eventHandler = (e) => {
  e.preventDefault();

  const errors = {
    firstName: [],
    lastName: [],
    email: [],
    birthdate: [],
    nbPassedTournaments: [],
    locationLastTournament: [],
    termsOfUse: []
  };

  const formData = new FormData(form);

  const firstName = formData.get('firstName').trim();
  const lastName = formData.get('lastName').trim();
  const email = formData.get('email').trim();
  const birthdate = formData.get('birthdate').trim();
  const nbPassedTournaments = parseInt(formData.get('nbPassedTournaments'), 10);
  const locationLastTournament = formData.get('locationLastTournament');
  const termsOfUse = formData.get('termsOfUse');
  const eventsNotifications = formData.get('eventsNotifications');

  console.log('formData : ', {
    firstName,
    lastName,
    email,
    birthdate,
    nbPassedTournaments,
    locationLastTournament,
    termsOfUse,
    eventsNotifications
  });

  // Rules for first name
  if (/*e.type === 'submit' && */firstName.length === 0) {
    errors.firstName.push('Veuillez entrer votre prénom');
  }
  if ((e.type === 'input' || e.type === 'change') && /^[-'\\d]+[-'a-zA-ZÀ-ÿ]*$/.test(firstName)) {
    errors.firstName.push('Le prénom doit obligatoirement commencer par une lettre');
  }
  if ((e.type === 'input' || e.type === 'change') && firstName.length < 2) {
    errors.firstName.push('Le prénom doit contenir au moins 2 caractères');
  }
  if (!regexpName.test(firstName)) {
    errors.firstName.push("Le prénom entré n'est pas valide")
  }

  // Rules for last name
  if (e.type === 'submit' && lastName.length === 0) {
    errors.lastName.push("Veuillez entrer votre nom");
  }
  if ((e.type === 'input' || e.type === 'change') && /^[-'\\d]+[-'a-zA-ZÀ-ÿ]+$/.test(lastName)) {
    errors.lastName.push('Le nom doit obligatoirement commencer par une lettre');
  }
  if ((e.type === 'input' || e.type === 'change') && lastName.length < 2) {
    errors.lastName.push("Le nom doit contenir au moins 2 caractères");
  }
  if (!regexpName.test(lastName)) {
    errors.lastName.push("Le nom entré n'est pas valide");
  }

  // Rules for email
  // if (e.type === 'submit' && email.length === 0) {
  //   errors.email.push("Veuillez entrer votre email");
  // }
  if (email.length > 0 && !regexpEmail.test(email)) {
    errors.email.push("L'email entré n'est pas valide");
  }

  const date = new Date(birthdate);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const formattedBirthdate = `${day}/${month}/${year}`;
  console.log('formattedBirthdate : ', formattedBirthdate);
  // Rules for birth date
  if (formattedBirthdate !== `NaN/NaN/NaN` && !regexpBirthdate.test(formattedBirthdate)) {
    errors.birthdate.push("La date entrée n'est pas valide");
  }

  // Rules for number of passed tournaments
  // if (e.type === 'submit' && nbPassedTournaments.length === 0) {
  //   errors.nbPassedTournaments.push("Veuiller renseigner le nombre de tournois auxquels vous avez participé");
  // }
  if (nbPassedTournaments > 0 && !regexpNbPassedTournaments.test(nbPassedTournaments)) {
    errors.nbPassedTournaments.push("Le nombre entré n'est pas valide");
  }

  // Rule for the location of the last tournament
  // if (/*e.type === 'submit' && */locationLastTournament === null) {
  
  //   e.preventDefault();
  //   errors.locationLastTournament.push("Veuillez sélectionner la ville dans laquelle s'est déroulé votre dernier tournoi");
  // }
  
  

  if (locationLastTournament === null) {
    errors.locationLastTournament.push("Veuillez sélectionner la ville dans laquelle s'est déroulé votre dernier tournoi");
  }

  // Rule for terms of use
  if (termsOfUse !== 'on') {
    errors.termsOfUse.push("Veuillez accepter les conditions d'utilisation pour pouvoir valider votre inscription, ou cliquer sur la croix en haut a droite pour abandonner l'inscription");
  }

  console.log('errors', errors);

  showErrors(errors);  

  if (e.type === 'submit' && validate(errors)) {
    console.log('validate : ', validate(errors));
    modalBody.innerHTML = '';

    const thanksMessage = document.createElement("p");
    thanksMessage.innerHTML = "Merci pour votre inscription"

    const btnClose = document.createElement('button');
    btnClose.classList.add('cta');
    btnClose.setAttribute('type', 'button');
    btnClose.setAttribute('value', 'fermer');
    btnClose.style.position = 'absolute';
    btnClose.style.bottom = '18px';
    btnClose.innerHTML = 'Fermer';

    modalBody.style.position = 'relative';
    modalBody.style.display = 'flex';
    modalBody.style.flexDirection = 'column';
    modalBody.style.alignItems = 'center';
    modalBody.style.justifyContent = 'center';
    modalBody.style.width = '536px';
    modalBody.style.height = '850px';

    modalBody.appendChild(thanksMessage);
    modalBody.appendChild(btnClose);

    btnClose.addEventListener('click', closeModal);
  }
};

firstName.addEventListener('input', eventHandler);
lastName.addEventListener('input', eventHandler);
email.addEventListener('input', eventHandler);
birthdate.addEventListener('input', eventHandler);
nbPassedTournaments.addEventListener('input', eventHandler);

termsOfUse.addEventListener('input', eventHandler);
form.addEventListener('submit', eventHandler);

console.log('formData : ', {
  firstName,
  lastName,
  email,
  birthdate,
  nbPassedTournaments,
  locationLastTournament,
  termsOfUse,
  eventsNotifications
});

function showErrors(errors) {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  })

  const errorsKeys = Object.keys(errors);

  errorsKeys.forEach((key) => {
    const inputErrors = errors[key];
    const input = document.querySelector(`[name="${key}"]`);
    // document.querySelector(`[name="${key}"] ~ .error-message`).remove();
    const firstErrorOfKey = inputErrors[0];
    if (inputErrors.length > 0) {
      input.classList.add('error');
      const errorMessage = document.createElement("p");
      errorMessage.classList.add('error-message');
      errorMessage.setAttribute('data-error', 'true');
      errorMessage.setAttribute('data-error-visible', 'true');
      errorMessage.innerHTML = "";
      errorMessage.innerHTML = firstErrorOfKey;
      if (key === 'locationLastTournament') {
        document.getElementById('lastTournament').insertAdjacentElement("afterend", errorMessage);
      } else {
        input.insertAdjacentElement("afterend", errorMessage);
      }
    } else {
      input.classList.remove('error');
    }
    // showInputErrors(errors, key);
  });
}

function showInputErrors(errors, key) {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });

  const input = document.querySelector(`[name="${key}"]`);
  const inputErrors = errors[key];
  const firstErrorOfKey = inputErrors[0];
  if (inputErrors.length > 0) {
    input.classList.add('error');
    const errorMessage = document.createElement("p");
    errorMessage.classList.add('error-message');
    errorMessage.setAttribute('data-error', 'true');
    errorMessage.setAttribute('data-error-visible', 'true');
    errorMessage.innerHTML = "";
    errorMessage.innerHTML = firstErrorOfKey;
    input.insertAdjacentElement("afterend", errorMessage);
  } else {
    input.classList.remove('error');
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

