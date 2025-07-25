function openCity(evt, cityName) {
    var i, tabcontent, tablinks;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Remove active from all tab buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    // Show selected tab
    document.getElementById(cityName).style.display = "block";

    // Add active class to clicked tab or via auto-select
    if (evt && evt.currentTarget) {
      evt.currentTarget.classList.add("active");
    } else {
      const autoBtn = document.querySelector(`.tablinks[data-tab="${cityName}"]`);
      if (autoBtn) autoBtn.classList.add("active");
    }
  }

  // Get ?tab= from URL
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // Load tab on page load
  window.onload = function () {
    const tab = getQueryParam("tab") || "art"; // default to 'art'
    openCity(null, tab);

  };

function searchAcrossTabs() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const tabcontents = document.getElementsByClassName("tabcontent");
  let anyMatchFound = false;

  for (let i = 0; i < tabcontents.length; i++) {
    const tab = tabcontents[i];
    let cardMatchFound = false;
    const cards = tab.querySelectorAll(".card");

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = "block";
        cardMatchFound = true;
      } else {
        card.style.display = "none";
      }
    });

    // Show or hide the entire tab
    tab.style.display = cardMatchFound ? "block" : "none";
    if (cardMatchFound) anyMatchFound = true;
  }

  // Optional: Show message if nothing matches
  if (!anyMatchFound) {
    console.log("No matching results found.");
  }
}

  function toggleMenu() {
    const menu = document.getElementById("offCanvasMenu");
    menu.classList.toggle("open");
  }


