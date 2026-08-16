const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const form = document.querySelector("#contact-form");
const year = document.querySelector("#year");

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

function showError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  error.textContent = message;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const status = document.querySelector("#form-status");
  let valid = true;

  if (name.value.trim().length < 2) {
    showError(name, "Please enter at least 2 characters.");
    valid = false;
  } else showError(name, "");

  if (!email.validity.valid) {
    showError(email, "Please enter a valid email address.");
    valid = false;
  } else showError(email, "");

  if (message.value.trim().length < 10) {
    showError(message, "Please enter at least 10 characters.");
    valid = false;
  } else showError(message, "");

  if (!valid) {
    status.textContent = "Please correct the highlighted fields.";
    return;
  }

  status.textContent = "Thanks! Your message is ready to be sent. Connect the form to a backend or form service for real delivery.";
  form.reset();
});

year.textContent = new Date().getFullYear();

