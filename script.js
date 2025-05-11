const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
});

// ferme le menu quand le bouton close est cliqué
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// ferme le menu quand un lien est cliqué
navLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenButton.click());
});

// Initialize Gallery
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


  const currentIndex = {
    "villa-b": 0,
    "villa-c": 0
  };

  function updateImage(gallery) {
    const img = document.querySelector(`[data-gallery="${gallery}"] .gallery-image`);
    img.src = villaImages[gallery][currentIndex[gallery]];
    img.setAttribute('data-index', currentIndex[gallery]);
  }

  function nextSlide(gallery) {
    currentIndex[gallery] = (currentIndex[gallery] + 1) % villaImages[gallery].length;
    updateImage(gallery);
  }

  function prevSlide(gallery) {
    currentIndex[gallery] = (currentIndex[gallery] - 1 + villaImages[gallery].length) % villaImages[gallery].length;
    updateImage(gallery);
  }

  // Lightbox
  function openLightbox(gallery, index) {
    currentIndex[gallery] = index;
    const lightbox = document.getElementById('lightbox');
    lightbox.setAttribute('data-gallery', gallery);
    lightbox.style.display = 'flex';
    updateLightboxImage(gallery);
  }

  function updateLightboxImage(gallery) {
    const lightboxImg = document.querySelector('#lightbox img');
    lightboxImg.src = villaImages[gallery][currentIndex[gallery]];
  }

  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
  }

  function nextLightbox() {
    const gallery = document.getElementById('lightbox').getAttribute('data-gallery');
    nextSlide(gallery);
    updateLightboxImage(gallery);
  }

  function prevLightbox() {
    const gallery = document.getElementById('lightbox').getAttribute('data-gallery');
    prevSlide(gallery);
    updateLightboxImage(gallery);
  }
