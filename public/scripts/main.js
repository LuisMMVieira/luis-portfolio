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
      // Trigger when section top reaches top ~5% of viewport
      rootMargin: "0px 0px -95% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
})();
