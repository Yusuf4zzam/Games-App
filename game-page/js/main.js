let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

/* -------------------------------------- Srcoll Up  -------------------------------------- */
let scrollUpBtn = $(".scroll-up");

window.addEventListener("scroll", () => {
  scrollUpBtn.classList.toggle("active", window.scrollY > 400);
});

scrollUpBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

/* -------------------------------------- Dark Mode Button  -------------------------------------- */
let darkModeBtn = $("header .toggler");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem("body-color", document.body.className);

  darkModeBtn.classList.toggle("active");

  darkModeBtn.children[0].classList.toggle("fa-moon");

  darkModeBtn.children[0].classList.toggle("fa-sun");
});

if (localStorage.getItem("body-color") == "dark") {
  document.body.classList.add("dark");
  darkModeBtn.classList.add("active");
  darkModeBtn.children[0].classList.toggle("fa-sun");
}

/* -------------------------------------- Burger icon Toggler  -------------------------------------- */
let burgerToggler = $(".burger-toggler");

burgerToggler.addEventListener("click", () => {
  burgerTogglerFunc();
});

$(".overlay").addEventListener("click", () => {
  burgerTogglerFunc();
});

function burgerTogglerFunc() {
  burgerToggler.classList.toggle("open");

  $(".overlay").classList.toggle("active");

  $("nav .main-lists").classList.toggle("active");
}

/* -------------------------------------- Drop Down List Toggler  -------------------------------------- */
let dropDownBtn = $$(".drop-down-btn");

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("drop-down-btn")) {
    e.target.classList.toggle("active");
  } else if (e.target.parentElement.classList.contains("drop-down-btn")) {
    e.target.parentElement.classList.toggle("active");
  } else {
    dropDownBtn.forEach((e) => e.classList.remove("active"));
  }
});

/* -------------------------------------- Check If The Session Storage Property Is Available -------------------------------------- */
window.addEventListener("load", () => {
  if (location.hash) {
    createGameData(location.hash);
  } else if (sessionStorage.getItem("gameName")) {
    createGameData(sessionStorage.getItem("gameName"));
    location.hash = sessionStorage.getItem("gameName");
  } else {
    errorMsg();
  }
});

/* -------------------------------------- Error Message Function -------------------------------------- */
function errorMsg() {
  document.querySelector(".slider-page .container").innerHTML = "";

  document.title = "XGAMES | Not Found";

  let errorHandlerBox = document.createElement("div");
  errorHandlerBox.className = "error-handler";

  let errorIcon = document.createElement("i");
  errorIcon.className = "fa-solid fa-circle-exclamation";

  let errorHeading = document.createElement("h3");
  errorHeading.textContent = "Error 404 Page Not Found";

  errorPragraph = document.createElement("p");
  errorPragraph.textContent =
    "It looks like you've reached a URL that doesn’t exist. Please use the navigation above to find your way back to our a-maize-ing website.";

  errorHandlerBox.appendChild(errorIcon);
  errorHandlerBox.appendChild(errorHeading);
  errorHandlerBox.appendChild(errorPragraph);

  $(".slider-page .container").appendChild(errorHandlerBox);
}

/* -------------------------------------- Create The Game Data Function -------------------------------------- */
function createGameData(target) {
  fetch("../../games/games.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((e) => {
        if (
          target
            .slice(1)
            .split(" ")
            .join("")
            .split(":")
            .join("")
            .toLowerCase() ==
          e.gameName.split(" ").join("").split(":").join("").toLowerCase()
        ) {
          let pageName = target.slice(1).toLocaleUpperCase();

          /* -------------------------------------- Change Value Of The Slide Page Name Span  -------------------------------------- */
          $$(".slider-page .page-name").forEach(
            (el) => (el.textContent = e.gameName)
          );

          /* -------------------------------------- Change The Title Of The Page  -------------------------------------- */
          document.title = "XGAMES | " + pageName;

          location.hash = e.gameName
            .split(" ")
            .join("")
            .split(":")
            .join("")
            .toLowerCase();

          sessionStorage.setItem(
            "gameName",
            "#" +
              e.gameName.split(" ").join("").split(":").join("").toLowerCase()
          );

          $(
            ".slider-page"
          ).style.backgroundImage = `url(../../games/images/${e.gameName
            .split(" ")
            .join("")
            .split(":")
            .join("")
            .toLowerCase()}.jpg)`;

          $(".slider-page").style.backgroundPosition = "top center";

          sliderGames(e);
        }
      });
    });
}

/* -------------------------------------- Create The Game Slider Data -------------------------------------- */
function sliderGames(target) {
  // Create The container Box
  let container = document.createElement("div");
  container.classList.add("container");

  // create The Game Info Conteianer
  let gameInfo = document.createElement("div");
  gameInfo.classList.add("game-info");

  // Create The Img Box Container
  let imgBox = document.createElement("div");
  imgBox.classList.add("img-box");

  // create The Main Img
  let mainImg = document.createElement("img");
  mainImg.src = `../../games/images/${target.gameName
    .split(" ")
    .join("")
    .split(":")
    .join("")
    .toLowerCase()}.jpg`;

  mainImg.alt = "Game Image";

  // Append The Main Image To The image Container
  imgBox.appendChild(mainImg);

  // Append The Image Container To The Game Info Box Container
  gameInfo.appendChild(imgBox);

  // Create The Text Box
  let textBox = document.createElement("div");
  textBox.classList.add("text-box");

  // Create The Heading Text Box
  let headingText = document.createElement("h3");
  headingText.textContent = target.gameName;

  // Append The Heading Text To The Text Box
  textBox.appendChild(headingText);

  //Create The Rate Box
  let rateBox = document.createElement("div");
  rateBox.classList.add("rate");

  // Create The Full Star Rate
  for (let i = 0; i < target.rateFullStar; i++) {
    let rateIcon = document.createElement("i");
    rateIcon.className = "fas fa-star";

    // Append The Star To The Rate Box
    rateBox.appendChild(rateIcon);
  }

  // Create The Full Star Rate
  for (let i = 0; i < target.rateHalfStart; i++) {
    let rateIcon = document.createElement("i");
    rateIcon.className = "far fa-star";

    // Append The Star To The Rate Box
    rateBox.appendChild(rateIcon);
  }

  // Append The Rate Box To The Text Box container
  textBox.appendChild(rateBox);

  // Append The Tex box to The GAme Info Container
  gameInfo.appendChild(textBox);

  // Append The Game Info To The Box Container
  container.appendChild(gameInfo);

  // Create The Game Dec
  let gameDec = document.createElement("div");
  gameDec.classList.add("game-dec");

  // Create The Main Dec Text
  let mainGameDec = document.createElement("p");
  mainGameDec.textContent = target.gameDec;

  // Append The Main Dec Text To The Dec Container
  gameDec.appendChild(mainGameDec);

  // Append The Game Dec To The Container Box
  container.appendChild(gameDec);

  // Create The Dowload Btn Box
  let btnBox = document.createElement("div");
  btnBox.classList.add("download-btn");

  // Create The Main Btn
  let mainBtn = document.createElement("a");
  mainBtn.classList.add("special-btn");
  mainBtn.href = "data:application/octet-stream;base64,PD94ANDSOON";
  mainBtn.setAttribute(
    "download",
    `../../games/images/${target.gameName
      .split(" ")
      .join("")
      .split(":")
      .join("")
      .toLowerCase()}.jpg`
  );
  mainBtn.textContent = "Download";

  // Append The Main Btn To The Btn Box Container
  btnBox.appendChild(mainBtn);

  // Append The Btn Box to The Container Box
  container.appendChild(btnBox);

  // Append The Container Box To The Main Tag
  $("main").appendChild(container);
}
