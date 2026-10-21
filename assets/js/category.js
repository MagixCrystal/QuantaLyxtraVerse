(() => {
  const QV = window.QV;
  const grid = document.getElementById("category-app-grid");
  if (!grid) return;
  if (!QV.currentUser()) { window.location.replace("auth.html"); return; }
  document.body.classList.add("is-authorized");

  const requestedName = new URLSearchParams(window.location.search).get("category");
  const apps = QV.getApps();
  const category = QV.categories(apps).find((item) => item.name === requestedName);
  if (!category) { window.location.replace("catalog.html"); return; }

  const categoryApps = apps.filter((app) => app.category === category.name).sort((a, b) => a.name.localeCompare(b.name, "id"));
  document.title = `${category.name} · Quantalyxtra Verse`;
  document.getElementById("category-title").textContent = category.name;
  document.getElementById("category-description").textContent = category.description || "Aplikasi dan layanan pilihan.";
  document.getElementById("category-count").textContent = `${categoryApps.length} aplikasi`;
  const empty = document.getElementById("category-empty");

  function logoMarkup(app) {
    const url = QV.safeURL(app.logoUrl);
    const initials = QV.escapeHTML(QV.initials(app.name));
    return url
      ? `<img class="app-logo" src="${QV.escapeHTML(url)}" alt="" loading="lazy" referrerpolicy="no-referrer"><span class="app-logo-fallback" hidden>${initials}</span>`
      : `<span class="app-logo-fallback">${initials}</span>`;
  }
  function cardMarkup(app, index) {
    const appUrl = QV.safeURL(app.appUrl);
    const officialUrl = QV.safeURL(app.officialUrl);
    const platform = ["WEB", "WEBSITE"].includes(app.platform) ? app.platform : "DESKTOP";
    const accent = /^#[0-9a-f]{6}$/i.test(app.accent) ? app.accent : "#10d7eb";
    const name = QV.escapeHTML(app.name);
    const description = QV.escapeHTML(app.description);
    const main = appUrl
      ? `<a class="card-main" href="${QV.escapeHTML(appUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Buka ${name} di tab baru"><span class="app-logo-wrap">${logoMarkup(app)}</span><span class="app-copy"><h4>${name}</h4><span class="app-description">${description}</span></span></a>`
      : `<div class="card-main card-main-unavailable"><span class="app-logo-wrap">${logoMarkup(app)}</span><span class="app-copy"><h4>${name}</h4><span class="app-description">${description}</span><span class="app-link-note">Tautan aplikasi belum diatur</span></span></div>`;
    const official = officialUrl
      ? `<a class="official-link" href="${QV.escapeHTML(officialUrl)}" target="_blank" rel="noopener noreferrer">Website resmi ↗</a>`
      : `<span class="official-link is-disabled">Tautan belum diatur</span>`;
    const domain = officialUrl ? QV.host(officialUrl) : "Tautan belum diatur";
    return `<article class="app-card card-enter" style="--app-accent:${accent};--i:${index}" data-app-card><span class="platform-badge ${platform.toLowerCase()}">${platform}</span>${main}<div class="card-footer"><span class="domain-label">${QV.escapeHTML(domain)}</span>${official}</div></article>`;
  }

  grid.innerHTML = categoryApps.map(cardMarkup).join("");
  empty.hidden = categoryApps.length > 0;
  grid.querySelectorAll(".app-logo").forEach((img) => {
    const fallback = img.parentElement.querySelector(".app-logo-fallback");
    img.addEventListener("error", () => { img.hidden = true; if (fallback) fallback.hidden = false; }, { once: true });
    img.addEventListener("load", () => { if (fallback) fallback.hidden = true; }, { once: true });
    if (img.complete && img.naturalWidth === 0) { img.hidden = true; if (fallback) fallback.hidden = false; }
  });
  grid.addEventListener("pointermove", (event) => {
    const card = event.target.closest(".app-card");
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  });
})();
