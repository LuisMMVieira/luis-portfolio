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
    try { config = JSON.parse(carousel.getAttribute("data-slides")) || []; } catch (e) {}
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

// Init all page-specific features — runs on first load and after View Transitions
function initPage() {
  // Scroll Spy
  var sections = document.querySelectorAll(".section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    var introLink = document.querySelector('.nav-link[href="/"]');

    function updateScrollSpy() {
      var scrollY = window.scrollY + window.innerHeight * 0.15;
      var active = null;

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) {
          active = section.id;
        }
      });

      navLinks.forEach(function (link) { link.classList.remove("is-active"); });

      if (!active || active === "intro") {
        if (introLink) introLink.classList.add("is-active");
      } else {
        var activeLink = document.querySelector('.nav-link[href="#' + active + '"]');
        if (activeLink) activeLink.classList.add("is-active");
      }
    }

    window.addEventListener("scroll", updateScrollSpy, { passive: true });
    updateScrollSpy();

    // Smooth scroll to top when on homepage
    if (introLink) {
      introLink.addEventListener("click", function (e) {
        if (window.location.pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
  }

  // Carousels & videos
  initCarousels();
  initLoopVideos();

  // Scroll hint
  var scrollHint = document.querySelector(".intro-scroll-hint");
  if (scrollHint) {
    window.addEventListener("scroll", function () {
      if (window.scrollY < 10) {
        scrollHint.classList.remove("is-hidden");
      } else {
        scrollHint.classList.add("is-hidden");
      }
    }, { passive: true });
  }

  // Scroll reveal — homepage elements
  var homeSections = document.querySelectorAll(".section[id]");
  if (homeSections.length && !document.querySelector(".post-page")) {
    // Above the fold entrance animation
    var introContent = document.querySelector(".section#intro h1");
    var introParagraph = document.querySelector(".intro-sub-content");
    var siteHeader = document.querySelector(".site-header");
    var scrollHint = document.querySelector(".intro-scroll-hint");

    // Step 1: Hide everything immediately
    [introContent, introParagraph].forEach(function (el) {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(200px)";
    });
    [siteHeader, scrollHint].forEach(function (el) {
      if (!el) return;
      el.style.opacity = "0";
    });

    var ease = "cubic-bezier(0.0, 0.0, 0.05, 1)";

    // Step 2: Reveal intro content (slide up)
    setTimeout(function () {
      [introContent, introParagraph].forEach(function (el) {
        if (!el) return;
        el.style.transition = "opacity 0.6s " + ease + ", transform 0.6s " + ease;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, 50);

    // Step 3: After reveal is done, fade in nav + scroll hint
    setTimeout(function () {
      [siteHeader, scrollHint].forEach(function (el) {
        if (!el) return;
        el.style.transition = "opacity 0.2s " + ease;
        el.style.opacity = "1";
      });
    }, 700);


    // Work: each project entry
    document.querySelectorAll(".project-entry").forEach(function (el) {
      el.classList.add("reveal");
    });

    // Beliefs: each belief line
    document.querySelectorAll(".section#beliefs .flow > *").forEach(function (el) {
      el.classList.add("reveal");
    });

    // Background: each chapter individually
    document.querySelectorAll(".bg-chapter").forEach(function (el) {
      el.classList.add("reveal");
    });

    // About: photo, paragraphs, contact
    document.querySelectorAll(
      ".about-photo, .about-paragraphs, .about-contact"
    ).forEach(function (el) {
      el.classList.add("reveal");
    });
  }

  // Scroll reveal — auto-apply to post figures and canvases with backgrounds
  var postPage = document.querySelector(".post-page");
  if (postPage) {
    // All content objects reveal on scroll — one rule for all
    postPage.querySelectorAll(
      ".post-figure, .post-section__cols, .post-text, .post-meta, .post-canvas-carousel, .post-managers-carousel, .post-scroll-right-wide"
    ).forEach(function (el) {
      el.classList.add("reveal");
    });

    // Header wrapper gets reveal but will be force-triggered on load (see below)
    postPage.querySelectorAll(".post-header__wrapper").forEach(function (el) {
      el.classList.add("reveal");
    });

    // Canvas backgrounds: reveal with their first child
    postPage.querySelectorAll(".post-canvas[style*='background']").forEach(function (el) {
      el.classList.add("reveal");
      el.dataset.canvasParent = "true";
    });
  }

  // Delay observer by one frame so browser paints the initial hidden state
  requestAnimationFrame(function () {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      var staggerQueue = [];
      var staggerDelay = 120; // ms between each reveal

      function flushQueue() {
        staggerQueue.forEach(function (el, i) {
          el.style.transitionDelay = (i * staggerDelay) + "ms";
          el.classList.add("is-visible");
          // Clean up delay after transition completes
          el.addEventListener("transitionend", function handler() {
            el.style.transitionDelay = "";
            el.removeEventListener("transitionend", handler);
          });
          // Trigger parent canvas reveal with the first child
          var parentCanvas = el.closest("[data-canvas-parent]:not(.is-visible)");
          if (parentCanvas) {
            parentCanvas.classList.add("is-visible");
          }
        });
        staggerQueue = [];
      }

      var flushTimer = null;
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            staggerQueue.push(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
        // Batch reveals that fire in the same frame
        clearTimeout(flushTimer);
        flushTimer = setTimeout(flushQueue, 16);
      }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });

      reveals.forEach(function (el) {
        // Canvas parents are triggered by their children, not the observer
        if (!el.dataset.canvasParent) {
          revealObserver.observe(el);
        }
      });

      // Force-trigger elements already in viewport on page load
      setTimeout(function () {
        var viewportBottom = window.scrollY + window.innerHeight * 0.95;
        reveals.forEach(function (el) {
          if (el.dataset.canvasParent) return;
          if (el.classList.contains("is-visible")) return;
          var elTop = el.getBoundingClientRect().top + window.scrollY;
          if (elTop < viewportBottom) {
            staggerQueue.push(el);
            revealObserver.unobserve(el);
          }
        });
        if (staggerQueue.length) flushQueue();
      }, 50);
    }
  });

  // Email copy
  var emailLink = document.querySelector(".about-contact__copy-email");
  var tooltip = document.querySelector(".about-contact__tooltip");
  if (emailLink && tooltip) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      var email = emailLink.getAttribute("data-email") || "";
      if (!email) return;

      navigator.clipboard.writeText(email).then(function () {
        tooltip.classList.add("is-visible");
        setTimeout(function () {
          tooltip.classList.remove("is-visible");
        }, 2000);
      });
    });
  }
}

// Run on initial load
initPage();

// Enable smooth scroll after page has loaded and restored position
// This prevents the animated scroll on refresh/back navigation
requestAnimationFrame(function () {
  document.documentElement.classList.add("smooth-scroll");
});
