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
    firstName: [],
    lastName: [],
    email: [],
    birthdate: [],
    nbOfTournaments: [],
    location: [],
    termsOfUse: []
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
    errors.firstName.push("Veuillez entrer votre prénom");
  }
  if (firstNameValue.length < 2) {
    e.preventDefault();
    errors.firstName.push("Le prénom doit contenir au moins 2 caractères");
  }
  if (!regexpName.test(firstNameValue)) {
    e.preventDefault();
    errors.firstName.push("Le prénom n'est pas valide");
  }

  if (lastNameValue.length === 0) {
    e.preventDefault();
    errors.lastName.push("Veuillez entrer votre nom");
  }
  if (lastNameValue.length < 2) {
    e.preventDefault();
    errors.lastName.push("Le nom doit contenir au moins 2 caractères");
  }
  if (!regexpName.test(lastName)) {
    e.preventDefault();
    errors.lastName.push("Le nom n'est pas valide");
  }

  if (email.length === 0) {
    e.preventDefault();
    errors.email.push("L'email ne peut pas être vide");
  }
  if (!regexpEmail.test(email)) {
    e.preventDefault();
    errors.email.push("L'email n'est pas valide");
  }

  if (birthdate.length === 0) {
    e.preventDefault();
    errors.birthdate.push("Veuillez renseigner votre date de naissance");
  }
  if (!regexpBirthdate.test(birthdate)) {
    e.preventDefault();
    errors.birthdate.push("La date de naissance n'est pas valide");
  }

  if (nbOfTournaments.length === 0) {
    e.preventDefault();
    errors.nbOfTournaments.push("Veuillez renseigner le nombre de tournois auxquels vous avez participer");
  }
  if (!regexpNbOfTornament.test(nbOfTournaments)) {
    e.preventDefault();
    errors.nbOfTournaments.push("Le nombre de tournois n'est pas valide");
  }

  const tournaments = document.getElementsByName("location");

  if (tournaments.length === 0) {
    e.preventDefault();
    errors.location.push("Veuillez renseigner votre dernier tournoi");
  }

  if (termsOfUseValue !== "on") {
    e.preventDefault();
    errors.termsOfUse.push("Veuillez accepter les conditions d'utilisation");
  }

});
