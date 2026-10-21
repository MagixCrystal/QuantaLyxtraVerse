(() => {
  const KEYS = { apps: "qv.apps.v1", users: "qv.users.v1", session: "qv.session.v1", owner: "qv.owner.v1" };
  const DEFAULT_OWNER_NAME = "Pearlyanca Princess Blessinca";
  const CATEGORY_META = [
    { name: "Management", description: "Aplikasi untuk mengatur data, aset, dan pekerjaan.", accent: "#10d7eb" },
    { name: "HRD", description: "Pengembangan sumber daya manusia dan pelatihan.", accent: "#9b75ff" },
    { name: "Operations", description: "Aplikasi untuk mendukung kegiatan operasional.", accent: "#e854e8" },
    { name: "IT", description: "Aplikasi teknologi, pengembangan, dan dukungan sistem.", accent: "#22d3a1" },
    { name: "Mentor", description: "Aplikasi untuk pendampingan dan bantuan belajar.", accent: "#ffbf23" },
    { name: "Business Development", description: "Aplikasi kolaborasi dan pengembangan bisnis.", accent: "#3eb9fa" },
    { name: "Digital Marketing", description: "Aplikasi desain, konten, dan pemasaran digital.", accent: "#f47e59" },
    { name: "Intern", description: "Aplikasi pendukung kegiatan dan pembelajaran intern.", accent: "#5799ff" }
  ];
  const SEED_APPS = [
    { id: "android-studio", name: "Android Studio", category: "IT", description: "IDE resmi Google untuk membangun aplikasi Android.", platform: "DESKTOP", appUrl: "https://developer.android.com/studio", officialUrl: "https://developer.android.com/studio", logoUrl: "https://developer.android.com/favicon.icon", accent: "#34a853" },
    { id: "balsamiq", name: "Balsamiq", category: "Digital Marketing", description: "Wireframe low-fidelity cepat untuk validasi ide.", platform: "DESKTOP", appUrl: "https://balsamiq.com/wireframes/desktop/", officialUrl: "https://balsamiq.com/", logoUrl: "https://balsamiq.com/favicon.ico", accent: "#f4c542" },
    { id: "chatgpt", name: "ChatGPT", category: "Mentor", description: "Asisten AI serbaguna dari OpenAI.", platform: "WEB", appUrl: "https://chatgpt.com/", officialUrl: "https://openai.com/chatgpt/", logoUrl: "https://chatgpt.com/favicon.ico", accent: "#10a37f" },
    { id: "claude", name: "Claude", category: "Mentor", description: "Asisten AI dari Anthropic untuk menulis dan menganalisis.", platform: "WEB", appUrl: "https://claude.ai/new", officialUrl: "https://claude.com/", logoUrl: "https://claude.ai/favicon.ico", accent: "#d97757" },
    { id: "drawio", name: "draw.io", category: "IT", description: "Diagram, flowchart, dan arsitektur sistem berbasis web.", platform: "WEB", appUrl: "https://app.diagrams.net/", officialUrl: "https://www.drawio.com/", logoUrl: "https://www.drawio.com/favicon.ico", accent: "#f08705" },
    { id: "figma", name: "Figma", category: "Digital Marketing", description: "Desain UI, prototipe interaktif, dan kolaborasi real-time.", platform: "WEB", appUrl: "https://www.figma.com/files/", officialUrl: "https://www.figma.com/", logoUrl: "https://www.figma.com/favicon.ico", accent: "#a259ff" },
    { id: "gemini", name: "Gemini", category: "Mentor", description: "AI multimodal Google untuk teks, gambar, dan analisis.", platform: "WEB", appUrl: "https://gemini.google.com/app", officialUrl: "https://gemini.google.com/", logoUrl: "https://gemini.google.com/favicon.ico", accent: "#4285f4" },
    { id: "git", name: "Git", category: "IT", description: "Sistem version control terdistribusi standar industri.", platform: "DESKTOP", appUrl: "https://git-scm.com/downloads", officialUrl: "https://git-scm.com/", logoUrl: "https://git-scm.com/favicon.ico", accent: "#f05032" },
    { id: "github", name: "GitHub", category: "Intern", description: "Hosting repositori kode dan kolaborasi tim.", platform: "WEB", appUrl: "https://github.com/", officialUrl: "https://github.com/", logoUrl: "https://github.com/favicon.ico", accent: "#c9d1d9" },
    { id: "google-chrome", name: "Google Chrome", category: "Intern", description: "Browser utama dengan DevTools lengkap.", platform: "DESKTOP", appUrl: "https://www.google.com/chrome/", officialUrl: "https://www.google.com/chrome/", logoUrl: "https://www.google.com/chrome/static/images/favicons/favicon-32x32.png", accent: "#4285f4" },
    { id: "infinite-learning", name: "Infinite Learning Indonesia", category: "HRD", description: "Website resmi Infinite Learning Indonesia.", platform: "WEBSITE", appUrl: "https://www.infinitelearning.id/", officialUrl: "https://www.infinitelearning.id/", logoUrl: "https://www.infinitelearning.id/favicon.ico", accent: "#00a7ab" },
    { id: "intellij-idea", name: "IntelliJ IDEA", category: "IT", description: "IDE Java dan Kotlin dari JetBrains.", platform: "DESKTOP", appUrl: "https://www.jetbrains.com/idea/download/", officialUrl: "https://www.jetbrains.com/idea/", logoUrl: "https://www.jetbrains.com/favicon.ico", accent: "#fe315d" },
    { id: "microsoft-edge", name: "Microsoft Edge", category: "Intern", description: "Browser Microsoft dengan integrasi AI bawaan.", platform: "DESKTOP", appUrl: "https://www.microsoft.com/edge/download", officialUrl: "https://www.microsoft.com/edge/", logoUrl: "https://www.microsoft.com/favicon.ico", accent: "#1683d8" },
    { id: "sublime-text", name: "Sublime Text", category: "IT", description: "Editor teks supercepat untuk menulis kode harian.", platform: "DESKTOP", appUrl: "https://www.sublimetext.com/download", officialUrl: "https://www.sublimetext.com/", logoUrl: "https://www.sublimetext.com/favicon.ico", accent: "#ff9800" },
    { id: "visual-studio-code", name: "Visual Studio Code", category: "IT", description: "Editor kode ringan dengan ekosistem ekstensi.", platform: "DESKTOP", appUrl: "https://code.visualstudio.com/", officialUrl: "https://code.visualstudio.com/", logoUrl: "https://code.visualstudio.com/favicon.ico", accent: "#22a6f2" },
    { id: "vmware-workstation", name: "VMware Workstation", category: "Operations", description: "Virtualisasi mesin dan sistem operasi di satu komputer.", platform: "DESKTOP", appUrl: "https://knowledge.broadcom.com/external/article/368667/download-and-license-vmware-desktop-hyper.html", officialUrl: "https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion", logoUrl: "https://www.vmware.com/favicon.ico", accent: "#607d8b" },
    { id: "whatsapp", name: "WhatsApp", category: "Business Development", description: "Pesan instan dan koordinasi tim dari browser.", platform: "WEB", appUrl: "https://web.whatsapp.com/", officialUrl: "https://www.whatsapp.com/", logoUrl: "https://www.whatsapp.com/favicon.ico", accent: "#25d366" },
    { id: "xampp", name: "XAMPP", category: "IT", description: "Paket server untuk menjalankan situs secara lokal.", platform: "DESKTOP", appUrl: "https://www.apachefriends.org/download.html", officialUrl: "https://www.apachefriends.org/", logoUrl: "https://www.apachefriends.org/favicon.ico", accent: "#fb7a24" },
    { id: "airtable", name: "Airtable", category: "Management", description: "Kelola data dan alur kerja dalam basis data kolaboratif.", platform: "WEB", appUrl: "https://airtable.com/", officialUrl: "https://www.airtable.com/", logoUrl: "https://www.airtable.com/favicon.ico", accent: "#18bfff" },
    { id: "assets-management", name: "Assets Management", category: "Management", description: "Situs resmi Snipe-IT untuk pengelolaan aset TI.", platform: "WEB", appUrl: "https://snipeitapp.com/", officialUrl: "https://snipeitapp.com/", logoUrl: "https://snipeitapp.com/favicon.ico", accent: "#8d6bb8" },
    { id: "canva", name: "Canva", category: "Digital Marketing", description: "Buat desain, presentasi, dan materi visual.", platform: "WEB", appUrl: "https://www.canva.com/", officialUrl: "https://www.canva.com/", logoUrl: "https://www.canva.com/favicon.ico", accent: "#7d2ae8" },
    { id: "lms", name: "LMS", category: "HRD", description: "Lihat kelas belajar mandiri dan materi pembelajaran dari Infinite Learning Indonesia.", platform: "WEB", appUrl: "https://course.infinitelearning.id/", officialUrl: "https://www.infinitelearning.id/", logoUrl: "https://www.infinitelearning.id/favicon.ico", accent: "#5d68a9" },
    { id: "pritunl-1", name: "Pritunl 1", category: "Operations", description: "Buka situs resmi Pritunl. Alamat server VPN internal dapat diatur admin.", platform: "WEB", appUrl: "https://pritunl.com/", officialUrl: "https://pritunl.com/", logoUrl: "https://pritunl.com/favicon.ico", accent: "#d93242" },
    { id: "pritunl-2", name: "Pritunl 2", category: "Operations", description: "Buka situs resmi Pritunl. Alamat server VPN internal dapat diatur admin.", platform: "WEB", appUrl: "https://pritunl.com/", officialUrl: "https://pritunl.com/", logoUrl: "https://pritunl.com/favicon.ico", accent: "#d93242" },
    { id: "trello", name: "Trello", category: "Management", description: "Atur tugas dan proyek menggunakan papan kolaboratif.", platform: "WEB", appUrl: "https://trello.com/", officialUrl: "https://trello.com/", logoUrl: "https://trello.com/favicon.ico", accent: "#0079bf" },
    { id: "unifi-controller", name: "UniFi Controller", category: "Operations", description: "Kelola perangkat jaringan UniFi dari Site Manager.", platform: "WEB", appUrl: "https://unifi.ui.com/", officialUrl: "https://ui.com/", logoUrl: "https://ui.com/favicon.ico", accent: "#0969c8" },
    { id: "webmail", name: "Webmail", category: "Business Development", description: "Buka Gmail di browser. Admin dapat mengganti tautan jika memakai portal email lain.", platform: "WEB", appUrl: "https://mail.google.com/", officialUrl: "https://workspace.google.com/products/gmail/", logoUrl: "https://mail.google.com/favicon.ico", accent: "#1686d5" },
    { id: "zabbix-network-monitoring", name: "Zabbix Network Monitoring", category: "Operations", description: "Situs resmi Zabbix. Alamat dashboard pemantauan internal dapat diatur admin.", platform: "WEB", appUrl: "https://www.zabbix.com/", officialUrl: "https://www.zabbix.com/", logoUrl: "https://www.zabbix.com/favicon.ico", accent: "#d40000" }
  ];
  const CATALOG_VERSION = "7";
  const CATEGORY_RENAMES = {
    "Development": "IT",
    "Design & Prototyping": "Digital Marketing",
    "AI Assistant": "Mentor",
    "Browser & Communication": "Business Development",
    "Browser & Komunikasi": "Business Development",
    "Server & Infrastructure": "Operations",
    "Server & Infrastruktur": "Operations",
    "Management & Productivity": "Management",
    "Manajemen & Produktivitas": "Management",
    "Education & Learning": "HRD",
    "Pendidikan & Pembelajaran": "HRD",
    "Official Websites": "Business Development",
    "Website Resmi": "Business Development"
  };
  const ADDED_APP_IDS = new Set(["airtable", "assets-management", "canva", "lms", "pritunl-1", "pritunl-2", "trello", "unifi-controller", "webmail", "zabbix-network-monitoring"]);
  const CATEGORY_NAMES = new Set(CATEGORY_META.map((item) => item.name));
  const SEED_CATEGORY_BY_ID = Object.fromEntries(SEED_APPS.map((app) => [app.id, app.category]));

  function read(key, fallback) {
    try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
    catch (error) { console.warn("Quantalyxtra Verse: data browser tidak dapat dibaca.", error); return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { console.error("Quantalyxtra Verse: data tidak dapat disimpan.", error); return false; }
  }
  function init() {
    const savedApps = read(KEYS.apps, null);
    if (!Array.isArray(savedApps)) {
      if (write(KEYS.apps, SEED_APPS)) localStorage.setItem("qv.catalog.version", CATALOG_VERSION);
    } else if (localStorage.getItem("qv.catalog.version") !== CATALOG_VERSION) {
      const migratedApps = savedApps.filter((app) => app?.id !== "official-website" && String(app?.name || "").trim().toLowerCase() !== "official website");
      const savedIds = new Set(migratedApps.map((app) => app.id));
      const addedSeeds = SEED_APPS.filter((app) => ADDED_APP_IDS.has(app.id));
      addedSeeds.filter((app) => !savedIds.has(app.id)).forEach((app) => migratedApps.push(app));
      const seedById = new Map(addedSeeds.map((app) => [app.id, app]));
      migratedApps.forEach((app) => {
        app.category = SEED_CATEGORY_BY_ID[app.id] || (CATEGORY_NAMES.has(app.category) ? app.category : CATEGORY_RENAMES[app.category] || "IT");
        const seed = seedById.get(app.id);
        if (!seed) return;
        ["appUrl", "officialUrl", "logoUrl"].forEach((field) => {
          if (!String(app[field] || "").trim() && seed[field]) app[field] = seed[field];
        });
        if (app.id === "lms" && app.logoUrl === "https://course.infinitelearning.id/favicon.ico") app.logoUrl = seed.logoUrl;
        const oldDescriptions = {
          "assets-management": "Portal internal untuk pengelolaan aset. Tautan dapat diatur admin.",
          lms: "Portal Learning Management System. Tautan dapat diatur admin.",
          "pritunl-1": "Akses VPN internal pertama. Admin dapat mengatur alamat server.",
          "pritunl-2": "Akses VPN internal kedua. Admin dapat mengatur alamat server.",
          webmail: "Portal email organisasi. Tautan dapat diatur admin.",
          "zabbix-network-monitoring": "Pantau jaringan melalui portal Zabbix organisasi."
        };
        if (app.description === oldDescriptions[app.id]) app.description = seed.description;
      });
      if (write(KEYS.apps, migratedApps)) localStorage.setItem("qv.catalog.version", CATALOG_VERSION);
    }
    if (!localStorage.getItem(KEYS.users)) write(KEYS.users, [{ id: "qv-admin", name: "Admin Quantalyxtra", email: "admin@quantalyxtra.com", passwordHash: "7b794f5fc4192bb8eb4c5cd16fc0ea6229446b035d2c9dcf4c240adcc7d317d9", role: "admin", createdAt: new Date().toISOString() }]);
    if (!localStorage.getItem(KEYS.owner)) write(KEYS.owner, DEFAULT_OWNER_NAME);
  }
  function getApps() { return read(KEYS.apps, SEED_APPS); }
  function saveApps(apps) { return write(KEYS.apps, apps); }
  function getUsers() { return read(KEYS.users, []); }
  function saveUsers(users) { return write(KEYS.users, users); }
  function getSession() { return read(KEYS.session, null); }
  function setSession(user) { return write(KEYS.session, { userId: user.id }); }
  function clearSession() { localStorage.removeItem(KEYS.session); }
  function currentUser() { const session = getSession(); return session ? getUsers().find((user) => user.id === session.userId) || null : null; }
  function isAdmin() { const user = currentUser(); return Boolean(user && user.role === "admin"); }
  function getOwnerName() { const name = read(KEYS.owner, DEFAULT_OWNER_NAME); return typeof name === "string" && name.trim() ? name.trim() : DEFAULT_OWNER_NAME; }
  function saveOwnerName(name) { if (!isAdmin()) return false; const value = String(name || "").trim(); return value.length >= 2 && value.length <= 80 && write(KEYS.owner, value); }
  function renderOwnerName() { document.querySelectorAll("[data-owner-name]").forEach((element) => { element.textContent = getOwnerName(); }); }
  function slug(text) { return String(text).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "aplikasi"; }
  function createId(name) { return `${slug(name)}-${Math.random().toString(36).slice(2, 7)}`; }
  function escapeHTML(value) { return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]); }
  function safeURL(value) { try { const parsed = new URL(String(value || "")); return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : ""; } catch { return ""; } }
  function host(value) { try { return new URL(value).hostname.replace(/^www\./, ""); } catch { return "situs resmi"; } }
  function categories(apps = getApps()) {
    return CATEGORY_META.map((item) => ({ ...item }));
  }
  function categoryFor(name) { return categories([...SEED_APPS, ...getApps()]).find((item) => item.name === name) || CATEGORY_META[0]; }
  async function passwordHash(password) {
    if (!window.crypto?.subtle) throw new Error("Fitur akun membutuhkan browser modern dan alamat localhost atau HTTPS.");
    const bytes = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  function initials(name) { return String(name || "?").trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase(); }

  window.QV = { KEYS, CATEGORY_META, SEED_APPS, init, getApps, saveApps, getUsers, saveUsers, currentUser, isAdmin, setSession, clearSession, getOwnerName, saveOwnerName, renderOwnerName, slug, createId, escapeHTML, safeURL, host, categories, categoryFor, passwordHash, initials };
  init();
  renderOwnerName();
  window.addEventListener("storage", (event) => {
    if (event.key === KEYS.owner) renderOwnerName();
  });
})();
