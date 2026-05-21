const themeToggle = document.querySelector("#themeToggle");

function isDarkTheme() {
	return document.documentElement.classList.contains("dark");
}

function syncThemeToggle() {
	const isDark = isDarkTheme();

	themeToggle?.setAttribute("aria-label", isDark ? "切換到淺色模式" : "切換到深色模式");
}

themeToggle?.addEventListener("click", () => {
	const nextTheme = isDarkTheme() ? "light" : "dark";

	document.documentElement.classList.toggle("dark", nextTheme === "dark");
	localStorage.setItem("theme", nextTheme);
	syncThemeToggle();
});

syncThemeToggle();
