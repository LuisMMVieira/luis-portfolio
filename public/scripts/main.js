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
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) { link.classList.remove("is-active"); });
            var activeLink = document.querySelector(
              '.nav-link[href="#' + entry.target.id + '"]'
            );
            if (activeLink) {
              activeLink.classList.add("is-active");
            }
          }
        });
      },
      { rootMargin: "0px 0px -95% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });

    var introLink = document.querySelector('.nav-link[href="#intro"]');
    if (introLink) {
      introLink.classList.add("is-active");
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

  // Scroll reveal — auto-apply to post figures and canvases with backgrounds
  var postPage = document.querySelector(".post-page");
  if (postPage) {
    // All content objects reveal on scroll — one rule for all
    postPage.querySelectorAll(
      ".post-figure, .post-section__cols, .post-text, .post-meta, .post-header__wrapper, .post-canvas-carousel, .post-managers-carousel, .post-scroll-right-wide, .divider"
    ).forEach(function (el) {
      el.classList.add("reveal");
    });

    // Canvas backgrounds fade in (no translate, just opacity)
    postPage.querySelectorAll(".post-canvas[style*='background']").forEach(function (el) {
      el.classList.add("reveal");
      el.style.transform = "none";
    });
  }

  // Delay observer by one frame so browser paints the initial hidden state
  requestAnimationFrame(function () {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

      reveals.forEach(function (el) { revealObserver.observe(el); });
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
