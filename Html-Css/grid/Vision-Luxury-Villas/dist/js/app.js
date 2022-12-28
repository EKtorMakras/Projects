//* ------------------------------ Variables & Constants ------------------------------ *//

const list = document.querySelector(".gallery-carousel__list");
const item = document.querySelector(".gallery-carousel__item");
const imgs = Array.from(list.children);
const nextBtn = document.querySelector(".gallery-carousel__btn--right");
const prevBtn = document.querySelector(".gallery-carousel__btn--left");
const carouselNav = document.querySelector(".gallery-carousel__nav");
const dots = Array.from(carouselNav.children);

const galleryText = document.querySelector('.gallery-text');




//* ------------------------------ Functions ------------------------------ *//


// Getting the width of Images
const imgWidth = imgs[0].getBoundingClientRect().width;

// const gallWidth = galleryText.getBoundingClientRect().width;



// Arranging Images
const setImgPosition = (img, index) => {
    img.style.left = imgWidth * index + "px";
};

imgs.forEach(setImgPosition);



// Moving Images On Click
const moveToImg = (list, currentImg, targetImg) => {
    list.style.transform = "translateX(-" + targetImg.style.left + ")";
    currentImg.classList.remove('current--img');
    targetImg.classList.add('current--img');
}


// Update color of dots on click
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current--img');
    targetDot.classList.add('current--img');
}



// Hide/Show Arrows 
const hideShowArrows = (imgs, prevBtn, nextBtn, targetIndex) => {
    if (targetIndex === 0) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden')
    } else if (targetIndex === imgs.length - 1) {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden')
    }
}


//$ ---------------- Buttons ---------------- $//


//% ------ Right Button ------ //
nextBtn.addEventListener("click", (e) => {
    const currentImg = list.querySelector(".current--img");
    const nextImg = currentImg.nextElementSibling;
    const currentDot = carouselNav.querySelector(".current--img");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = imgs.findIndex((img) => img === nextImg);


    moveToImg(list, currentImg, nextImg);
    updateDots(currentDot, nextDot);
    hideShowArrows(imgs, prevBtn, nextBtn, nextIndex);
});



//% ------ Left Button ------ //
prevBtn.addEventListener("click", (e) => {
    const currentImg = list.querySelector(".current--img");
    const prevImg = currentImg.previousElementSibling;
    const currentDot = carouselNav.querySelector(".current--img");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = imgs.findIndex((img) => img === prevImg)


    moveToImg(list, currentImg, prevImg);
    updateDots(currentDot, prevDot);
    hideShowArrows(imgs, prevBtn, nextBtn, prevIndex);
});




//$ ---------------- Carousel Nav ---------------- $//


carouselNav.addEventListener('click', (e) => {

    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentImg = list.querySelector('.current--img');
    const currentDot = carouselNav.querySelector('.current--img');
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetImg = imgs[targetIndex];

    moveToImg(list, currentImg, targetImg);

    currentDot.classList.remove('current--img');
    targetDot.classList.add('current--img');

    hideShowArrows(imgs, prevBtn, nextBtn, targetIndex);
});







// ----------------------------------- Comments ----------------------------------- //

//* ------------------------------ Header ------------------------------ *//
//* ------------------------------ End Of Header ------------------------------ *//

//$ ---------------- Showcase/Hero Section ---------------- $//
//$ ---------------- End Of Showcase/Hero Section ---------------- $//

//& ---------- Hero ---------- //
//& ---------- End Of Hero ---------- //

//% ------ Hero ------ //
//% ------ End Of Hero ------ //

//# ---- Hero ---- //
//# ---- End Of Hero ---- //

//^ -- Hero -- //
//^ -- End Of Hero -- //