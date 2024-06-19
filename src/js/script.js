// Load saved mode on page load
const savedMode = localStorage.getItem("darkMode");
if (savedMode === "true") {
  document.body.classList.add("dark-mode");
  toggleButton.checked = true;
} else {
  document.body.classList.remove("dark-mode");
  toggleButton.checked = false;
}

// Theme selector
const themeSelect = document.getElementById("theme-select");
const themeLink = document.getElementById("theme");

// Change theme on select
themeSelect.addEventListener("change", () => {
  const selectedTheme = themeSelect.value;
  themeLink.href = selectedTheme;
  localStorage.setItem("theme", selectedTheme);
});

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  themeLink.href = savedTheme;
  themeSelect.value = savedTheme;
}
