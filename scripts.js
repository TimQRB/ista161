document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".reveal-on-load");
  if (hero) {
    window.setTimeout(() => {
      hero.classList.add("is-visible");
    }, 150);
  }

  const revealElements = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  } else {
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
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${0.05 * index}s`;
      observer.observe(el);
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return null;
      return document.getElementById(href.slice(1));
    })
    .filter((el) => el);

  function setActiveLink(hash) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.classList.add("nav-link-active");
      } else {
        link.classList.remove("nav-link-active");
      }
    });
  }

  const activeObserver = new IntersectionObserver(
    (entries) => {
      let bestEntry = null;

      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
          bestEntry = entry;
        }
      });

      if (bestEntry) {
        const id = bestEntry.target.id;
        if (id) {
          setActiveLink(`#${id}`);
        }
      }
    },
    {
      threshold: [0.3, 0.6],
      rootMargin: "-56px 0px 0px 0px",
    }
  );

  sections.forEach((section) => {
    activeObserver.observe(section);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href) {
        setActiveLink(href);
      }
      if (nav && navToggle && window.innerWidth <= 900) {
        nav.classList.remove("nav-open");
      }
    });
  });

  const weekImages = document.querySelectorAll(".week-image");
  weekImages.forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  const diagrams = document.querySelectorAll(".hover-diagram");
  diagrams.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.classList.add("is-hovered");
    });
    img.addEventListener("mouseleave", () => {
      img.classList.remove("is-hovered");
    });
  });

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
    });
  }
});

