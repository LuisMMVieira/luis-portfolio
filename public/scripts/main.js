// Handle Intro link click - scroll to top
(function () {
  const introLink = document.querySelector('.nav-link[href="#intro"]');
  if (introLink) {
    introLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Update URL without triggering scroll
      history.pushState(null, "", "#intro");
    });
  }
})();

// Scroll Spy: Activate nav item when section reaches top of viewport
(function () {
  const sections = document.querySelectorAll(".section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  function updateActiveLink(targetId) {
    navLinks.forEach((link) => link.classList.remove("is-active"));
    if (targetId) {
      const activeLink = document.querySelector(
        `.nav-link[href="#${targetId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("is-active");
      }
    }
  }

  function checkActiveSection() {
    // If at the top (within 150px), activate intro
    if (window.scrollY < 150) {
      updateActiveLink("intro");
      return;
    }

    // Check sections with IDs
    let activeId = null;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Section is active if its top is between -100px and 200px from viewport top
      if (rect.top <= 200 && rect.top >= -100) {
        activeId = section.id;
      }
    });

    if (activeId) {
      updateActiveLink(activeId);
    }
  }

  const observer = new IntersectionObserver(
    () => {
      checkActiveSection();
    },
    {
      // Trigger when section top reaches top ~5% of viewport
      rootMargin: "0px 0px -95% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Initial check
  checkActiveSection();

  // Check on scroll
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Set intro as active on initial page load if at top or no hash
  const hash = window.location.hash;
  if (!hash || hash === "#intro") {
    if (window.scrollY < 150) {
      updateActiveLink("intro");
    }
  }
})();
