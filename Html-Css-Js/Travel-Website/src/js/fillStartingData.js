import { AppName, mainNavLinks, featureCards, testimonialCards} from './data.js'
import { dom } from './DOM.js';
import { getDomElement } from "./utils";


export function initStartingData() {
  fillBasicData();
  fillMainNavData();
  fillFeaturesData();
  fillTestimonialsData();
}


function fillBasicData() {
  document.title = AppName;
}


function fillMainNavData() {
  dom.navList.innerHTML = mainNavLinks.map(link => {
    return `
    <li>
      <a href="${link.href}" class="header__nav-link" id="${link.id}">
        ${link.text}
      </a>
    </li>
    `
  }).join('')
}


function fillFeaturesData() {
  dom.featureCardsContainer.innerHTML = featureCards.map(card => {
    return `
      <div class="features__card">
          <img src="/images/icons/${card.img}">
          <div class="features__card-info">
            <h3>${card.title}</h3>
            <p>${card.desc}</p>
          </div>
      </div>
    `
  }).join('')

  dom.featureCards = getDomElement('.features__card', true);
}


function fillTestimonialsData() {
  dom.testimonialCardsContainer.innerHTML = testimonialCards.map(card => {
    return `
      <div class="testimonial">
        <img src="/images/${card.img}" class="lazyload">
        <h3>${card.title.name} <span>${card.title.desc} </span></h3>
        <p>${card.desc}</p>
      </div>
    `
  }).join('')

  dom.testimonialCards = getDomElement('.testimonial', true);
}


