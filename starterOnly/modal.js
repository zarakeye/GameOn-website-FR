// DOM Elements
const form = document.querySelector("form");
const modalbg = document.querySelector(".inscription-section");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const iconNav = document.querySelector(".main-navbar .icon");
const modalCloseBtn = document.querySelector(".inscription-section_modal--close");

const firstNameField = document.getElementById("first_name_field");
const firstName = document.getElementById("first_name");
const lastNameField = document.getElementById("last_name_field");
const lastName = document.getElementById("last_name");
const emailField = document.getElementById("email_field");
const email = document.getElementById("email");
const birthdateField = document.getElementById("birthdate_field");
const birthdate = document.getElementById("birthdate");
const nbOfTournamentsField = document.getElementById("nb_of_tournaments_field");
const nbOfTournaments = document.getElementById("nb_of_tournaments");
const lastTournament = document.getElementById("last_tournament");
const locations = document.querySelectorAll("#location_field input[name=location]");
const terms = document.getElementById("terms_of_use");

// Regexp
const regexpName = /^(?![-'\\d])[-'a-zA-ZÀ-ÿ]+$/;
const regexpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]{2,4}$/;
const regexpBirthdate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19[0-9]{2}|20[0-9]{2})$/;
const regexpNbOfTornament = /^[0-9]+$/

// Errors object
const errors = {
  // firstName: [],
  // lastName: [],
  // email: [],
  // birthdate: [],
  // nbOfTournaments: [],
  // location: [],
  // terms: [],
};

// Active the button of navigation
function editNav() {
  const header = document.getElementById("myTopnav");
  if (header.className === "topnav") {
    header.classList.add("responsive");
  } else {
    header.classList.remove("responsive");
  }
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// modal close button event listener
modalCloseBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Prevent page reload
iconNav.addEventListener("click", (e) => {
  e.preventDefault();
  editNav();
});


// test if first name input is valid
firstName.addEventListener("change", (e) => {
  if(regexpName.test(e.target.value.trim()) && e.target.value.trim().length >= 2) {
    // removeErrorStatus(firstName);
    errors.firstName = "";
    document.querySelector(`${e.target.id} ~ .error-message`).remove();
  } else if (regexpName.test(e.target.value.trim()) && e.target.value.trim().length < 2) {
    errors.firstName = "Le pr&eacute;nom doit contenir au moins 2 caractères";
    document.querySelector(`${e.target.id} ~ .error-message`).innerHTML("");
    document.querySelector(`${e.target.id} ~ .error-message`).innerHTML(errors.firstName);
  } else if (!regexpName.test(e.target.value.trim())) {
    errors.firstName = "Le pr&eacute;nom n'est pas valide";
    document.querySelector(`${e.target.id} ~ .error-message`).innerHTML("");
    document.querySelector(`${e.target.id} ~ .error-message`).innerHTML("Le pr&eacute;nom n'est pas valide");
   }
});

firstName.addEventListener("focus", (e) => {
  focusHandler(e);
});


lastName.addEventListener("change", (e) => {
  if(regexpName.test(e.target.value.trim()) && e.target.value.trim().length >= 2) {
    removeErrorStatus(lastName);
  } else if (regexpName.test(e.target.value.trim()) && e.target.value.trim().length < 2) {
    applyErrorStatus(lastName, "Le nom doit contenir au moins 2 caractères");
  } else if (!regexpName.test(e.target.value.trim())) {
    applyErrorStatus(lastName, "Le nom n'est pas valide");
   }
});

lastName.addEventListener("focus", (e) => {
  focusHandler(e);
});

email.addEventListener("change", (e) => {
  if (regexpEmail.test(e.target.value.trim())) {
    removeErrorStatus(email);
  } else {
    applyErrorStatus(email, "L'email n'est pas valide");
  }
});

email.addEventListener("focus", (e) => {
  focusHandler(e);
});

birthdate.addEventListener("change", (e) => {
  const birthdateValue = birthdate.valueAsDate;
  console.log(birthdateValue);
  const day = birthdateValue.getDate();
  console.log(day);
  const month = birthdateValue.getMonth() + 1;
  console.log(month);
  const year = birthdateValue.getFullYear();
  console.log(year);
  const date = `${day}/${month}/${year}`;
  console.log(date);
  if (!regexpBirthdate.test(date)) {
    applyErrorStatus(birthdate, "La date de naissance n'est pas valide");
  } else {
    removeErrorStatus(birthdate);
  }
})

birthdate.addEventListener("focus", (e) => {
  focusHandler(e);
});

nbOfTournaments.addEventListener("change", (e) => {
  const nbOfTournamentsField = document.getElementById("nb_of_tournaments_field");
  if (e.target.value !== "" && parseInt(e.target.value.trim(), 10) < 0) {
    applyErrorStatus(nbOfTournamentsField, "Le nombre de tournois doit être positif");
  } else {
    removeErrorStatus(nbOfTournaments);
  }
});

nbOfTournaments.addEventListener("focus", (e) => {
  focusHandler(e);
});

function applyErrorStatus(domElement) {
  const field = document.getElementById(`${domElement.id}_field`);
  // console.log(field);

  field.classList.add("error");
  field.setAttribute("data-error", "true");
  field.setAttribute("data-error-visible", "true");
  
  const errorMessage = document.querySelector(`${domElement.id} ~ .error-message`);
  // errorMessage.classList.add("error-message");
  errorMessage.innerHTML = "";
  // errorMessage.innerHTML = errors.domElement;
  // field.appendChild(errorMessage);
}


function removeErrorStatus(domElement) {
  const field = document.getElementById(`${domElement.id}_field`);
  field.classList.remove("error");
  field.setAttribute("data-error", "false");
  field.setAttribute("data-error-visible", "false");
  if (document.querySelector(`${domElement.id} ~ .error-message`)) {
    document.querySelector(`${domElement.id} ~ .error-message`).remove();
  }
}

function focusHandler(e) {
  const field = document.getElementById(`${e.target.id}_field`);
  field.classList.remove("error");
  e.target.setAttribute("data-error", "false");
  e.target.setAttribute("data-error-visible", "false");
  errors[`${e.target.id}`] = [];
}

function validate() {
  return Object.values(errors).every((error) => error.length === 0);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const firstNameValue = formData.get("first_name").trim();
  const lastNameValue = formData.get("last_name").trim();
  const emailValue = formData.get("email").trim();
  const birthdateValue = formData.get("birthdate");
  const nbOfTournamentsValue = parseInt(formData.get("nb_of_tournaments"), 10);
  const locationValue = formData.get("location");
  const termsValue = formData.get("terms_of_use");
  const eventsNotificationValue = formData.get("events_notification");

  const lastTournament = document.getElementById("last_tournament");
  const termsOfUseLabel = document.querySelector("label[for='terms_of_use']");

  console.log('formData', {
    firstNameValue,
    lastNameValue,
    emailValue,
    birthdateValue,
    nbOfTournamentsValue,
    locationValue,
    termsValue,
    eventsNotificationValue
  });

  if (firstNameValue.trim().length === 0) {
    errors.firstName = "Veuillez renseigner votre pr&eacute;nom";
    // const firstNameField = document.getElementById("first_name_field");
    if (!firstName.classList.contains("error")) {
      firstName.classList.add("error");
    }
    firstName.setAttribute("data-error", "true");
    firstName.setAttribute("data-error-visible", "true"); 

    let errorMessage = `
      <p class="error-message">${errors.firstName}</p>`;
    
    firstName.insertAdjacentElement("afterend", errorMessage);
  }

  if (regexpName.test(firstNameValue) && firstNameValue.trim().length < 2) {
    
    errors.firstName = "Le prénom doit contenir au moins 2 caractères";
    
    if (!firstName.classList.contains("error")) {
      firstName.classList.add("error");
    }
    firstName.setAttribute("data-error", "true");
    firstName.setAttribute("data-error-visible", "true");

    const errorMessage = document.createElement("p");
    // const errorMessage = document.querySelector("#first_name ~ .error-message");
    
    errorMessage.classList.add("error-message");
    errorMessage.innerHTML = errors.firstName;
    firstNameField.appendChild(errorMessage);
  }

  if (regexpName.test(firstNameValue) && firstNameValue.trim().length >= 2) {
    removeErrorStatus(firstName);
  }

  if (lastNameValue.trim().length === 0) {
    errors.lastName = [];
    // errors.lastName.push("Veuillez renseigner votre nom");

    // applyErrorStatus(lastName, errors.lastName[0]);
    applyErrorStatus(lastName, "Veuillez renseigner votre nom");
  }

  if (emailValue.trim().length === 0) {
    errors.email = [];
    errors.email.push("Veuillez renseigner votre email");
    applyErrorStatus(email, errors.email[0]);
  }

  if (birthdateValue.trim().length === 0) {
    errors.birthdate = [];
    errors.birthdate.push("Veuillez renseigner votre date de naissance");
    applyErrorStatus(birthdate, errors.birthdate[0]);
  }

  if (nbOfTournamentsValue.length === 0) {
    errors.nbOfTournaments = [];
    errors.nbOfTournaments.push("Veuillez renseigner le nombre de tournois auxquels vous avez participé");
    // applyErrorStatus(nbOfTournaments, errors.nbOfTournaments[0]);
  }

  if (!isNaN(nbOfTournamentsValue)) {
    errors.nbOfTournaments = [];
    errors.nbOfTournaments.push("Le nombre de tournois doit être un nombre");
    // applyErrorStatus(lastTournament, errors.nbOfTournaments[0]);
  }

  if (nbOfTournamentsValue < 0) {
    errors.nbOfTournaments = [];
    errors.nbOfTournaments.push("Le nombre de tournois doit être positif");
    // applyErrorStatus(nbOfTournaments, errors.nbOfTournaments[0]);
  }

  if (document.querySelectorAll("input[name='location']:checked").length === 0) {
    errors.location = [];
    errors.location.push(`Veuillez sélectionner la ville de votre dernier tournoi *`);

    // lastTournament.setAttribute("data-error", "true");
    // lastTournament.setAttribute("data-error-visible", "true");

    // const error = `${errors.location}`;
    // const errorMessage = document.createElement("p");
    // errorMessage.classList.add("error-message");
    // errorMessage.setAttribute("id", "last_tournament_error");
    // errorMessage.innerHTML = error;
    // lastTournament.appendChild(errorMessage);

  } else {
    lastTournament.setAttribute("data-error", "false");
    lastTournament.setAttribute("data-error-visible", "false");
    errors.location = [];
    if (document.getElementById("last_tournament_error")) {
      document.getElementById("last_tournament_error").remove();
    }
  }

  if (termsValue !== "on") {
    errors.terms = [];
    if (document.getElementById("terms_of_use_error")) {
      document.getElementById("terms_of_use_error").remove();
    }
    errors.terms.push("Veuillez accepter les conditions d'utilisation");
    termsOfUseLabel.setAttribute("data-error", "true");
    termsOfUseLabel.setAttribute("data-error-visible", "true");
    const error = `${errors.terms}`;
    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("id", "terms_of_use_error");
    errorMessage.classList.add("error-message");
    errorMessage.innerHTML = error;
    termsOfUseLabel.insertAdjacentElement("afterend", errorMessage);
  } else {
    errors.terms = [];
    termsOfUseLabel.setAttribute("data-error", "false");
    termsOfUseLabel.setAttribute("data-error-visible", "false");
    if (document.getElementById("terms_of_use_error")) {
      document.getElementById("terms_of_use_error").remove();
    }
    closeModal();
  }
});




