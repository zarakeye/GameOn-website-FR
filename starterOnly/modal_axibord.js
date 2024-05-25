const modalbg = document.querySelector(".inscription-section");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelector(
  ".modal--close"
);
const iconNav = document.querySelector(".main-navbar .icon");

// Regexp
const regexpName = /^[a-zÀ-ÿ][-'a-zA-ZÀ-ÿ]+$/;
const regexpEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexpBirthdate =
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19[0-9]{2}|20[0-9]{2})$/;

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
});

// Prevent page reload
iconNav.addEventListener("click", (e) => {
  e.preventDefault();
  editNav();
});

const form = document.querySelector("form");

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const errors = {
    first_name: [],
    last_name: [],
    email: [],
    birthdate: [],
    nb_of_tournaments: [],
    location: [],
    terms_of_use: [],
  };

  const firstName = formData.get("first_name").trim();
  const lastName = formData.get("last_name").trim();
  const email = formData.get("email").trim();
  const birthdate = formData.get("birthdate");
  const nbOfTournaments = parseInt(formData.get("nb_of_tournaments"), 10);
  const lastTournament = formData.get("location");
  const termsOfUse = formData.get("terms_of_use");

  console.log("formData", {
    firstName,
    lastName,
    email,
    birthdate,
    nbOfTournaments,
    lastTournament,
    termsOfUse,
  });

  if (firstName.length === 0) {
    errors["first_name"].push("Le prénom ne peut pas être vide");
  }

  if (firstName.length < 2) {
    errors["first_name"].push("Le prénom doit contenir au moins 2 caractères");
  }

  if (!regexpName.test(firstName)) {
    errors["first_name"].push("Le prénom n'est pas valide");
  }

  if (lastName.length === 0) {
    errors["last_name"].push("Le nom ne peut pas être vide");
  }

  if (lastName.length < 2) {
    errors["last_name"].push("Le nom doit contenir au moins 2 caractères");
  }

  if (!regexpName.test(lastName)) {
    errors["last_name"].push("Le nom n'est pas valide");
  }

  if (email.length === 0) {
    errors.email.push("L'email ne peut pas être vide");
  }

  if (!regexpEmail.test(email)) {
    errors.email.push("L'email n'est pas valide");
  }

  if (!isNaN(nbOfTournaments)) {
    errors["nb_of_tournaments"].push(
      "Le nombre de tournois doit être un nombre"
    );
  }

  console.log("errors", errors);

  showErrors(errors);
});

function showErrors(errors) {
  // clean errors messages before showing new ones
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });

  const keys = Object.keys(errors);
  keys.forEach((key) => {
    const errors_key = errors[key];

    const input = document.querySelector(`[name="${key}"]`);

    const firstErrorOfKey = errors_key[0];
    if (firstErrorOfKey) {
      const errMsgDOM = document.createElement("p");
      errMsgDOM.classList.add("error-message");
      errMsgDOM.setAttribute("id", "first_name_error");
      errMsgDOM.innerHTML = "";
      errMsgDOM.innerHTML = firstErrorOfKey;
      input.insertAdjacentElement("afterend", errMsgDOM);
    }

    // --------------------------------------------
    // --------------------------------------------
    // POUR AFFICHER TOUTES LES ERREURS DE CHAQUE INPUT

    // errors_key.forEach((message) => {
    //   const errMsgDOM = document.createElement("p");
    //   errMsgDOM.classList.add("error-message");
    //   errMsgDOM.setAttribute("id", "first_name_error");
    //   errMsgDOM.innerHTML = "";
    //   errMsgDOM.innerHTML = message
    //   input.insertAdjacentElement("afterend", errMsgDOM);
    // });
  });
}
