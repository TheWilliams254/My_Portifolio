// Init AOS
AOS.init({
  duration: 800,
  easing: "ease",
  once: true
});

// DOM elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const downloadBtn = document.getElementById("download-resume");

// Hamburger toggle
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close nav when link clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
  });
});

// Scroll effects
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  // Back to top button
  if (backToTop) {
    backToTop.classList.toggle("show", window.scrollY > 300);
  }

  // Navbar shadow
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }

  // Active nav link
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Contact form submission
contactForm?.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name")?.value || "";
  const email = document.getElementById("email")?.value || "";
  const message = document.getElementById("message")?.value || "";

  const messageData = {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  const existingMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  existingMessages.push(messageData);
  localStorage.setItem("contactMessages", JSON.stringify(existingMessages));

  if (successMessage) {
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  }

  contactForm.reset();
});

// Resume button
downloadBtn?.addEventListener("click", () => {
  window.open("resume.pdf", "_blank");
});
