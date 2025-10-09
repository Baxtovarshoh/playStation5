const link = document.querySelectorAll(".link");
const sliderContainer = document.querySelector(".slider1");
const slide = document.querySelectorAll(".slide1");
const SAvatarContainer = document.querySelector(".avatar-slider");
const avatarSlide = document.querySelectorAll(".slide-avo");
const dotContainer = document.querySelector(".dots");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const video = document.querySelector("video");
const menu = document.querySelector(".menu");
const sliders = document.querySelector(".sliders");
const card = document.querySelectorAll(".card");
const back = document.querySelector(".back");

let avatarHeight = avatarSlide[0].clientWidth;
let slideHeight = slide[0].clientHeight;
let currentIndexAvatar = 0;
let currentIndex = 0;
let autoPlayInterval;
let preveuosIndex = 0;
let state = false;
let ili = avatarSlide.length - 1 === currentIndexAvatar;

let slideInterval;

function updateSlider() {
  sliderContainer.style.transform = `translateY(${
    -currentIndex * slideHeight
  }px)`;
  link.forEach((item, index) =>
    item.classList.toggle("active", index === currentIndex)
  );
  if (currentIndex === 1) {
    // startAutoPlay();
    video.pause();
  } else {
    stopAutoPlay();
    video.play();
  }
}

video.addEventListener("ended", () => autoEnded());

console.log(avatarSlide.length);
function playScroll() {
  slideInterval = setInterval(() => {
    nextSlide();
    avatarChange();
    console.log(currentIndexAvatar);
    updateDots();
    if (avatarSlide.length - 1 === currentIndexAvatar) {
      console.log("done");
      clearInterval(slideInterval);
      setTimeout(() => {
        currentIndex += 1;
        updateSlider();
      }, 5000);
    }
  }, 3000);
}

function autoEnded() {
  currentIndex += 1;
  updateSlider();
  if (!state)
    setTimeout(() => {
      goToSlidesIndex(0);
      playScroll();
    }, 5000);
}
link.forEach((item) =>
  item.addEventListener("click", () => {
    currentIndex = parseInt(item.getAttribute("data-index"));
    updateSlider();
  })
);

card.forEach((el, i) => {
  el.addEventListener("click", () => console.log(i));
  if (i === 4) {
    el.addEventListener("click", () => goToSlidesIndex(5));
  } else if (i === 5) {
    el.addEventListener("click", () => goToSlidesIndex(4));
  } else {
    el.addEventListener("click", () => goToSlidesIndex(i));
  }
});

back.addEventListener("click", () => {
  menu.classList.remove("hidden");
  sliders.classList.add("hidden");
});

function goToSlidesIndex(i) {
  currentIndexAvatar = i;
  menu.classList.add("hidden");
  sliders.classList.remove("hidden");
  avatarHeight = avatarSlide[0].clientWidth;
  SAvatarContainer.style.transform = `translateX(${-i * avatarHeight - 10}px)`;
  updateDots();
  return (currentIndexAvatar = i);
}

function avatarChange() {
  SAvatarContainer.style.transform = `translateX(${
    -currentIndexAvatar * avatarHeight - 10
  }px)`;
}
function nextSlide() {
  if (currentIndexAvatar >= avatarSlide.length - 1) return;

  currentIndexAvatar++;
  avatarChange();

  if (currentIndexAvatar === avatarSlide.length) {
    // startAutoPlay();
    currentIndexAvatar = 0;
    SAvatarContainer.style.transform = `translateX(${
      -currentIndexAvatar * avatarHeight
    }px)`;
  }
  updateDots();
}
next.addEventListener("click", () => {
  state = true;
  nextSlide();
});

function prevSlide() {
  if (currentIndexAvatar <= 0) return;
  currentIndexAvatar--;
  stopAutoPlay();
  avatarChange();
  updateDots();
}
prev.addEventListener("click", () => {
  prevSlide();
  state = true;
});

function createDots() {
  const realSlide = avatarSlide.length;
  for (let i = 0; i < realSlide; i++) {
    const dot = document.createElement("div");
    dot.addEventListener("click", () => goToSlide(i));
    dot.classList.add("dot");
    dotContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  currentIndexAvatar = index;
  avatarChange();
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndexAvatar);
  });
}
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 3000);
}
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}
createDots();
updateDots();
