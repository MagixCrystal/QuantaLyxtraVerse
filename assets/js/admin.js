(() => {
  const QV = window.QV;
  const denied = document.getElementById("admin-denied");
  const adminApp = document.getElementById("admin-app");
  const dialog = document.getElementById("app-dialog");
  if (!denied || !adminApp) return;

  if (!QV.isAdmin()) {
    denied.hidden = false;
    const user = QV.currentUser();
    if (user) denied.querySelector("p").textContent = `Akun ${user.email} berperan sebagai pengguna. Hanya akun admin yang dapat mengelola katalog.`;
    document.getElementById("signout-button").hidden = !user;
    return;
  }
  adminApp.hidden = false;
  const table = document.getElementById("admin-app-table");
  const search = document.getElementById("admin-search");
  const empty = document.getElementById("admin-empty");
  const form = document.getElementById("app-form");
  const error = document.getElementById("dialog-error");
  const nameInput = form.elements.name;

  const ownerForm = document.getElementById("owner-form");
  const ownerNameInput = ownerForm?.elements.ownerName;
  const ownerFeedback = document.getElementById("owner-feedback");
  if (ownerForm && ownerNameInput && ownerFeedback) {
    ownerNameInput.value = QV.getOwnerName();
    ownerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nextName = ownerNameInput.value.trim();
      if (!QV.saveOwnerName(nextName)) {
        ownerFeedback.textContent = "Nama pemilik tidak dapat disimpan. Pastikan nama terisi dan Anda masuk sebagai admin.";
        ownerFeedback.classList.add("is-error");
      } else {
        QV.renderOwnerName();
        ownerNameInput.value = QV.getOwnerName();
        ownerFeedback.textContent = "Nama pemilik berhasil diperbarui.";
        ownerFeedback.classList.remove("is-error");
      }
      ownerFeedback.hidden = false;
    });
    window.addEventListener("storage", (event) => {
      if (event.key === QV.KEYS.owner) {
        ownerNameInput.value = QV.getOwnerName();
        ownerFeedback.hidden = true;
      }
    });
  }
  function logoMarkup(app) {
    const logo = QV.safeURL(app.logoUrl);
    const initials = QV.escapeHTML(QV.initials(app.name));
    return logo ? `<span class="admin-mini-logo" data-fallback="${initials}"><img src="${QV.escapeHTML(logo)}" alt="" referrerpolicy="no-referrer"></span>` : `<span class="admin-mini-logo">${initials}</span>`;
  }
  function render() {
    const apps = QV.getApps();
    const query = search.value.trim().toLocaleLowerCase("id");
    const visible = apps.filter((app) => `${app.name} ${app.category} ${app.description}`.toLocaleLowerCase("id").includes(query));
    document.getElementById("admin-app-count").textContent = apps.length;
    document.getElementById("admin-category-count").textContent = QV.categories(apps).length;
    empty.hidden = visible.length > 0;
    table.innerHTML = visible.map((app) => {
      const official = QV.safeURL(app.officialUrl);
      const platform = ["WEB", "WEBSITE"].includes(app.platform) ? app.platform : "DESKTOP";
      const appURL = QV.safeURL(app.appUrl);
      const appLink = appURL ? `<a class="admin-url" href="${QV.escapeHTML(appURL)}" target="_blank" rel="noopener noreferrer">${QV.escapeHTML(appURL)}</a>` : `<span class="admin-url is-missing">Tautan app belum diatur</span>`;
      const appDomain = official ? QV.host(official) : "Tautan resmi belum diatur";
      return `<tr><td><div class="admin-app-cell">${logoMarkup(app)}<div><div class="admin-app-name">${QV.escapeHTML(app.name)}</div><div class="admin-app-domain">${QV.escapeHTML(appDomain)}</div></div></div></td><td class="table-category">${QV.escapeHTML(app.category)}</td><td><span class="table-platform ${platform.toLowerCase()}">${platform}</span></td><td>${appLink}</td><td><div class="table-actions"><button class="table-action" type="button" data-edit="${QV.escapeHTML(app.id)}">Edit</button><button class="table-action delete" type="button" data-delete="${QV.escapeHTML(app.id)}">Hapus</button></div></td></tr>`;
    }).join("");
    const categoryField = form.elements.category;
    const selectedCategory = categoryField.value;
    categoryField.innerHTML = '<option value="">Pilih kategori</option>' + QV.CATEGORY_META.map((category) => `<option value="${QV.escapeHTML(category.name)}">${QV.escapeHTML(category.name)}</option>`).join("");
    if (QV.CATEGORY_META.some((category) => category.name === selectedCategory)) categoryField.value = selectedCategory;
    table.querySelectorAll("[data-edit]").forEach((button) => button.addEventListener("click", () => openEdit(button.dataset.edit)));
    table.querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", () => removeApp(button.dataset.delete)));
    table.querySelectorAll(".admin-mini-logo img").forEach((img) => img.addEventListener("error", () => { img.parentElement.textContent = img.parentElement.dataset.fallback || "?"; }, { once: true }));
  }
  function resetForm() { form.reset(); form.elements.id.value = ""; form.elements.accent.value = "#10d7eb"; error.hidden = true; }
  function openAdd() { resetForm(); document.getElementById("dialog-title").textContent = "Tambah aplikasi"; form.querySelector("button[type=submit]").textContent = "Simpan aplikasi"; dialog.showModal(); nameInput.focus(); }
  function openEdit(id) {
    const app = QV.getApps().find((item) => item.id === id);
    if (!app) return;
    resetForm();
    form.elements.id.value = app.id;
    form.elements.name.value = app.name;
    form.elements.category.value = QV.CATEGORY_META.some((category) => category.name === app.category) ? app.category : "IT";
    form.elements.description.value = app.description;
    form.elements.platform.value = app.platform;
    form.elements.accent.value = /^#[0-9a-f]{6}$/i.test(app.accent) ? app.accent : "#10d7eb";
    form.elements.appUrl.value = app.appUrl || "";
    form.elements.officialUrl.value = app.officialUrl || "";
    form.elements.logoUrl.value = app.logoUrl || "";
    document.getElementById("dialog-title").textContent = "Edit aplikasi";
    form.querySelector("button[type=submit]").textContent = "Simpan perubahan";
    dialog.showModal();
    nameInput.focus();
  }
  function removeApp(id) {
    const apps = QV.getApps();
    const app = apps.find((item) => item.id === id);
    if (!app || !confirm(`Hapus “${app.name}” dari katalog?`)) return;
    QV.saveApps(apps.filter((item) => item.id !== id));
    render();
  }
  function faviconFor(url) { try { return `${new URL(url).origin}/favicon.ico`; } catch { return ""; } }
  document.getElementById("add-app-button").addEventListener("click", openAdd);
  document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
  document.getElementById("cancel-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  search.addEventListener("input", render);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.hidden = true;
    const values = Object.fromEntries(new FormData(form).entries());
    const appUrl = QV.safeURL(values.appUrl);
    const officialUrl = QV.safeURL(values.officialUrl);
    const logoUrl = values.logoUrl.trim() ? QV.safeURL(values.logoUrl) : faviconFor(officialUrl);
    if (!values.name.trim() || !QV.CATEGORY_META.some((category) => category.name === values.category) || !values.description.trim()) { error.textContent = "Lengkapi nama, pilih kategori yang tersedia, dan isi deskripsi aplikasi."; error.hidden = false; return; }
    if ((values.appUrl.trim() && !appUrl) || (values.officialUrl.trim() && !officialUrl)) { error.textContent = "Tautan yang diisi harus menggunakan alamat HTTP atau HTTPS yang valid."; error.hidden = false; return; }
    if (values.logoUrl.trim() && !logoUrl) { error.textContent = "URL logo harus memakai HTTP atau HTTPS."; error.hidden = false; return; }
    const apps = QV.getApps();
    const existingIndex = apps.findIndex((app) => app.id === values.id);
    const record = { id: values.id || QV.createId(values.name), name: values.name.trim(), category: values.category.trim(), description: values.description.trim(), platform: values.platform, appUrl: appUrl || "", officialUrl: officialUrl || "", logoUrl: logoUrl || "", accent: values.accent };
    if (existingIndex >= 0) apps[existingIndex] = { ...apps[existingIndex], ...record };
    else apps.unshift(record);
    if (!QV.saveApps(apps)) { error.textContent = "Browser tidak dapat menyimpan data. Periksa ruang penyimpanan."; error.hidden = false; return; }
    dialog.close();
    render();
  });
  window.addEventListener("storage", (event) => { if (event.key === QV.KEYS.apps) render(); });
  render();
})();
