
const hamburgerContainer = document.querySelector("#main-nav");
const hamburger = document.querySelector(".main-nav__hamburger");
const links = document.querySelectorAll(".main-nav__links--item");

hamburger.addEventListener("click", () => {
  hamburgerContainer.classList.toggle("clicked");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
});
