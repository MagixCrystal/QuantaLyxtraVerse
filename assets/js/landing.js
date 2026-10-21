(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add("is-visible"));

  const hero = document.querySelector(".landing-hero");
  const visual = document.querySelector(".landing-visual");
  if (hero && visual && matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual.style.setProperty("--pointer-x", `${(x * 10).toFixed(1)}px`);
      visual.style.setProperty("--pointer-y", `${(y * 8).toFixed(1)}px`);
    });
    hero.addEventListener("pointerleave", () => { visual.style.setProperty("--pointer-x", "0px"); visual.style.setProperty("--pointer-y", "0px"); });
  }
})();
