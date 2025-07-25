// script.js
function handleSearch() {
  const input = document.querySelector('.search-bar input');
  const query = input.value.trim();

  if (query.length === 0) {
    alert("Please enter a search term.");
    return;
  }

  // Redirect to search results page or filter displayed items
  alert(`Searching for: ${query}`);
  // You could replace this alert with actual search logic or redirect
  // window.location.href = `/search?q=${encodeURIComponent(query)}`;
}
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  window.onload = function () {
    const tabName = getQueryParam("tab") || "art"; // Default to "art"
    const matchingTab = document.querySelector(`.tablinks[data-tab="${tabName}"]`);
    if (matchingTab) {
      matchingTab.click();
    }
  };
  function toggleMenu() {
      const nav = document.getElementById('mobileNav');
      nav.classList.toggle('show');
    }

