/**
 * World of Bears - Main JavaScript
 * Handles interactivity across all pages
 */

// Bear Facts Data
const bearFacts = [
  {
    icon: "🧊",
    title: "Arctic Survivors",
    text: "Polar bears can swim for days at a time, covering hundreds of miles in search of food."
  },
  {
    icon: "💪",
    title: "Incredible Strength",
    text: "A grizzly bear can lift over 500 pounds with one paw - that's more than most humans can bench press."
  },
  {
    icon: "🏃",
    title: "Surprising Speed",
    text: "Despite their bulky appearance, bears can run up to 35 mph - faster than the fastest human sprinter."
  },
  {
    icon: "😴",
    title: "Winter Sleepers",
    text: "During hibernation, a bear's heart rate can drop from 40 beats per minute to just 8."
  },
  {
    icon: "🍽️",
    title: "Bamboo Lovers",
    text: "Giant pandas eat up to 40 pounds of bamboo every day - about 12-14 hours of eating."
  },
  {
    icon: "🧠",
    title: "High Intelligence",
    text: "Bears have the largest brain relative to body size of any carnivore, making them highly intelligent."
  }
];

// Load Facts on Home Page
function loadFacts() {
  const factsContainer = document.getElementById('facts-container');
  if (!factsContainer) return;

  factsContainer.innerHTML = bearFacts.map(fact => `
    <div class="col-md-4">
      <div class="text-center p-3">
        <div class="fact-icon">${fact.icon}</div>
        <h4>${fact.title}</h4>
        <p class="mb-0">${fact.text}</p>
      </div>
    </div>
  `).join('');
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Gallery Modal Function
function showImage(element) {
  const img = element.querySelector('img');
  const title = element.querySelector('h4');
  const para = element.querySelector('p');

  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');

  if (modalImage && modalTitle) {
    modalImage.src = img.src;
    modalTitle.textContent = title ? title.textContent : 'Bear Image';
  }
}

// Add Animation on Scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.card, .gallery-item, .fact-box, .stat-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');

        if (!isNaN(number)) {
          animateCounter(target, number, suffix);
          observer.unobserve(target);
        }
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, suffix) {
  let current = 0;
  const increment = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = current + suffix;
  }, 30);
}

// Active Navigation Link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Mobile Menu Close on Click
function initMobileMenu() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  loadFacts();
  handleNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  animateCounters();
  setActiveNavLink();
  initMobileMenu();

  // Add loaded class for initial animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// Make showImage function globally available
window.showImage = showImage;
