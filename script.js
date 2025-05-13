// Menu mobile
const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenButton.click());
});

// GESTION DES IMAGES

// 1. Images des villas
const villaImages = {
  "villa-b": [
    "images/Villa-B/Gestimob-Babel-33.jpg",
    "images/Villa-B/Gestimob-Babel-34.jpg",
    "images/Villa-B/Gestimob-Babel-35.jpg",
    "images/Villa-B/Gestimob-Babel-36.jpg",
    "images/Villa-B/Gestimob-Babel-37.jpg",
    "images/Villa-B/Gestimob-Babel-38.jpg",
    "images/Villa-B/Gestimob-Babel-39.jpg",
    "images/Villa-B/Gestimob-Babel-40.jpg",
    "images/Villa-B/Gestimob-Babel-41.jpg",
    "images/Villa-B/Gestimob-Babel-42.jpg",
    "images/Villa-B/Gestimob-Babel-43.jpg",
    "images/Villa-B/Gestimob-Babel-44.jpg",
    "images/Villa-B/Gestimob-Babel-45.jpg",
    "images/Villa-B/Gestimob-Babel-46.jpg",
    "images/Villa-B/Gestimob-Babel-47.jpg",
    "images/Villa-B/Gestimob-Babel-48.jpg",
    "images/Villa-B/Gestimob-Babel-49.jpg",
    "images/Villa-B/Gestimob-Babel-50.jpg"
  ],
  "villa-c": [
    "images/Villa-C/Gestimob-Babel-51.jpg",
    "images/Villa-C/Gestimob-Babel-52.jpg",
    "images/Villa-C/Gestimob-Babel-53.jpg",
    "images/Villa-C/Gestimob-Babel-54.jpg",
    "images/Villa-C/Gestimob-Babel-55.jpg",
    "images/Villa-C/Gestimob-Babel-56.jpg",
    "images/Villa-C/Gestimob-Babel-57.jpg",
    "images/Villa-C/Gestimob-Babel-58.jpg",
    "images/Villa-C/Gestimob-Babel-59.jpg",
    "images/Villa-C/Gestimob-Babel-60.jpg",
    "images/Villa-C/Gestimob-Babel-61.jpg",
    "images/Villa-C/Gestimob-Babel-62.jpg",
    "images/Villa-C/Gestimob-Babel-63.jpg",
    "images/Villa-C/Gestimob-Babel-64.jpg",
    "images/Villa-C/Gestimob-Babel-65.jpg",
    "images/Villa-C/Gestimob-Babel-66.jpg",
    "images/Villa-C/Gestimob-Babel-67.jpg",
    "images/Villa-C/Gestimob-Babel-68.jpg"
  ]
};

// 2. Images de la section Situation
const situationImages = [
  "images/Commun/Gestimob-Babel-07.jpg",
  "images/Commun/Gestimob-Babel-09.jpg",
  "images/Commun/Gestimob-Babel-11.jpg"
];

// Index de chaque galerie
const currentIndex = {
  "villa-b": 0,
  "villa-c": 0,
  "situation": 0
};

// Mise à jour de l'image de la galerie Villa
function updateImage(gallery) {
  const img = document.querySelector(`[data-gallery="${gallery}"] .gallery-image`);
  const images = villaImages[gallery];
  img.src = images[currentIndex[gallery]];
  img.setAttribute('data-index', currentIndex[gallery]);
}

// Navigation dans galeries Villa
function nextSlide(gallery) {
  const images = villaImages[gallery];
  currentIndex[gallery] = (currentIndex[gallery] + 1) % images.length;
  updateImage(gallery);
}

function prevSlide(gallery) {
  const images = villaImages[gallery];
  currentIndex[gallery] = (currentIndex[gallery] - 1 + images.length) % images.length;
  updateImage(gallery);
}

// LIGHTBOX (toutes galeries)
function openLightbox(gallery, index) {
  const lightbox = document.getElementById("lightbox");
  currentIndex[gallery] = index;
  lightbox.setAttribute("data-gallery", gallery);
  lightbox.style.display = "flex";
  updateLightboxImage(gallery);
}

function updateLightboxImage(gallery) {
  const lightboxImg = document.querySelector("#lightbox img");
  let imgSrc = "";
  if (gallery === "situation") {
    imgSrc = situationImages[currentIndex[gallery]];
  } else {
    imgSrc = villaImages[gallery][currentIndex[gallery]];
  }
  lightboxImg.src = imgSrc;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function nextLightbox() {
  const gallery = document.getElementById("lightbox").getAttribute("data-gallery");
  const images = gallery === "situation" ? situationImages : villaImages[gallery];
  currentIndex[gallery] = (currentIndex[gallery] + 1) % images.length;
  updateLightboxImage(gallery);
}

function prevLightbox() {
  const gallery = document.getElementById("lightbox").getAttribute("data-gallery");
  const images = gallery === "situation" ? situationImages : villaImages[gallery];
  currentIndex[gallery] = (currentIndex[gallery] - 1 + images.length) % images.length;
  updateLightboxImage(gallery);
}

// Lightbox sur les images de la section "Situation"
document.querySelectorAll("#situation .about-image").forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    openLightbox("situation", index);
  });
});
