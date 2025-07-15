// Testimonials Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const testimonialsTrack = document.getElementById("testimonialsTrack");
  const carouselDots = document.getElementById("carouselDots");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");

  // Check if carousel elements exist on the page before running the code
  if (!testimonialsTrack || !carouselDots || testimonialSlides.length === 0) {
    return;
  }

  let currentSlide = 0; // Index of the first visible slide
  let slidesToShow = 3;
  const totalSlides = testimonialSlides.length;
  let numPages = 0;

  // Determine slides to show and number of pages based on screen size
  function setupCarousel() {
    if (window.innerWidth <= 768) {
      slidesToShow = 1;
    } else if (window.innerWidth <= 992) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }
    // Ensure we don't try to show more slides than available
    slidesToShow = Math.min(slidesToShow, totalSlides);

    // Calculate the number of pages (or dots) needed
    if (totalSlides > slidesToShow) {
      numPages = totalSlides - slidesToShow + 1;
    } else {
      numPages = 1;
    }
  }

  // Create dots for carousel navigation
  function createDots() {
    carouselDots.innerHTML = "";
    // Only show dots if there is more than one page
    if (numPages <= 1) return;

    for (let i = 0; i < numPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      carouselDots.appendChild(dot);
    }
  }

  // Go to a specific slide index when a dot is clicked
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
  }

  // Update carousel position and active dot
  function updateCarousel() {
    // Check if the document direction is RTL
    const isRTL = document.documentElement.dir === "rtl";

    // Calculate the percentage to move the track
    const singleSlideWidthPercentage = 100 / slidesToShow;
    const translationValue = currentSlide * singleSlideWidthPercentage;

    // Apply the correct transform based on the direction
    if (isRTL) {
      testimonialsTrack.style.transform = `translateX(${translationValue}%)`;
    } else {
      testimonialsTrack.style.transform = `translateX(-${translationValue}%)`;
    }

    // Update active dot
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentSlide) {
        dot.classList.add("active");
      }
    });
  }

  // Auto-advance carousel one slide at a time
  function autoAdvance() {
    const maxSlideIndex = totalSlides - slidesToShow;
    if (totalSlides > slidesToShow) {
      currentSlide = currentSlide >= maxSlideIndex ? 0 : currentSlide + 1;
      updateCarousel();
    }
  }

  // Initialize carousel
  function initialize() {
    setupCarousel();
    createDots();
    // Ensure currentSlide is valid after resize
    currentSlide = Math.min(currentSlide, totalSlides - slidesToShow);
    updateCarousel();
  }

  initialize();

  // Auto-advance every 10 seconds
  setInterval(autoAdvance, 10000);

  // Handle window resize
  window.addEventListener("resize", initialize);
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

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const navbarCollapse = document.getElementById("navbarNav");
  if (navbarCollapse) {
    const navLinks = navbarCollapse.querySelectorAll(".nav-link");
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }
});
