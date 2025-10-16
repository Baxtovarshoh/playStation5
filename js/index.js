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
let lastTouchY = 0;
let lastScrollTime = 0;
let ili = avatarSlide.length - 1 === currentIndexAvatar;
const SCROLL_DELAY = 800;
const SWIPE_THRESHOLD = 100;

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
    updateDots();

    if (currentIndex === 2) {
      clearInterval(slideInterval);
    }
  }, 5000);
}
function ChangeSlide(delta) {
  const now = Date.now();
  if (now - lastScrollTime < SCROLL_DELAY) return;
  lastScrollTime = now;

  currentIndex = (currentIndex + delta + slide.length) % slide.length;
  updateSlider();
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
sliderContainer.addEventListener("touchstart", (event) => {
  lastTouchY = event.touches[0].clientY;
  console.log(event.touches[0].clientY);
});

sliderContainer.addEventListener("touchmove", (event) => {
  let touchY = event.touches[0].clientY;
  let deltaY = lastTouchY - touchY;

  if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
    ChangeSlide(deltaY > 0 ? 1 : -1);
    lastTouchY = touchY;
  }
});
sliderContainer.addEventListener("wheel", (event) => {
  if (
    Math.abs(event.deltaY) > Math.abs(event.deltaX) &&
    Math.abs(event.deltaY) > 50
  ) {
    ChangeSlide(event.deltaY > 0 ? 1 : -1);
  }
});

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
function closeAll() {
  document.querySelector(".container").classList.add("hidden");
}
let isMuted = video.muted;
function mute() {
  const vol = document.querySelector(".volume");
  if (isMuted) {
    video.muted = false;
    isMuted = true;
    vol.innerHTML = `<i class="bi bi-volume-up-fill"></i>`;
    console.log("muted");
  } else {
    video.muted = true;
    isMuted = false;
    vol.innerHTML = `<i class="bi bi-volume-mute-fill"></i>`;
    console.log("unmuted");
  }
}
