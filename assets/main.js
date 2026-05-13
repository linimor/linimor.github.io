const sections = document.querySelectorAll(".section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");
const revealItems = document.querySelectorAll(".reveal");

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
