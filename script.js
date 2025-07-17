// Testimonials Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const testimonialsTrack = document.getElementById("testimonialsTrack");
  const prevButton = document.getElementById("carouselPrev");
  const nextButton = document.getElementById("carouselNext");

  // Check if carousel elements exist
  if (!testimonialsTrack || !prevButton || !nextButton) {
    return;
  }

  const testimonialSlides =
    testimonialsTrack.querySelectorAll(".testimonial-slide");
  const totalSlides = testimonialSlides.length;
  let currentSlide = 0;
  let slidesToShow = 3;
  let autoScrollInterval;
  let touchStartX = 0;
  let touchEndX = 0;

  function setupCarousel() {
    // Determine slides to show based on screen size
    if (window.innerWidth <= 767.98) {
      slidesToShow = 1;
    } else if (window.innerWidth <= 991.98) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }
    slidesToShow = Math.min(slidesToShow, totalSlides);
  }

  function updateCarousel() {
    const isRTL = document.documentElement.dir === "rtl";
    const singleSlideWidth = 100 / slidesToShow;
    const translationValue = currentSlide * singleSlideWidth;

    if (isRTL) {
      testimonialsTrack.style.transform = `translateX(${translationValue}%)`;
    } else {
      testimonialsTrack.style.transform = `translateX(-${translationValue}%)`;
    }
  }

  function moveToNextSlide() {
    const maxSlideIndex =
      totalSlides > slidesToShow ? totalSlides - slidesToShow : 0;
    currentSlide = currentSlide >= maxSlideIndex ? 0 : currentSlide + 1;
    updateCarousel();
  }

  function moveToPrevSlide() {
    const maxSlideIndex =
      totalSlides > slidesToShow ? totalSlides - slidesToShow : 0;
    currentSlide = currentSlide <= 0 ? maxSlideIndex : currentSlide - 1;
    updateCarousel();
  }

  function startAutoScroll() {
    stopAutoScroll(); // Clear any existing interval
    autoScrollInterval = setInterval(moveToNextSlide, 15000); // Set to 15 seconds
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Touch event handlers for mobile swipe
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoScroll();
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
    startAutoScroll();
  }

  function handleSwipeGesture() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const isRTL = document.documentElement.dir === "rtl";

    if (isRTL) {
      if (touchEndX - touchStartX > swipeThreshold) moveToNextSlide();
      if (touchStartX - touchEndX > swipeThreshold) moveToPrevSlide();
    } else {
      if (touchStartX - touchEndX > swipeThreshold) moveToNextSlide();
      if (touchEndX - touchStartX > swipeThreshold) moveToPrevSlide();
    }
  }

  function initialize() {
    setupCarousel();
    const maxSlideIndex =
      totalSlides > slidesToShow ? totalSlides - slidesToShow : 0;
    currentSlide = Math.min(currentSlide, maxSlideIndex);
    updateCarousel();
    startAutoScroll();
  }

  // Event Listeners
  nextButton.addEventListener("click", () => {
    moveToNextSlide();
    startAutoScroll(); // Reset interval on manual navigation
  });

  prevButton.addEventListener("click", () => {
    moveToPrevSlide();
    startAutoScroll(); // Reset interval on manual navigation
  });

  // Add touch listeners
  testimonialsTrack.addEventListener("touchstart", handleTouchStart, false);
  testimonialsTrack.addEventListener("touchend", handleTouchEnd, false);

  // Re-initialize on window resize
  window.addEventListener("resize", initialize);

  // Initial setup
  initialize();
});

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Update active navigation link based on scroll position
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Contact form handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Form submission logic would go here
      console.log("Form submitted!");
      this.reset();
    });
  }
});

// Add animation to service cards on scroll
function animateOnScroll() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const cardBottom = card.getBoundingClientRect().bottom;

    if (cardTop < window.innerHeight && cardBottom > 0) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});

// Auto-close off-canvas menu on link click
document.addEventListener("DOMContentLoaded", function () {
  const offcanvasNavbar = document.getElementById("offcanvasNavbar");

  if (!offcanvasNavbar) {
    return;
  }

  const navLinks = offcanvasNavbar.querySelectorAll(".nav-link");
  const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasNavbar);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    });
  });
});
