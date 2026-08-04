/* =========================================================
   BAMO COMPANY PORTFOLIO
   script.js
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  /* Close menu after clicking a nav link */
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  /* Close menu if clicking outside */
  document.addEventListener("click", (event) => {
    const clickedInsideNav = siteNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}


/* =========================================================
   2. SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  /* Fallback for older browsers */
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


/* =========================================================
   3. IMAGE LIGHTBOX / SCREENSHOT ZOOM
   ========================================================= */

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const zoomableImages = document.querySelectorAll(
  ".app-shot img, .backend-shot img, .screen-card img"
);

function openLightbox(image) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || "BaMo screenshot";

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");

  if (lightboxClose) {
    lightboxClose.focus();
  }
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");

  setTimeout(() => {
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }, 300);
}

zoomableImages.forEach((image) => {
  image.setAttribute("tabindex", "0");
  image.setAttribute("role", "button");
  image.setAttribute(
    "aria-label",
    `Open larger view: ${image.alt || "BaMo screenshot"}`
  );

  image.addEventListener("click", () => {
    openLightbox(image);
  });

  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    lightbox &&
    lightbox.classList.contains("is-open")
  ) {
    closeLightbox();
  }
});


/* =========================================================
   4. SMOOTH ANCHOR SCROLLING
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      10;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});


/* =========================================================
   5. HEADER SHADOW ON SCROLL
   ========================================================= */

const siteHeader = document.querySelector(".site-header");

function updateHeaderState() {
  if (!siteHeader) return;

  if (window.scrollY > 20) {
    siteHeader.style.boxShadow =
      "0 8px 28px rgba(10, 35, 62, 0.08)";
  } else {
    siteHeader.style.boxShadow = "none";
  }
}

window.addEventListener("scroll", updateHeaderState, {
  passive: true
});

updateHeaderState();


/* =========================================================
   6. ACTIVE NAV SECTION
   ========================================================= */

const navLinks = Array.from(
  document.querySelectorAll('.site-nav a[href^="#"]')
);

const sections = navLinks
  .map((link) => {
    const selector = link.getAttribute("href");

    if (!selector || selector === "#") return null;

    return document.querySelector(selector);
  })
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio -
            a.intersectionRatio
        );

      if (!visibleEntries.length) return;

      const activeId =
        visibleEntries[0].target.id;

      navLinks.forEach((link) => {
        const linkTarget =
          link.getAttribute("href");

        if (linkTarget === `#${activeId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    },
    {
      threshold: [0.2, 0.35, 0.55],
      rootMargin: "-20% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    activeSectionObserver.observe(section);
  });
}


/* =========================================================
   7. SUBTLE HERO PARALLAX
   ========================================================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(min-width: 901px)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    const moveX =
      (x - 0.5) * 10;

    const moveY =
      (y - 0.5) * 8;

    heroVisual.style.transform =
      `translate3d(${moveX}px, ${moveY}px, 0)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroVisual.style.transform =
      "translate3d(0, 0, 0)";
  });
}


/* =========================================================
   8. SCREENSHOT LAZY LOADING
   ========================================================= */

document
  .querySelectorAll(
    ".app-shot img, .backend-shot img"
  )
  .forEach((image) => {
    image.loading = "lazy";
    image.decoding = "async";
  });


/* =========================================================
   9. PREVENT BROKEN IMAGE ICONS FROM LOOKING UGLY
   ========================================================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.closest(
      ".app-shot, .backend-shot, .screen-card"
    )?.classList.add("image-error");

    console.warn(
      "BaMo website image could not load:",
      image.src
    );
  });
});


/* =========================================================
   10. READY
   ========================================================= */

document.documentElement.classList.add("js-ready");
