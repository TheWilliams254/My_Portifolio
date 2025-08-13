import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css"; // for your Tailwind + custom styles

export default function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease",
      once: true
    });

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar");
    const backToTop = document.querySelector(".back-to-top");
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const downloadBtn = document.getElementById("download-resume");

    // Hamburger menu toggle
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }

    // Close menu when clicking a nav link
    if (navLinks.length > 0) {
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          if (hamburger && navMenu) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
          }
        });
      });
    }

    // Scroll effects
    const handleScroll = () => {
      let current = "";
      const sections = document.querySelectorAll("section");

      // Back to top button
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add("show");
        } else {
          backToTop.classList.remove("show");
        }
      }

      // Navbar shadow
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }

      // Active nav link
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      if (navLinks.length > 0) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active");
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Contact form submission
    if (contactForm) {
      contactForm.addEventListener("submit", e => {
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
    }

    // Resume button click
    if (downloadBtn) {
  downloadBtn.addEventListener("click", function () {
    // Replace with the actual path to your resume file
    window.open("resume.pdf", "_blank");
  });
}

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Example JSX structure */}
      <nav className="navbar fixed top-0 w-full bg-white shadow-md">
        <button className="hamburger p-4">☰</button>
        <ul className="nav-menu hidden md:flex">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>

      <section id="home" data-aos="fade-up" className="h-screen bg-light-bg">Home</section>
      <section id="about" data-aos="fade-up" className="h-screen bg-white">About</section>
      <section id="projects" data-aos="fade-up" className="h-screen bg-light-bg">Projects</section>
      <section id="contact" data-aos="fade-up" className="h-screen bg-white">
        <form id="contactForm">
          <input id="name" type="text" placeholder="Name" />
          <input id="email" type="email" placeholder="Email" />
          <textarea id="message" placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
        <div id="successMessage" style={{ display: "none" }}>Message sent!</div>
      </section>

      <button id="download-resume">Download Resume</button>
      <button className="back-to-top hidden">↑</button>
    </>
  );
}
