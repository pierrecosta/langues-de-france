"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // stockage indisponible : le thème reste valable pour la page
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md border border-current px-3 py-2 text-base font-medium"
    >
      <span className="dark:hidden">Thème sombre</span>
      <span className="hidden dark:inline">Thème clair</span>
    </button>
  );
}
