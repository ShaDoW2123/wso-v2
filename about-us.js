/**
 * ==========================================================================
 * HERO STATS COUNTER (60fps Engine)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".hero-stats-card");
  const statNumbers = document.querySelectorAll(".hero-stat-number");

  // Safety check: Don't run if the section doesn't exist on this page
  if (!statsSection || statNumbers.length === 0) return;

  let hasAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2000; // Animation lasts exactly 2 seconds
    const startTime = performance.now();

    // If target is 0, just set it immediately
    if (target === 0) {
      el.textContent = "0" + suffix;
      return;
    }

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // EaseOutExpo formula: Starts fast, slows down smoothly near the end
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentVal = Math.floor(easeProgress * target);
      el.textContent = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        el.textContent = target + suffix; // Guarantee exact target at the end
      }
    };

    requestAnimationFrame(updateNumber);
  };

  // The Observer: Watches the screen to see when the card scrolls into view
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach((numberEl) => animateCounter(numberEl));
      }
    },
    { threshold: 0.3 } // Triggers when 30% of the card is visible
  );

  observer.observe(statsSection);
});



/**
 * ==========================================================================
 * COUNTRY DOSSIER SWITCHER
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".track-tab-btn");
  const panels = document.querySelectorAll(".track-panel");

  if (tabButtons.length === 0 || panels.length === 0) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. Remove active states from all buttons and panels
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // 2. Activate the clicked button
      btn.classList.add("active");

      // 3. Reveal the mapped panel ID
      const targetId = btn.getAttribute("data-target");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
});



/**
 * ==========================================================================
 * HEAD-TO-HEAD MATCHUP ENGINE
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const battleButtons = document.querySelectorAll(".matchup-btn");
  const arenas = document.querySelectorAll(".matchup-arena");

  if (battleButtons.length === 0 || arenas.length === 0) return;

  battleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. Clear active states
      battleButtons.forEach((b) => b.classList.remove("active"));
      arenas.forEach((a) => a.classList.remove("active"));

      // 2. Highlight clicked toggle
      btn.classList.add("active");

      // 3. Reveal target arena
      const targetBattle = btn.getAttribute("data-battle");
      const targetArena = document.getElementById(targetBattle);
      if (targetArena) {
        targetArena.classList.add("active");
      }
    });
  });
});



/**
 * ==========================================================================
 * MASTER FAQ LIVE SEARCH ENGINE
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("faqLiveSearch");
  const faqItems = document.querySelectorAll(".faq-item");

  if (!searchInput || faqItems.length === 0) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    faqItems.forEach((item) => {
      const questionText = item.textContent.toLowerCase();
      
      if (questionText.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});