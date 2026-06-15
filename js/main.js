// Lightweight animation + navigation script.
// This replaces React/Babel/Framer CDN for lower latency and faster load.

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

function initMobileMenu() {
  const button = document.querySelector("[data-menu-button]");
  const links = document.querySelector("[data-nav-links]");

  if (!button || !links) return;

  button.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function initActiveNav() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const linkById = new Map(
    navLinks.map((link) => [link.getAttribute("href").replace("#", ""), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkById.get(entry.target.id);
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach((item) => item.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      threshold: 0.42,
      rootMargin: "-20% 0px -55% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initParallaxLite() {
  if (prefersReducedMotion) return;

  const visual = document.querySelector(".soc-console");
  if (!visual) return;

  let latestX = 0;
  let latestY = 0;
  let ticking = false;

  function update() {
    const rotateY = latestX * 3;
    const rotateX = latestY * -3;
    visual.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    ticking = false;
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      if (window.innerWidth < 980) return;

      latestX = event.clientX / window.innerWidth - 0.5;
      latestY = event.clientY / window.innerHeight - 0.5;

      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initMobileMenu();
  initActiveNav();
  initParallaxLite();
});
