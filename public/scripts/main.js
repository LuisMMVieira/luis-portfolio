// Scroll Spy: Activate nav item when section reaches top of viewport
(function () {
  const sections = document.querySelectorAll(".section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active from all links
          navLinks.forEach((link) => link.classList.remove("is-active"));

          // Add active to matching link
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("is-active");
          }
        }
      });
    },
    {
      // Trigger when section top reaches top 5% of viewport
      rootMargin: "0px 0px -95% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Set intro as active on initial page load
  const introLink = document.querySelector('.nav-link[href="#intro"]');
  if (introLink) {
    introLink.classList.add("is-active");
  }
})();

// Image Carousel: fade-loop through stacked images
var _carouselTimers = [];
function initCarousels(root) {
  _carouselTimers.forEach(function (id) { clearTimeout(id); });
  _carouselTimers = [];

  (root || document).querySelectorAll("[data-image-carousel]").forEach(function (carousel) {
    var slides = carousel.querySelectorAll("[data-carousel-slide]");
    if (slides.length < 2) return;

    // Per-slide config: [delay, fade]. Parsed from data-slides JSON or defaults.
    var defaultMs = parseInt(carousel.getAttribute("data-interval") || "2500", 10);
    var config = [];
    try { config = JSON.parse(carousel.getAttribute("data-slides")); } catch (e) {}
    var current = 0;

    // All slides at opacity 1 (stacked), slide 0 on top.
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.opacity = "1";
      slides[i].style.zIndex = slides.length - i;
      slides[i].style.transition = "opacity 0.5s ease";
    }

    function getDelay(i) { return config[i] ? config[i][0] : defaultMs; }
    function getFade(i) { return config[i] ? config[i][1] : true; }

    function step() {
      var delay = getDelay(current);
      var fade = getFade(current);
      var id = setTimeout(function () {
        if (fade) {
          slides[current].style.opacity = "0";
        } else {
          slides[current].style.transition = "none";
          slides[current].style.opacity = "0";
          void carousel.offsetHeight;
          slides[current].style.transition = "opacity 0.5s ease";
        }
        current = (current + 1) % slides.length;
        // On loop reset: snap all back instantly
        if (current === 0) {
          for (var i = 0; i < slides.length; i++) {
            slides[i].style.transition = "none";
            slides[i].style.opacity = "1";
            slides[i].style.zIndex = slides.length - i;
          }
          void carousel.offsetHeight;
          for (var i = 0; i < slides.length; i++) {
            slides[i].style.transition = "opacity 0.5s ease";
          }
        }
        step();
      }, delay);
      _carouselTimers.push(id);
    }
    step();
  });
}

// Loop Video: replay after a 3-second pause
function initLoopVideos(root) {
  (root || document).querySelectorAll("[data-loop-video]").forEach(function (video) {
    if (video._loopBound) return;
    video._loopBound = true;
    video.addEventListener("ended", function () {
      setTimeout(function () {
        video.currentTime = 0;
        video.play().catch(function () {});
      }, 3000);
    });
  });
}

// Project Modal: Load project content dynamically
(function () {
  const modal = document.getElementById("project-modal");
  const modalContent = modal?.querySelector(".project-modal-content");
  const closeBtn = modal?.querySelector(".project-modal-close");
  const backdrop = modal?.querySelector(".project-modal-backdrop");

  if (!modal || !modalContent) return;

  // Cache for loaded content
  const contentCache = new Map();

  // List of section IDs to exclude from project modal
  const sectionIds = ["intro", "work", "beliefs", "values", "background", "about"];

  function openModal(slug) {
    document.documentElement.classList.add("modal-open");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    loadContent(slug);
  }

  function closeModal() {
    document.documentElement.classList.remove("modal-open");
    modal.classList.add("is-closing");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    // Wait for animation to complete before hiding visibility
    const container = modal.querySelector(".project-modal-container");
    const handleTransitionEnd = (e) => {
      // Only handle transform transition, ignore other transitions
      if (e.target === container && e.propertyName === "transform") {
        container.removeEventListener("transitionend", handleTransitionEnd);
        modal.classList.remove("is-closing");
        // Update URL to remove hash after animation
        history.pushState(null, "", window.location.pathname);
      }
    };

    container.addEventListener("transitionend", handleTransitionEnd);
  }

  async function loadContent(slug) {
    // Check cache first
    if (contentCache.has(slug)) {
      modalContent.innerHTML = contentCache.get(slug);
      initCarousels(modalContent);
      initLoopVideos(modalContent);
      return;
    }

    // Show loading state
    modalContent.innerHTML = "";
    modalContent.classList.add("is-loading");

    try {
      const response = await fetch(`/partials/projects/${slug}/`);
      if (!response.ok) throw new Error("Failed to load project");

      const html = await response.text();

      // Extract body content from the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const content = doc.body.innerHTML;

      // Cache and display
      contentCache.set(slug, content);
      modalContent.classList.remove("is-loading");
      modalContent.innerHTML = content;
      initCarousels(modalContent);
      initLoopVideos(modalContent);
    } catch (error) {
      console.error("Error loading project:", error);
      modalContent.classList.remove("is-loading");
      modalContent.innerHTML = `<p>Error loading project. Please try again.</p>`;
    }
  }

  // Handle project link clicks
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-project]");
    if (link) {
      e.preventDefault();
      const slug = link.dataset.project;
      history.pushState(null, "", `#${slug}`);
      openModal(slug);
    }
  });

  // Close button
  closeBtn?.addEventListener("click", closeModal);

  // Backdrop click
  backdrop?.addEventListener("click", closeModal);

  // ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Handle hash on page load and hash change
  function checkHash() {
    const hash = window.location.hash.slice(1);
    if (hash && !sectionIds.includes(hash)) {
      openModal(hash);
    }
  }

  // Check hash on load
  checkHash();

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.slice(1);
    if (hash && !sectionIds.includes(hash)) {
      openModal(hash);
    } else {
      closeModal();
    }
  });
})();

// Scroll hint: hide when user starts scrolling
(function () {
  const scrollHint = document.querySelector(".intro-scroll-hint");
  if (!scrollHint) return;

  let hidden = false;
  window.addEventListener("scroll", function () {
    if (!hidden && window.scrollY > 10) {
      scrollHint.classList.add("is-hidden");
      hidden = true;
    }
  }, { passive: true });
})();

// About: copy email to clipboard and show tooltip (no mailto)
(function () {
  const link = document.querySelector(".about-contact__copy-email");
  const tooltip = document.querySelector(".about-contact__tooltip");
  if (!link || !tooltip) return;

  link.addEventListener("click", function (e) {
    e.preventDefault();
    const email = link.getAttribute("data-email") || "";
    if (!email) return;

    navigator.clipboard.writeText(email).then(
      function () {
        tooltip.classList.add("is-visible");
        setTimeout(function () {
          tooltip.classList.remove("is-visible");
        }, 2000);
      }
    );
  });
})();
