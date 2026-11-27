(() => {
  const storageKey = "mc1ntosh-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let preference;
  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") preference = savedTheme;
  } catch {
    // The switch still works for this visit when storage is unavailable.
  }

  function applyTheme() {
    const currentTheme = preference ?? (systemTheme.matches ? "dark" : "light");
    document.documentElement.dataset.theme = currentTheme;
    for (const button of document.querySelectorAll(".theme-switch button")) {
      button.setAttribute("aria-pressed", String(button.dataset.mode === currentTheme));
    }
  }

  applyTheme();
  systemTheme.addEventListener("change", applyTheme);
  document.addEventListener("DOMContentLoaded", () => {
    const themeSwitch = document.querySelector(".theme-switch");
    if (!themeSwitch) return;
    for (const button of themeSwitch.querySelectorAll("button")) {
      button.addEventListener("click", () => {
        preference = button.dataset.mode;
        applyTheme();
        try {
          window.localStorage.setItem(storageKey, preference);
        } catch {
          // The current page already reflects the selected theme.
        }
      });
    }
    applyTheme();
    themeSwitch.hidden = false;
  });
})();
