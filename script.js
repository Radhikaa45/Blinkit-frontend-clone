document.addEventListener("DOMContentLoaded", () => {
  const locationText = document.querySelector(".location-text");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const displayName = data.address.city || data.address.town || data.address.village || data.address.state || "your area";
          locationText.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${displayName}`;
        } catch (error) {
          locationText.innerHTML = `<i class="fas fa-map-marker-alt"></i> Location unavailable`;
        }
      },
      () => {
        locationText.innerHTML = `<i class="fas fa-map-marker-alt"></i> Location access denied`;
      }
    );
  } else {
    locationText.textContent = "Geolocation not supported";
  }

  /
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "dark";
  toggleButton.className = "mode-toggle";
  document.body.appendChild(toggleButton);


  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "light";
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleButton.textContent = isDark ? "light" : "dark";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
