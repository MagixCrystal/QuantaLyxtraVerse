(() => {
  const QV = window.QV;
  const actions = document.getElementById("account-actions");
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  const errorBox = document.getElementById("auth-error");
  const successBox = document.getElementById("auth-success");

  function showMessage(kind, message) {
    if (errorBox) { errorBox.hidden = kind !== "error"; errorBox.textContent = kind === "error" ? message : ""; }
    if (successBox) { successBox.hidden = kind !== "success"; successBox.textContent = kind === "success" ? message : ""; }
  }
  function signOut() { QV.clearSession(); location.href = "index.html"; }
  function renderAccount() {
    if (!actions) return;
    const user = QV.currentUser();
    if (!user) { actions.innerHTML = '<a class="text-link" href="auth.html">Masuk</a><a class="button button-small button-primary" href="auth.html?mode=signup">Daftar</a>'; return; }
    const destination = user.role === "admin" ? "admin.html" : "catalog.html";
    const label = user.role === "admin" ? "Panel admin" : "Buka katalog";
    actions.innerHTML = `<span class="account-chip"><span class="account-avatar">${QV.escapeHTML(QV.initials(user.name))}</span><span class="account-name">${QV.escapeHTML(user.name)}</span></span><a class="button button-small button-quiet" href="${destination}">${label}</a><button class="button button-small button-quiet" id="account-signout" type="button">Keluar</button>`;
    document.getElementById("account-signout")?.addEventListener("click", signOut);
  }
  function setMode(mode, updateUrl = true) {
    const signup = mode === "signup";
    if (signinForm) signinForm.hidden = signup;
    if (signupForm) signupForm.hidden = !signup;
    document.querySelectorAll("[data-auth-mode]").forEach((button) => {
      const active = button.dataset.authMode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    showMessage("", "");
    if (updateUrl && location.pathname.endsWith("auth.html")) history.replaceState(null, "", signup ? "auth.html?mode=signup" : "auth.html");
  }
  document.querySelectorAll("[data-auth-mode]").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.authMode)));

  signinForm?.addEventListener("submit", async (event) => {
    event.preventDefault(); showMessage("", "");
    const form = new FormData(signinForm);
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    try {
      const hash = await QV.passwordHash(password);
      const user = QV.getUsers().find((item) => item.email.toLowerCase() === email && item.passwordHash === hash);
      if (!user) throw new Error("Email atau kata sandi tidak cocok.");
      QV.setSession(user);
      location.href = user.role === "admin" ? "admin.html" : "catalog.html";
    } catch (error) { showMessage("error", error.message || "Gagal masuk. Coba lagi."); }
  });

  signupForm?.addEventListener("submit", async (event) => {
    event.preventDefault(); showMessage("", "");
    const form = new FormData(signupForm);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    if (name.length < 2) return showMessage("error", "Nama minimal terdiri dari dua karakter.");
    if (password.length < 8) return showMessage("error", "Kata sandi harus memiliki minimal 8 karakter.");
    if (QV.getUsers().some((item) => item.email.toLowerCase() === email)) return showMessage("error", "Email ini sudah terdaftar. Silakan masuk.");
    try {
      const user = { id: QV.createId(email), name, email, passwordHash: await QV.passwordHash(password), role: "user", createdAt: new Date().toISOString() };
      if (!QV.saveUsers([...QV.getUsers(), user])) throw new Error("Browser tidak dapat menyimpan akun. Periksa ruang penyimpanan.");
      QV.setSession(user);
      showMessage("success", "Akun berhasil dibuat. Membuka katalog...");
      setTimeout(() => { location.href = "catalog.html"; }, 500);
    } catch (error) { showMessage("error", error.message || "Gagal membuat akun. Coba lagi."); }
  });

  if (signinForm) setMode(new URLSearchParams(location.search).get("mode") === "signup" ? "signup" : "signin", false);
  document.getElementById("signout-button")?.addEventListener("click", signOut);
  renderAccount();
})();
