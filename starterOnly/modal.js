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
const regexpNbOfTornaments = /^[0-9]+$/

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

form.addEventListener('submit', function (e) {
  event.preventDefault();

  const formData = new FormData(form);

  const errors = {
    // firstName: [],
    // lastName: [],
    // email: [],
    // birthdate: [],
    // nbOfTournaments: [],
    // location: [],
    // termsOfUse: []
  }

  const firstNameValue = formData.get("first_name").trim();
  const lastNameValue = formData.get("last_name").trim();
  const emailValue = formData.get("email").trim();
  const birthdateValue = formData.get("birthdate");
  const nbOfTournamentsValue = parseInt(formData.get("nb_of_tournaments"), 10);
  const lastTournamentValue = formData.get("location");
  const termsOfUseValue = formData.get("terms_of_use");

  console.log('formData', {
    firstNameValue,
    lastNameValue,
    emailValue,
    birthdateValue,
    nbOfTournamentsValue,
    lastTournamentValue,
    termsOfUseValue
  })

  if (firstNameValue.length === 0) {
    e.preventDefault();
    errors.firstName = "";
    errors.firstName ="Veuillez entrer votre prénom";

    const oldErrMsg = document.querySelector("#first_name_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "first_name_error");
    newErrMsg.innerHTML = "";
    newErrMsg.innerHTML = errors.firstName;
    document.getElementById("first_name").parentNode.appendChild(newErrMsg);
  }
  if (firstNameValue.length > 0 && firstNameValue.length < 2) {
    e.preventDefault();
    errors.firstName = "Le prénom doit contenir au moins 2 caractères";
  }
  if (firstNameValue.length >=  2 && !regexpName.test(firstNameValue)) {
    e.preventDefault();
    errors.firstName = "Le prénom n'est pas valide";
  }

  if (lastNameValue.length === 0) {
    e.preventDefault();
    errors.lastName ="Veuillez entrer votre nom";

    const oldErrMsg = document.querySelector("#last_name_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "last_name_error");
    newErrMsg.innerHTML = "";
    newErrMsg.innerHTML = errors.lastName;
    document.getElementById("last_name").parentNode.appendChild(newErrMsg);
  }
  if (lastNameValue.length > 0 && lastNameValue.length < 2) {
    e.preventDefault();
    errors.lastName = "Le nom doit contenir au moins 2 caractères";
  }
  if (lastNameValue.length >=  2 && !regexpName.test(lastName)) {
    e.preventDefault();
    errors.lastName = "Le nom n'est pas valide";
  }

  if (emailValue.length === 0) {
    e.preventDefault();
    errors.email = "Veuillez entrer votre email";

    const oldErrMsg = document.querySelector("#email_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "email_error");
    newErrMsg.innerHTML = "";
    newErrMsg.innerHTML = errors.email;
    document.getElementById("email").parentNode.appendChild(newErrMsg);
  } else if (!regexpEmail.test(emailValue)) {
    e.preventDefault();
    errors.email ="L'email n'est pas valide";
  }

  if (birthdateValue.length === 0) {
    e.preventDefault();
    errors.birthdate = "Veuillez renseigner votre date de naissance";


    const oldErrMsg = document.querySelector("#birthdate_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "birthdate_error");
    newErrMsg.innerHTML = "";
    newErrMsg.innerHTML = errors.birthdate;
    document.getElementById("birthdate").parentNode.appendChild(newErrMsg);
  } else if (!regexpBirthdate.test(birthdateValue)) {
    e.preventDefault();
    errors.birthdate = "La date de naissance n'est pas valide";
  }

  if (nbOfTournamentsValue.length === 0) {
    e.preventDefault();
    errors.nbOfTournaments = "Veuillez renseigner le nombre de tournois auxquels vous avez participer";

    const oldErrMsg = document.querySelector("#nb_of_tournaments_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "nb_of_tournaments_error");
    newErrMsg.innerHTML = "";
    newErrMsg.innerHTML = errors.nbOfTournaments;
    document.getElementById("nb_of_tournaments").parentNode.appendChild(newErrMsg);
  } else if ((nbOfTournamentsValue < 0 || nbOfTournamentsValue > 0) && !regexpNbOfTornaments.test(nbOfTournamentsValue)) {
    e.preventDefault();
    errors.nbOfTournaments ="Le nombre de tournois n'est pas valide";
  }

  const tournaments = document.getElementsByName("location");

  for (let i = 0; i < tournaments.length; i++) {
    if (tournaments[i].checked) {
      break;
    } else {
      e.preventDefault();
      errors.location = "Veuillez indiquer le lieu de votre dernier tournoi";
    }
  }

  if (termsOfUseValue !== "on") {
    e.preventDefault();
    errors.termsOfUse = "Veuillez accepter les conditions d'utilisation";
  }

  console.log('errors', errors);
});

firstName.addEventListener("input", (e) => {
  e.preventDefault();
  // if (firstName.classList.contains("error")) {
  //   firstName.classList.remove("error");
  // }
  if (e.target.value.trim().length === 0) {
    errors.firstName = "Veuillez entrer votre pr&eacute;nom";
  } else if (e.target.value.trim().length > 0 && e.target.value.trim().length < 2) {
    errors.firstName = "Le pr&eacute;nom doit contenir au moins 2 caractères";
  } else if (e.target.value.trim().length >= 2 && !regexpName.test(e.target.value.trim())) {
    errors.firstName = "Le pr&eacute;nom n'est pas valide";
  } else {
    errors.firstName = "";
  }

  if (errors.firstName.length > 0) {
    if(!firstName.classList.contains("error")) { firstName.classList.add("error"); }
    firstName.setAttribute("data-error", "true");
    firstName.setAttribute("data-error-visible", "true");

    const oldErrMsg = document.querySelector("#first_name_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "first_name_error");
    newErrMsg.innerHTML = "";
    firstName.parentNode.appendChild(newErrMsg);
    newErrMsg.innerHTML = errors.firstName;
  } else {
    if (firstName.classList.contains("error")) {
      firstName.classList.remove("error");
    }
    firstNameField.setAttribute("data-error", "false");
    firstNameField.setAttribute("data-error-visible", "false");
    const newErrMsg = document.getElementById("first_name_error");
    if (newErrMsg) {
      newErrMsg.remove();
    }
  }
});

lastName.addEventListener("input", (e) => {
  e.preventDefault();
  if (lastName.classList.contains("error")) {
    lastName.classList.remove("error");
  }
  if (e.target.value.trim().length === 0) {
    errors.lastName = "Veuillez entrer votre nom";
  } else if (e.target.value.trim().length > 0 && e.target.value.trim().length < 2) {
    errors.lastName = "Le nom doit contenir au moins 2 caractères";
  } else if (e.target.value.trim().length >= 2 && !regexpName.test(e.target.value.trim())) {
    errors.lastName = "Le nom n'est pas valide";
  } else {
    errors.lastName = "";
  }

  if (errors.lastName.length > 0) {
    if(!lastName.classList.contains("error")) { lastName.classList.add("error"); }
    lastName.setAttribute("data-error", "true");
    lastName.setAttribute("data-error-visible", "true");

    const oldErrMsg = document.querySelector("#last_name_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }

    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "last_name_error");
    newErrMsg.innerHTML = errors.lastName;
    lastName.parentNode.appendChild(newErrMsg);
  } else {
    if (lastName.classList.contains("error")) {
      lastName.classList.remove("error");
    }
    lastNameField.setAttribute("data-error", "false");
    lastNameField.setAttribute("data-error-visible", "false");
    const newErrMsg = document.getElementById("last_name_error");
    if (newErrMsg) {
      newErrMsg.remove();
    }
  }
});

email.addEventListener("input", (e) => {
  e.preventDefault();
  if (email.classList.contains("error")) {
    email.classList.remove("error");
  }
  if (e.target.value.trim().length === 0) {
    errors.email = "Veuillez entrer votre email";
  } else if (e.target.value.trim().length > 0 && !regexpEmail.test(e.target.value.trim())) {
    errors.email = "L'email n'est pas valide";
  } else {
    errors.email = "";
  }

  if (errors.email.length > 0) {
    if(!email.classList.contains("error")) {
      email.classList.add("error");
    }
    email.setAttribute("data-error", "true");
    email.setAttribute("data-error-visible", "true");

    const oldErrMsg = document.querySelector("#email_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "email_error");
    newErrMsg.innerHTML = errors.email;
    email.parentNode.appendChild(newErrMsg);
  } else {
    if (email.classList.contains("error")) {
      email.classList.remove("error");
    }
    emailField.setAttribute("data-error", "false");
    emailField.setAttribute("data-error-visible", "false");
    const newErrMsg = document.getElementById("email_error");
    if (newErrMsg) {
      newErrMsg.remove();
    }
  }
});

birthdate.addEventListener("input", (e) => {
  e.preventDefault();

  const birthdateFormated = e.target.valueAsDate;
  const day = birthdateFormated.getDate();
  const month = birthdateFormated.getMonth() + 1;
  const year = birthdateFormated.getFullYear();
  const date = `${day}/${month}/${year}`;

  if (!regexpBirthdate.test(date)) {
    errors.birthdate = "La date de naissance n'est pas valide";
  } else {
    errors.birthdate = "";
  }

  if (birthdate.classList.contains("error")) {
    birthdate.classList.remove("error");
  }
  if (date.length === 0) {
    errors.birthdate = "Veuillez renseigner votre date de naissance";
  } else if (date.length !== 0 && !regexpBirthdate.test(date)) {
    errors.birthdate = "La date de naissance n'est pas valide";
  } else {
    errors.birthdate = "";
  }
  if (errors.birthdate.length > 0) {
    if(!birthdate.classList.contains("error")) {
      birthdate.classList.add("error");
    }
    birthdate.setAttribute("data-error", "true");
    birthdate.setAttribute("data-error-visible", "true");
    const oldErrMsg = document.querySelector("#birthdate_error");
    if (oldErrMsg) {
      oldErrMsg.remove();
    }
    const newErrMsg = document.createElement("p");
    newErrMsg.classList.add("error-message");
    newErrMsg.setAttribute("id", "birthdate_error");
    newErrMsg.innerHTML = errors.birthdate;
    birthdate.parentNode.appendChild(newErrMsg);
  } else {
    if (birthdate.classList.contains("error")) {
      birthdate.classList.remove("error");
    }
    birthdateField.setAttribute("data-error", "false");
    birthdateField.setAttribute("data-error-visible", "false");
    const newErrMsg = document.getElementById("birthdate_error");
    if (newErrMsg) {
      newErrMsg.remove();
    }
  }
});

