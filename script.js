const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const toast = document.querySelector("#toast");

// Restore the visitor's last theme choice, if one exists.
const savedTheme = localStorage.getItem("forma-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("forma-theme", nextTheme);
  updateThemeButton();
});

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

// Reveal product cards as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((card, index) => {
  card.style.transitionDelay = `${index * 130}ms`;
  revealObserver.observe(card);
});

// Small feedback interaction for each product button.
let toastTimeout;
document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    toast.textContent = `${button.dataset.product} — product details coming soon.`;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2400);
  });
});
