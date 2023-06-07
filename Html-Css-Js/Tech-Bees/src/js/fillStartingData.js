import { 
  pageTitle, 
  mainNavLinks, 
  servicesBoxes, 
  recordsBoxes, 
  projects, 
  projectIcons, 
  categories,
  teamMembers,
  testimonials, 
  blogs,
  footer
}
  from './data.js'
import { dom } from './DOM.js';
import { returnObjectNameFromId } from './utils.js';

export function initStartingData() {
  fillBasicData();
  fillMainNavLinksData();
  fillSidebarNavLinksData();
  fillServicesBoxesData();
  fillRecordsBoxesData();
  fillProjectsData();
  fillTeamMembersData();
  fillTestimonialsData ();
  fillBlogsData();
  fillFooterData();
}


function fillBasicData() {
  document.title = pageTitle;
}


function fillMainNavLinksData() {
  dom.mainNavList.innerHTML = mainNavLinks.map(link => {
    if (link.url === '#contact-us') {
      return `
      <li class="main-nav__item">
        <a href="${link.url}" class="btn-cta"">
         ${link.label}
        </a>
      </li>
    `
    }
    else {
      return `
      <li class="main-nav__item">
        <a href="${link.url}" class="nav__link main-nav__link" data-id="${link.label.toLowerCase()}">${link.label}</a>
      </li>
    `
    }
    
  }).join('')
}


function fillSidebarNavLinksData() {
  dom.sidebarNavList.innerHTML = mainNavLinks.map(link => {
    if (link.url === '#contact-us') {
      return `
      <li class="sidebar-nav__item">
        <a href="${link.url}" class="btn-cta"">
         ${link.label}
        </a>
      </li>
    `
    }
    else {
      return `
      <li class="sidebar-nav__item">
        <a href="${link.url}" class="nav__link sidebar-nav__link" data-id="${link.label.toLowerCase()}">${link.label}</a>
      </li>
    `
    }
    
  }).join('')
}


function fillServicesBoxesData() {
  dom.servicesBoxesWrapper.innerHTML = servicesBoxes.map(box => {
    return `
      <div class="grid-box services__box services__box--${box.class}">
        <img src="images/${box.icon}" alt="${box.label} icon" class="grid-box__img">
        <h4 class="grid-box__title">${box.label}</h4>
      </div>
    `
  }).join('')
}


function fillRecordsBoxesData() {
  dom.recordsBoxesWrapper.innerHTML = recordsBoxes.map(box => {
    return `
      <div class="grid-box records__box records__box--${box.class}">
        <h3 class="grid-box__title">${box.number}+</h3>
        <p class="grid-box__desc">${box.desc}</p>
      </div>
    `
  }).join('')
}


function fillProjectsData() {
  dom.projectsGallery.innerHTML = projects.map(project => {
    return `
      <div class="project" data-category=${project.category}"">
        <img src="images/${project.img}.jpg" alt="${project.name}" class="project__img">
        <div class="project__content gradient-${project.category}--transparent">
          <p class="project__category gradient-${project.category}--reverse">
            ${returnObjectNameFromId(project.category, categories)}
          </p>
          <p class="project__name">
            ${project.name}
          </p>
          <div class="project__icons">
            ${renderProjectIcons(project)}
          </div>
        </div>
      </div>
    `
  }).join('');
}


function fillTeamMembersData() {
  dom.teamMembers.innerHTML = teamMembers.map((member,idx) => {
    return `
      <div class="team__card card" data-aos="flip-left" data-aos-delay="${300 * idx}">
        <img src="images/${member.img}.png" alt="${member.name}-${member.role}" class="team__card-img">
        <h4 class="team__card-title">
          ${member.name}
        </h4>
        <p class="team__card-role">
        ${member.role}
        </p>
        <div class="socials-wrapper">
          ${renderSocialIcons(member)}
        </div>
      </div>
    `
  }).join('')
}


function fillTestimonialsData() {
  dom.testimonialsWrapper.innerHTML = testimonials.map(testimonial => {
    return `
      <div class="testimonial" data-aos="fade" data-aos-delay="600">
        <span class="testimonial__icon">
          <i class="fas fa-quote-right"></i>
        </span>
        <div class="testimonial__profile">
          <img src="images/${testimonial.img}" class="testimonial__img"></img>
          <h3 class="testimonial__name">
            ${testimonial.name}
          </h3>
        </div>
        <p class="testimonial__desc">
          ${testimonial.text}
        </p>
      </div>
    `
  }).join('');
}


function fillBlogsData() {
  dom.blogsWrapper.innerHTML = blogs.map((blog,idx) => {
    return `
      <div class="blog card">
        <div class="blog__img">
          <img src="images/${blog.img}" alt="blog-${idx} image">
        </div>

        <div class="blog__content">

          <div class="blog__details">
            <div class="blog__read-time">
              ${blog.readTime} min read
            </div>
            <div class="blog__category gradient-${blog.category}">
              ${returnObjectNameFromId(blog.category,categories)}
            </div>
          </div>

          <div class="blog__text">
          <h4 class="blog__title">
            ${blog.title}
          </h4>
          <p class="blog__desc">
            ${blog.desc}
          </p>
          <a href="#" class="blog__link">Read more...</a>

          </div>
        </div>
      </div>
    `
  }).join('')
}


function fillFooterData() {
  dom.footerColumns.forEach(column => {
    const columnName = column.dataset.label;
    
    if (columnName) {
      const data = footer[columnName];
      column.innerHTML = `
        <h4 class="footer__column-title">${columnName}</h4>
        <div class="footer__column-items">
          ${fillFooterColumnData(data)}
        </div>
      `
    }
  });

  dom.footerSocials.innerHTML = renderSocialIcons(footer)
}


function fillFooterColumnData(data) {
  const list = data.map(item => {
    return `
      <p class="footer__column-text">${item}</p>
    `
  }).join('')

  return list;
}


// Render Icons
function renderProjectIcons(project) {
  const iconList = project.iconsUrls.map((iconUrl, idx) => {
    return `
      <a href="${iconUrl}" data-name="${projectIcons[idx].label}" class="project__icon gradient-${project.category}" target="_blank">
        <i class="${projectIcons[idx].name}"></i>
      </a>
    `
  })

  return iconList.join('');
}


function renderSocialIcons(item) {
  const list = item.socials.map(social => {
    return `
    <a href="${social.url}" class="social-icon social-icon--${social.label}" target="_blank">
      <i class="${social.name}"></i>
    </a>
    `
  })

  return list.join('');
}