(() => {
  const storageKey = "mc1ntosh-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let preference;
  let themeSwitch;
  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") preference = savedTheme;
  } catch {
    // The switch still works for this visit when storage is unavailable.
  }

  function applyTheme() {
    const currentTheme = preference ?? (systemTheme.matches ? "dark" : "light");
    document.documentElement.dataset.theme = currentTheme;
    themeSwitch?.setAttribute("aria-checked", String(currentTheme === "dark"));
  }

  applyTheme();
  systemTheme.addEventListener("change", applyTheme);
  document.addEventListener("DOMContentLoaded", () => {
    const bio = document.querySelector(".bio");
    if (bio) {
      const openBio = () => { bio.open = true; };
      const openLinkedBio = () => {
        if (window.location.hash === "#about") openBio();
      };
      document.querySelector('.main-nav a[href="#about"]')?.addEventListener("click", openBio);
      window.addEventListener("hashchange", openLinkedBio);
      openLinkedBio();
    }

    themeSwitch = document.querySelector(".theme-switch");
    if (!themeSwitch) return;
    themeSwitch.addEventListener("click", () => {
      preference = themeSwitch.getAttribute("aria-checked") === "true" ? "light" : "dark";
      applyTheme();
      try {
        window.localStorage.setItem(storageKey, preference);
      } catch {
        // The current page already reflects the selected theme.
      }
    });
    applyTheme();
    themeSwitch.hidden = false;
  });
})();
