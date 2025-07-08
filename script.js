// Testimonials Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const testimonialsTrack = document.getElementById("testimonialsTrack");
  const carouselDots = document.getElementById("carouselDots");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");

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
    slidesToShow = Math.min(slidesToShow, totalSlides);
    numPages = Math.ceil(totalSlides / slidesToShow);
  }

  // Create dots for carousel navigation (page-based)
  function createDots() {
    carouselDots.innerHTML = "";
    for (let i = 0; i < numPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToPage(i));
      carouselDots.appendChild(dot);
    }
  }

  // Update carousel position and active dot
  function updateCarousel() {
    // Calculate translation based on the width of a single slide
    const slideWidth = 100 / slidesToShow;
    const translateX = -currentSlide * slideWidth;
    testimonialsTrack.style.transform = `translateX(${translateX}%)`;

    // Update active dot based on which page is most visible
    const dots = document.querySelectorAll(".carousel-dot");
    const currentPage = Math.round(currentSlide / slidesToShow);
    dots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Go to a specific page when a dot is clicked
  function goToPage(pageIndex) {
    const targetSlide = pageIndex * slidesToShow;
    // Ensure we don't go past the last possible slide
    currentSlide = Math.min(targetSlide, totalSlides - slidesToShow);
    updateCarousel();
  }

  // Auto-advance carousel one slide at a time
  function autoAdvance() {
    const maxSlide = totalSlides - slidesToShow;
    // If we are at the last possible slide, loop back to the beginning
    currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
    updateCarousel();
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

      const name = this.querySelector('input[placeholder="Your Name"]').value;
      const email = this.querySelector('input[placeholder="Your Email"]').value;
      const message = this.querySelector(
        'textarea[placeholder="Your Message"]'
      ).value;

      if (!name || !email || !message) {
        // You can replace this with a more elegant notification
        console.error("Please fill in all required fields.");
        return;
      }

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
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      });
    });
  }
});
