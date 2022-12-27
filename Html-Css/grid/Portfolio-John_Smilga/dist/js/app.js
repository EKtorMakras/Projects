const navbar = document.querySelector("#nav");
const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const date = document.querySelector("#date");
// add fixed class to navbar
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add("nav-fixed");
  } else {
    navbar.classList.remove("nav-fixed");
  }
});
// show sidebar
navBtn.addEventListener("click", function () {
  sidebar.classList.add("sidebar-shown");
});
closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("sidebar-shown");
});
// set year
date.innerHTML = new Date().getFullYear();
