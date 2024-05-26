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
const locationLastTournament = document.getElementById("locationLastTournament");
// const locations = document.querySelectorAll(
//   "input[name=locationLastTournament]"
// );
const termsOfUse = document.getElementById("termsOfUse");

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
  if (e.type === 'submit' && firstName.length === 0) {
    errors.firstName.push('Veuillez entrer votre prénom');
  }
  if (/^[-'\\d]+[-'a-zA-ZÀ-ÿ]+$/.test(firstName)) {
    errors.firstName.push('Le prénom doit obligatoirement commencer par une lettre');
  }
  if (firstName.length < 2) {
    errors.firstName.push('Le prénom doit contenir au moins 2 caractères');
  }
  if (!regexpName.test(firstName)) {
    errors.firstName.push("Le prénom entré n'est pas valide")
  }

  // Rules for last name
  if (e.type === 'submit' && lastName.length === 0) {
    errors.lastName.push("Veuillez entrer votre nom");
  }
  if (/^[-'\\d]+[-'a-zA-ZÀ-ÿ]+$/.test(lastName)) {
    errors.lastName.push('Le nom doit obligatoirement commencer par une lettre');
  }
  if (lastName.length < 2) {
    errors.lastName.push("Le nom doit contenir au moins 2 caractères");
  }
  if (!regexpName.test(lastName)) {
    errors.lastName.push("Le nom entré n'est pas valide");
  }

  // Rules for email
  if (e.type === 'submit' && email.length === 0) {
    errors.email.push("Veuillez entrer votre email");
  }
  if (!regexpEmail.test(email)) {
    errors.email.push("L'email entré n'est pas valide");
  }

  const date = new Date(birthdate);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const formattedBirthdate = `${day}/${month}/${year}`;
  console.log('formattedBirthdate : ', formattedBirthdate);
  // Rules for birth date
  if (formattedBirthdate !== 0 && !regexpBirthdate.test(formattedBirthdate)) {
    errors.birthdate.push("La date entrée n'est pas valide");
  }

  // Rules for number of passed tournaments
  if (e.type === 'submit' && nbPassedTournaments.length === 0) {
    errors.nbPassedTournaments.push("Veuiller renseigner le nombre de tournois auxquels vous avez participé");
  }
  if (!regexpNbPassedTournaments.test(nbPassedTournaments)) {
    errors.nbPassedTournaments.push("Le nombre entré n'est pas valide");
  }

  // Rule for the location of the last tournament
  if (e.type === 'submit' && locationLastTournament === null) {
    errors.locationLastTournament.push("Veuillez sélectionner la ville dans laquelle s'est déroulé votre dernier tournoi");
  }

  // Rule for terms of use
  if (termsOfUse !== 'on') {
    errors.termsOfUse.push("Veuillez accepter les conditions d'utilisation pour pouvoir valider votre inscription")
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



form.addEventListener('change', eventHandler);
form.addEventListener('submit', eventHandler);

function showErrors(errors) {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  })

  const errorsKeys = Object.keys(errors);

  errorsKeys.forEach((key) => {
    const inputErrors = errors[key];
    const input = document.querySelector(`[name="${key}"]`);
    if (inputErrors.length > 0) {
      
      const errorMessage = document.createElement("p");
      errorMessage.classList.add('error-message');
      errorMessage.setAttribute('data-error', 'true');
      errorMessage.setAttribute('data-error-visible', 'true');
      errorMessage.innerHTML = "";
      errorMessage.innerHTML = inputErrors[0];
      input.insertAdjacentElement("afterend", errorMessage);
    }
  });
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

