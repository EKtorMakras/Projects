import '../scss/style.scss';


const mainNav = document.querySelector('.main-nav');

const hambBtnOpen = document.querySelector('.mobile-nav__icon--open');
const hambBtnClose = document.querySelector('.mobile-nav__icon--close');

const currentYear = document.querySelector('.current-year');

hambBtnOpen.addEventListener('click', () => {
  mainNav.classList.add('nav-open');
})
hambBtnClose.addEventListener('click', () => {
  mainNav.classList.remove('nav-open');
})

currentYear.textContent = new Date().getFullYear();


const navLinks = document.querySelectorAll('.main-nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('nav-open');
  })
})


// Sticky Nav
const sectionHero = document.querySelector('.hero');
const header = document.querySelector('.header');

const observer = new IntersectionObserver((entries, observer) => {
  const entry = entries[0];
  
  if (!entry.isIntersecting) {
    header.classList.add('sticky');
  }
  else {
    header.classList.remove('sticky');
  }
}, {
  root: null,
  threshold: 0,
})

observer.observe(sectionHero);

