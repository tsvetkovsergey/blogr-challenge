const nav = document.querySelector(".nav");
const links = document.querySelectorAll(".nav__link");
const subListsArr = Array.from(nav.querySelectorAll(".nav__sublist"));
const hambox = document.querySelector(".navbar__hamburger");
const hamburger = hambox.querySelector(".navbar__hamburger-style");

// Section images
const future_img = document.querySelector(".future__bg > img");
const simple_img = document.querySelector(".simple__bg > img");

const mediaQuery = "only screen and (max-width: 44em)";
let mql = window.matchMedia(mediaQuery);

// Tracks opened submenu index
let openedSublist = -1;
// Tracks opened mobile menu
let mobMenuOpened = false;

const setImages = function () {
  future_img.src = mql.matches
    ? "../images/illustration-editor-mobile.svg"
    : "../images/illustration-editor-desktop.svg";
  simple_img.src = mql.matches
    ? "../images/illustration-laptop-mobile.svg"
    : "../images/illustration-laptop-desktop.svg";
};
setImages();

const setNavLinksStyle = function () {
  if (mql.matches) {
    links.forEach((link) => {
      link.classList.remove("widescreen__link");
    });
    return;
  }

  links.forEach((link) => {
    link.classList.add("widescreen__link");
  });
};
setNavLinksStyle();

// Listen for screen width change
mql.addEventListener("change", function (e) {
  setImages();

  setNavLinksStyle();

  // Switch to widescreen view
  if (!mql.matches) {
    nav.style.animation = null;
    nav.style.visibility = "visible";
    mobMenuOpened = false;
    hamburger.classList.remove("active-ham");

    subListsArr.forEach((list) => {
      list.style.visibility = "hidden";
    });
    openedSublist = -1;
  }

  // Switch to mobile view
  if (mql.matches) {
    nav.style.visibility = "hidden";
    // if (openedSublist !== -1) hideSublist(subListsArr[openedSublist]);
    // console.log("mob: " + openedSublist);
    subListsArr.forEach((list) => {
      list.style.animation = null;
      list.style.maxHeight = null;
      list.style.visibility = "visible";
    });
  }
});

// Utility functions
const showSubList = function (sublist) {
  if (mql.matches) {
    sublist.style.maxHeight = `${sublist.scrollHeight}px`;

    const link = sublist.closest(".nav__item").querySelector(".nav__link");
    link.classList.add("active-link");
    return;
  }

  sublist.style.visibility = "visible";
  sublist.style.animation =
    "circle-fill-in 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
};

const hideSublist = function (sublist) {
  if (mql.matches) {
    sublist.style.maxHeight = null;

    const link = sublist.closest(".nav__item").querySelector(".nav__link");
    link.classList.remove("active-link");
    return;
  }

  sublist.style.animation =
    "circle-fill-out 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
};

const openMobMenu = function () {
  hamburger.classList.add("active-ham");
  nav.style.visibility = "visible";
  nav.style.animation =
    "circle-fill-in 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
  mobMenuOpened = true;
};

const closeMobMenu = function () {
  hamburger.classList.remove("active-ham");
  nav.style.animation =
    "circle-fill-out 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
  mobMenuOpened = false;
};

// Handlers
nav.addEventListener("click", function (e) {
  const link = e.target.closest(".nav__link");
  if (!link || link.classList.contains("nav__login")) return;
  e.preventDefault();

  const index = subListsArr.findIndex(
    (list) => list.dataset.name === link.dataset.name
  );

  if (openedSublist === index) {
    hideSublist(subListsArr[index]);
    openedSublist = -1;
    return;
  }

  if (openedSublist === -1) {
    showSubList(subListsArr[index]);
    openedSublist = index;
    return;
  }

  hideSublist(subListsArr[openedSublist]);
  showSubList(subListsArr[index]);
  openedSublist = index;
});

// Hide submenu and mobile menu when clicked outside
document.addEventListener("click", function (e) {
  ////////////////////
  // Mobile Menu Close
  // On mobile view if you clicked in nav do nothing
  // Nav has its own handler
  if (mql.matches && e.target.closest(".nav")) {
    return;
  }

  if (mobMenuOpened && !e.target.closest(".navbar__hamburger")) {
    closeMobMenu();
  }

  ////////////////////
  // Sub Menu Close
  // If there is no opened submenu
  // or you clicked on nav__item child (nav__link or
  // nav__sublist) do nothing
  if (openedSublist === -1 || e.target.closest(".nav__item")) return;

  // Hide submenu and reset openedSublist
  hideSublist(subListsArr[openedSublist]);
  openedSublist = -1;
});

hambox.addEventListener("click", function (e) {
  if (mobMenuOpened) {
    closeMobMenu();
    return;
  }

  openMobMenu();
});
