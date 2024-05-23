const modalbg = document.querySelector(".inscription-section");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelector(".inscription-section_modal--close");
const iconNav = document.querySelector(".main-navbar .icon");


// Regexp
const regexpName = /^[a-zÀ-ÿ][-'a-zA-ZÀ-ÿ]+$/;
const regexpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexpBirthdate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19[0-9]{2}|20[0-9]{2})$/

function editNav() {
  const header = document.getElementById("myTopnav");
  if (header.className === "topnav") {
    header.classList.add("responsive");
  } else {
    header.classList.remove("responsive");
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/** Listeners **/
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal form
modalCloseBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
})

// Prevent page reload
iconNav.addEventListener("click", (e) => {
  e.preventDefault();
  editNav();
})

const form = document.querySelector('form');



// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------


form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const formData = new FormData(form)

  const errors = {
    firstName: [],
    lastName: [],
    email: [],
    birthdate: [],
    quantity: [],
    location: [],
    termsAccepted: []  
  }
  
  const firstName = formData.get("first_name").trim() 
  const lastName = formData.get("last_name").trim()
  const email = formData.get("email").trim()
  const birthdate = formData.get("birthdate")
  const nbOfTournaments = parseInt(formData.get("nb_of_tournaments"), 10)
  const location = formData.get("location")
  const termsAccepted = formData.get("terms_and_conditions")
  const eventsNotification = formData.get("events_notification");
  
  console.log('formData', {
    firstName,
    lastName,
    email,
    birthdate,
    nbOfTournaments,
    location,
    termsAccepted,
    eventsNotification
  });

  // if (firstName.length === 0) {
  //   errors.firstName.push('Veuillez entrer votre prénom')
  // }

  // if (firstName.length < 2) {
  //   errors.firstName.push('Le prénom doit comporter au moins 2 caractères');
  // }

  // if (lastName.length === 0) {
  //   errors.firstName.push('Veuillez entrer votre prénom');
  // }

  // if (lastName.length < 2) {
  //   errors.lastName.push('Le nom doit comporter au moins 2 caractères');
  // }

  if (firstName.length === 0) {
    errors.firstName.push("Le prénom ne peut pas être vide");
  }

  if (firstName.length < 2) {
    errors.firstName.push("Le prénom doit contenir au moins 2 caractères");
  }

  if (!regexpName.test(firstName)) {
    errors.firstName.push("Le prénom n'est pas valide");
  }
  
  if (lastName.length === 0) {
    errors.lastName.push("Le nom ne peut pas être vide");
  }

  if (lastName.length < 2) {
    errors.lastName.push("Le nom doit contenir au moins 2 caractères");
  }

  if (!regexpName.test(lastName)) {
    errors.lastName.push("Le nom n'est pas valide");
  }

  if (email.length === 0) {
    errors.email.push("L'email ne peut pas être vide");
  }

  if (!regexpEmail.test(email)) {
    errors.email.push("L'email n'est pas valide");
  }

  if (!isNaN(nbOfTournaments)) {
    errors.nbOfTournaments.push("Le nombre de tournois doit être un nombre");
  }
}); 

