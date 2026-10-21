(() => {
  const QV = window.QV;
  const categoryGrid = document.getElementById("category-grid");
  if (!categoryGrid) return;
  if (!QV.currentUser()) { window.location.replace("auth.html"); return; }
  document.body.classList.add("is-authorized");

  const searchInput = document.getElementById("catalog-search");
  const clearSearch = document.getElementById("clear-search");
  const countApps = document.getElementById("app-count");
  const countCategories = document.getElementById("category-count");
  const summary = document.getElementById("catalog-summary");
  const empty = document.getElementById("category-empty");
  let categoriesEntered = false;

  function render() {
    const apps = QV.getApps();
    const categories = QV.categories(apps);
    const query = searchInput.value.trim().toLocaleLowerCase("id");
    const visible = categories.filter((category) => {
      const relatedApps = apps.filter((app) => app.category === category.name);
      const content = `${category.name} ${category.description} ${relatedApps.map((app) => `${app.name} ${app.description} ${QV.host(app.officialUrl)}`).join(" ")}`.toLocaleLowerCase("id");
      return !query || content.includes(query);
    });
    const entering = !categoriesEntered;
    categoryGrid.innerHTML = visible.map((category, index) => {
      const count = apps.filter((app) => app.category === category.name).length;
      const destination = `category.html?category=${encodeURIComponent(category.name)}`;
      return `<a class="category-card${entering ? " category-enter" : ""}" href="${QV.escapeHTML(destination)}" style="--accent:${QV.escapeHTML(category.accent)};--i:${index}"><span class="category-count">${count} app</span><h3>${QV.escapeHTML(category.name)}</h3><p>${QV.escapeHTML(category.description || "Aplikasi dan layanan pilihan")}</p><span class="category-open">Buka kategori <span>→</span></span></a>`;
    }).join("");
    categoriesEntered = true;
    empty.hidden = visible.length > 0;
    countApps.textContent = apps.length;
    countCategories.textContent = categories.length;
    summary.textContent = query ? `${visible.length} kategori cocok` : `${apps.length} aplikasi · ${categories.length} kategori`;
    clearSearch.hidden = !searchInput.value;
  }

  searchInput.addEventListener("input", render);
  clearSearch.addEventListener("click", () => { searchInput.value = ""; searchInput.focus(); render(); });
  window.addEventListener("storage", (event) => { if (event.key === QV.KEYS.apps) render(); });
  render();
})();
