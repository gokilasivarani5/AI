/* ================================
   AUTO SYSTEM THEME HANDLER
   ================================ */

// Apply theme based on system preference
function applySystemTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    // Dark Mode
    document.documentElement.dataset.theme = "dark";
    document.documentElement.classList.add("dark");
  } else {
    // Light Mode
    document.documentElement.dataset.theme = "light";
    document.documentElement.classList.remove("dark");
  }
}

// Apply immediately on page load
applySystemTheme();

// Listen for system theme changes (Live switching)
window.matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", applySystemTheme);
