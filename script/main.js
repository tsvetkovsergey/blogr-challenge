const nav = document.querySelector(".nav");
const subListsArr = Array.from(nav.querySelectorAll(".nav__sublist"));

// Tracks opened submenu index
let openedSublist = -1;

// Utility functions
const showSubList = function (sublist) {
  sublist.style.visibility = "visible";
  sublist.style.animation =
    "circle-fill-in 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
};

const hideSublist = function (sublist) {
  sublist.style.animation =
    "circle-fill-out 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards";
};

// Handlers
nav.addEventListener("click", function (e) {
  const link = e.target.closest(".nav__link");
  if (!link) return;
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

// Hide submenu when clicked outside
document.addEventListener("click", function (e) {
  // If there is no opened submenu
  // or you clicked on nav__item child (nav__link or
  // nav__sublist) do nothing
  if (openedSublist === -1 || e.target.closest(".nav__item")) return;

  // Hide submenu and reset openedSublist
  hideSublist(subListsArr[openedSublist]);
  openedSublist = -1;
});
