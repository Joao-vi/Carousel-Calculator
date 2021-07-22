// Selectors

let slidePos = 0;
const slides = document.querySelectorAll(".carousel-item");
const mapss = document.querySelectorAll(".map li");
console.log(mapss);
const totalSlides = slides.length;

// Events

document.querySelector("#next").addEventListener("click", function () {
  toNextSlide();
});

document.querySelector("#prev").addEventListener("click", function () {
  toPrevSlide();
});

// Functions

function toNextSlide() {
  if (slidePos === totalSlides - 1) {
    slidePos = 0;
  } else {
    slidePos++;
  }
  indexSlides();
}

function toPrevSlide() {
  if (slidePos == 0) {
    slidePos = totalSlides - 1;
  } else {
    slidePos--;
  }
  indexSlides();
}

function indexSlides() {
  for (let slide of slides) {
    slide.classList.remove("carousel-item-visible");
  }
  for (let mapp of mapss) {
    mapp.classList.remove("full");
  }
  slides[slidePos].classList.add("carousel-item-visible");
  mapss[slidePos].classList.add("full");
}
