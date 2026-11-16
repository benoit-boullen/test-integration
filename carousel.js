const slides = document.querySelectorAll('.product-preview__slide');
const dots = document.querySelectorAll('.product-preview__dot');
const nextBtn = document.querySelector('.product-preview__scroll');
let currentIndex = 0;

function goToSlide(index) {
  const nextIndex = (index + slides.length) % slides.length;
  if (nextIndex === currentIndex) return;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];

  // S'assure que la prochaine slide repart bien du bas (ou de la droite sur mobile)
  nextSlide.classList.remove('product-preview__slide--leave');
  void nextSlide.offsetWidth;

  // Fait partir l'image actuelle vers le haut de l'écran
  currentSlide.classList.remove('product-preview__slide--active');
  currentSlide.classList.add('product-preview__slide--leave');

  currentSlide.addEventListener(
    'transitionend',
    () => currentSlide.classList.remove('product-preview__slide--leave'),
    { once: true }
  );

  // Fait arriver la nouvelle image depuis le bas
  nextSlide.classList.add('product-preview__slide--active');
  currentIndex = nextIndex;

  dots.forEach((dot, i) => {
    const isActive = i === currentIndex;
    dot.classList.toggle('product-preview__dot--active', isActive);
    if (isActive) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
});

nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

// Menu burger mobile
const header = document.querySelector('.header');
const burgerBtn = document.querySelector('.header__burger');

if (header && burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = header.classList.toggle('header--open');
    burgerBtn.setAttribute('aria-expanded', isOpen);
    burgerBtn.textContent = isOpen ? '✕' : '☰';
  });
}

