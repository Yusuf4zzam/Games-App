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

/* -------------------------------------- Form Box On Change  -------------------------------------- */
let inputs = $$(".contact form .input");

inputs.forEach((e) => {
  e.addEventListener("input", (e) => {
    e.currentTarget.value.length > 0
      ? e.currentTarget.parentElement.children[1].classList.add("active")
      : e.currentTarget.parentElement.children[1].classList.remove("active");
  });
});

/* -------------------------------------- Start The Animation On Scroll Library  -------------------------------------- */
AOS.init();
