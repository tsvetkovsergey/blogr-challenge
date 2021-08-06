const nav = document.querySelector(".nav");
const links = document.querySelectorAll(".nav__link");
const subListsArr = Array.from(nav.querySelectorAll(".nav__sublist"));
const hambox = document.querySelector(".navbar__hamburger");
const hamburger = hambox.querySelector(".navbar__hamburger-style");

const sections = document.querySelectorAll("section");

// Section images
const futureBg = document.querySelector(".future__bg");
const future_img = document.querySelector(".future__bg > img");
const infraBg = document.querySelector(".infra__phones");
const simple_img = document.querySelector(".simple__bg > img");

// Titles
const futureTitle = document.querySelector(".future__title");

const mediaQuery = "only screen and (max-width: 44em)";
let mql = window.matchMedia(mediaQuery);

// Tracks opened submenu index
let openedSublist = -1;
// Tracks opened mobile menu
let mobMenuOpened = false;

const setImages = function () {
  const str = mql.matches ? "mobile" : "desktop";
  future_img.src = `../images/illustration-editor-${str}.svg`;
  simple_img.src = `../images/illustration-laptop-${str}.svg`;
};
setImages();

const setNavLinksStyle = function () {
  links.forEach((link) => {
    link.classList.remove("active-link");
    link.classList[mql.matches ? "remove" : "add"]("widescreen__link");
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
      list.style.maxHeight = "none";
    });
    openedSublist = -1;
  }

  // Switch to mobile view
  if (mql.matches) {
    nav.style.visibility = "hidden";
    subListsArr.forEach((list) => {
      list.style.animation = null;
      list.style.maxHeight = "0";
    });
  }
});

// Utility functions
const getLink = function (sublist) {
  return sublist.closest(".nav__item").querySelector(".nav__link");
};

const showSubList = function (sublist) {
  const link = getLink(sublist);
  link.classList.add("active-link");
  if (mql.matches) {
    sublist.style.visibility = "visible";
    sublist.style.maxHeight = `${sublist.scrollHeight}px`;
    return;
  }

  sublist.style.visibility = "visible";
  sublist.style.animation =
    "circle-fill-in 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
};

const hideSublist = function (sublist) {
  const link = getLink(sublist);
  link.classList.remove("active-link");
  if (mql.matches) {
    sublist.style.maxHeight = null;
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
// Enable :active states on Safari Mobile
document.addEventListener("touchstart", function () {}, false);

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

// //////////////////////////////////////////
// //INTERSECTION OBSERVER
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) return;
//     // console.log(entry);

//     const bg = entry.target;

//     let name = "";
//     // const inout = entry.isIntersecting ? "in" : "out";
//     // const opt = `${inout === "in" ? "1s" : ".2s"} forwards`;
//     const opt = `1.5s forwards`;

//     // Section Future
//     if (bg === futureBg) name = "future";

//     // Section Infra
//     if (bg === infraBg) name = "infra";

//     // Section Simple
//     if (bg === simple_img) name = "simple";

//     // bg.style.animation = `fade-${inout} ${opt}, slide-${inout}-${name} ${opt}`;
//     bg.style.animation = `fade-in ${opt}, slide-in-${name} ${opt}`;

//     observer.unobserve(bg);
//   });
// };

// const obsOptions = {
//   // null means viewport in this case
//   root: null,
//   // How much of the element should be visible
//   // to trigger event
//   threshold: 0.25,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// [futureBg, infraBg, simple_img].forEach((bg) => {
//   observer.observe(bg);
// });

//////////////////////////////////////////
// GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

// const em = document.querySelector("#em-size").offsetHeight;

gsap.to(".header__bg", {
  scrollTrigger: {
    trigger: "header",
    scrub: 0.4,
    start: "top top",
  },
  top: "-50%",
});

// ScrollTrigger.saveStyles(".future__bg, .simple__bg > img");
ScrollTrigger.saveStyles(".future__bg");

ScrollTrigger.matchMedia({
  "not all and (max-width: 44em)": function () {
    gsap.fromTo(
      ".future__bg",
      {
        x: "23%",
        y: "-50%",
        autoAlpha: 0,
      },
      {
        scrollTrigger: {
          trigger: ".future",
          start: "30% bottom",
          end: "70% top",
          toggleActions: "play reverse play reverse",
        },
        x: "-=15%",
        autoAlpha: 1,
        duration: 0.8,
      }
    );
  },

  "(max-width: 44em)": function () {
    gsap.from(".future__bg", {
      scrollTrigger: {
        trigger: ".future__bg",
        start: "20% bottom",
        end: "80% top",
        toggleActions: "play reverse play reverse",
      },
      x: "15%",
      y: "0",
      autoAlpha: 0,
      duration: 0.8,
    });
  },
});

ScrollTrigger.matchMedia({
  "not all and (max-width: 44em)": function () {
    gsap.fromTo(
      ".simple__bg > img",
      { x: "-27%", y: "-50%", autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: ".simple",
          start: "30% bottom",
          end: "70% top",
          toggleActions: "play reverse play reverse",
        },
        x: "+=15%",
        autoAlpha: 1,
        duration: 0.8,
      }
    );
  },

  "(max-width: 44em)": function () {
    gsap.fromTo(
      ".simple__bg > img",
      { x: "-65%", y: 0, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: ".simple__bg",
          start: "20% bottom",
          end: "80% top",
          toggleActions: "play reverse play reverse",
        },
        x: "-50%",
        autoAlpha: 1,
        duration: 0.8,
      }
    );
  },
});

//////////////////////////////////////////
// TEXT ANIMATIONS

const animateText = function (text) {
  const strText = text.textContent;

  // Split text
  const splitText = strText.split("");

  // Change simple text with letters each
  // in individual <span>
  text.textContent = "";
  splitText.forEach((letter) => {
    text.innerHTML += `<span>${letter}</span>`;
  });

  // Get individual chars
  let char = 0;
  const chars = text.querySelectorAll("span");

  // Make animation happens
  const timer = setInterval(function () {
    const span = chars[char++];

    if (span.textContent !== " ") {
      span.style.display = "inline-block";
      span.style.animation = "text-wave .5s";
    }
    if (char === strText.length) {
      clearInterval(timer);
    }
  }, 30);
};

futureTitle.addEventListener("mouseenter", function () {
  animateText(futureTitle);
});
