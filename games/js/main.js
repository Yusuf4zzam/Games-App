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

/* -------------------------------------- Change The Title Of The Page  -------------------------------------- */
let pageName = "GAMES";

document.title = "XGAMES | " + pageName;

/* -------------------------------------- Change Value Of The Slide Page Name Span  -------------------------------------- */
$$(".slider-page .page-name").forEach((e) => (e.textContent = pageName));

/* -------------------------------------- Iterate On THe Games Data  -------------------------------------- */
fetch("./games.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((e) => {
      // Create The Box Container
      let box = document.createElement("a");
      box.classList.add("box");
      box.href = "../game-page/index.html";
      box.setAttribute("data-gamename", e.gameName);

      // create The Image Container
      let imgContainer = document.createElement("div");
      imgContainer.classList.add("img-box");

      // Create The Main Image
      let mainImg = document.createElement("img");
      mainImg.src = e.gameImg;
      mainImg.alt = "Game Image";

      // Append The Main Image To The Img Container
      imgContainer.appendChild(mainImg);

      // Create The Text Container
      let textContainer = document.createElement("div");
      textContainer.classList.add("text-box");

      // Create The Heading Of The Game Box
      let heading = document.createElement("h3");
      heading.textContent = e.gameName;

      // Create The Paragaph Of The Game Box
      let paragraph = document.createElement("p");
      paragraph.textContent = e.gameDec;

      // Append The Heading And The Paragraph To The Text Container
      textContainer.appendChild(heading);
      textContainer.appendChild(paragraph);

      // Append The Image Container And The Text Container To The Box Container
      box.appendChild(imgContainer);
      box.appendChild(textContainer);

      // Append The box Container To The Page
      $("main .container").appendChild(box);
    });
  })
  .then(() => {
    /* -------------------------------------- Each Box On Click Function  -------------------------------------- */
    $$("main .container .box").forEach((e) => {
      e.addEventListener("click", (e) => {
        sessionStorage.setItem(
          "gameName",
          "#" + e.currentTarget.dataset.gamename
        );
      });
    });
  });
