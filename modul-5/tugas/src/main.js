const toggle = document.getElementById("darkToggle");

// Load theme dari localStorage
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// Toggle dark mode
toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
