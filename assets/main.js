const sections = document.querySelectorAll(".section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");
const revealItems = document.querySelectorAll(".reveal");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const storageKey = "theme";

const getSavedTheme = () => {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
};

const saveTheme = theme => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    /* Theme still changes for this session if storage is unavailable. */
  }
};

const getAutoTheme = () => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? "dark" : "light";
};

const setTheme = theme => {
  root.dataset.theme = theme;

  if (!themeToggle) {
    return;
  }

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
};

setTheme(getSavedTheme() || getAutoTheme());

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  saveTheme(nextTheme);
  setTheme(nextTheme);
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach(item => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -58% 0px", threshold: 0 }
);

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll(".accordion details").forEach(details => {
  details.addEventListener("toggle", () => {
    if (details.open) {
      details.animate(
        [
          { transform: "translateY(-2px)", opacity: 0.78 },
          { transform: "translateY(0)", opacity: 1 }
        ],
        { duration: 180, easing: "ease-out" }
      );
    }
  });
});
