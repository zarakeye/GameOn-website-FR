// DOM Elements
const navbar = document.querySelector(".main-navbar");
const navlinks = document.querySelectorAll(".navlink");
const form = document.querySelector('form[name="reserve"]');
const modalbg = document.querySelector(".bground");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const XFormCloseBtn = document.getElementById("XFormCloseBtn");
const formData = document.querySelectorAll(".formData");
const iconNav = document.querySelector(".icon");
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

// Regexp
const regexpName = /^(?![-'\\d])[-'a-zA-ZÀ-ÿ]+$/;
const regexpEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]{2,4}$/;
const regexpBirthdate =
  /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19[0-9]{2}|20[0-9]{2})$/;
const regexpNbPassedTournaments = /^[0-9]+$/;

navlinks.forEach((link) => link.addEventListener("click", (e) => {
  e.preventDefault();

  if (!link.classList.contains("active")) {
    navlinks.forEach((otherlink) => otherlink.classList.remove("active"));
    link.classList.add("active");
  }


}));

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  const header = document.getElementById("myTopnav");
  const iconNav = document.querySelector(".main-navbar .icon");

  if (header.classList.contains("responsive")) {
    header.classList.remove("responsive");
    if (iconNav.classList.contains("active")) {
      iconNav.classList.remove("active");
    }
  }
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

iconNav.addEventListener("click", (e) => {
    if (navbar.style.display === "none") {
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
});


const errors = {
  firstName: [],
  lastName: [],
  email: [],
  birthdate: [],
  nbPassedTournaments: [],
  locationLastTournament: [],
  termsOfUse: []
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
const eventHandler = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const firstName = formData.get('firstName').trim();
  const lastName = formData.get('lastName').trim();
  const email = formData.get('email').trim();
  const birthdate = formData.get('birthdate').trim();
  const nbPassedTournaments = parseInt(formData.get('nbPassedTournaments'), 10);
  const locationLastTournament = formData.get('locationLastTournament');
  const termsOfUse = formData.get('termsOfUse');

  // Rules for first name
  if (!regexpName.test(firstName)) {
    errors.firstName.push("Le prénom entré n'est pas valide")
  } else {
    errors.firstName = [];
  }
  if (firstName.length < 2) {
    errors.firstName.push('Le prénom doit contenir au moins 2 caractères');
  }
  if (/^[-'\\d]+[-'a-zA-ZÀ-ÿ]*$/.test(firstName)) {
    errors.firstName.push('Le prénom doit obligatoirement commencer par une lettre');
  }
  if (firstName.length === 0) {
    errors.firstName.push('Veuillez entrer votre prénom');
  }

  // Rules for last name
  if (!regexpName.test(lastName)) {
    errors.lastName.push("Le nom entré n'est pas valide");
  } else {
    errors.lastName = [];
  }
  if (lastName.length < 2) {
    errors.lastName.push("Le nom doit contenir au moins 2 caractères");
  }
  if (/^[-'\\d]+[-'a-zA-ZÀ-ÿ]*$/.test(lastName)) {
    errors.lastName.push('Le nom doit obligatoirement commencer par une lettre');
  }
  if (lastName.length === 0) {
    errors.lastName.push("Veuillez entrer votre nom");
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
  // if (locationLastTournament === null) {
  
  //   e.preventDefault();
  //   errors.locationLastTournament.push("Veuillez sélectionner la ville dans laquelle s'est déroulé votre dernier tournoi");
  // }
  
  if (e.type === 'submit' && locationLastTournament === null) {
    errors.locationLastTournament.push("Veuillez sélectionner la ville dans laquelle s'est déroulé votre dernier tournoi");
  }
  if (e.type !== 'submit' && locationLastTournament !== null) {
    errors.locationLastTournament = [];
  }
  

  // Rule for terms of use
  if (e.type === 'submit' && termsOfUse !== 'on') {
    errors.termsOfUse.push("Veuillez accepter les conditions d'utilisation pour pouvoir valider votre inscription, ou cliquer sur la croix en haut a droite pour abandonner l'inscription");
  }

  if (e.type !== 'submit' && termsOfUse === 'on') {
    errors.termsOfUse = [];
  }

  console.log('errors', errors);

  if (e.type === 'submit') {
    // Shows all errors at submit
    showErrors(errors);
  } else {
    // Shows the current error of the focused input
    showInputErrors(errors, e.target.name);
  }
  

  if (e.type === 'submit' && validate(errors)) {
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
};

/*** Event Listeners on form inputs */
firstName.addEventListener('input', eventHandler);
lastName.addEventListener('input', eventHandler);
email.addEventListener('input', eventHandler);
birthdate.addEventListener('input', eventHandler);
nbPassedTournaments.addEventListener('input', eventHandler);
locations.addEventListener('input', eventHandler);
termsOfUse.addEventListener('input', eventHandler);
form.addEventListener('submit', eventHandler);
XFormCloseBtn.addEventListener("click", closeModal);

function showErrors(errors) {
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
      if (key === 'locationLastTournament') {
        document.getElementById('lastTournament').insertAdjacentElement("afterend", errorMessage);
      } else {
        input.insertAdjacentElement("afterend", errorMessage);
      }
    } else {
      const name = document.querySelector(`[name="${key}"]`);
      let input;
      if (name.name === 'locationLastTournament') {
        input = document.getElementById('lastTournament');
      } else {
        input = name;
      }

      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
      const errorMessage = document.querySelector(`[name="${key}"] ~ .error-message`);
      if (errorMessage) {
        errorMessage.remove();
      }
    }
  });
}

function showInputErrors(errors, key) {
  const inputErrors = errors[key];
  let lastErrorOfKey;
  if (inputErrors !== undefined && inputErrors.length > 0) {
    lastErrorOfKey = inputErrors[inputErrors.length - 1];

    const name = document.querySelector(`[name="${key}"]`);
    let input;
    
    if (name.name === 'locationLastTournament') {
      input = document.getElementById('lastTournament');
    } else {
      input = name;
      input.classList.add('error');
    }
    
    let errorMessage = document.querySelector(`[name="${key}"] ~ .error-message`);
    if (inputErrors.length > 0) {
      if (errorMessage) {
        errorMessage.innerHTML = "";
        errorMessage.innerHTML = lastErrorOfKey;
      } else {
        errorMessage = document.createElement("p");
        errorMessage.classList.add('error-message');
        errorMessage.setAttribute('data-error', 'true');
        errorMessage.setAttribute('data-error-visible', 'true');
        errorMessage.innerHTML = lastErrorOfKey;
        input.insertAdjacentElement("afterend", errorMessage);
      }
    }
  } else {
    const name = document.querySelector(`[name="${key}"]`);
    let input;
    if (name.name === 'locationLastTournament') {
      input = document.getElementById('lastTournament');
      let errorMessages = document.querySelectorAll('#lastTournament ~ .error-message');
      errorMessages.forEach((errorMessage) => {
        errorMessage.remove();
      });
    } else {
      input = name;
      input.classList.remove('error');
      const errorMessage = document.querySelector(`[name="${key}"] ~ .error-message`);
      if (errorMessage) {
        errorMessage.remove();
      }
    }
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