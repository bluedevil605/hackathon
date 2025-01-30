let map;
let weatherData = null;

// Initialize Google Map
function initMap() {
  const indiaLocation = { lat: 20.5937, lng: 78.9629 }; // Coordinates of India

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: indiaLocation,
  });

  // Add pins for Red, Yellow, and Green areas (example locations)
  const areas = [
    { lat: 28.6139, lng: 77.2090, color: 'green', areaName: 'Green Area (safe)' }, // Delhi
    { lat: 19.0760, lng: 72.8777, color: 'red', areaName: 'Red Area (critical)' }, // Mumbai
    { lat: 12.9716, lng: 77.5946, color: 'yellow', areaName: 'Yellow Area (warning)' }, // Bangalore
    { lat: 28.4022409, lng: 77.2366733 , color: 'blue', areaName: 'Blue Area (nearest NGO)' },
    { lat: 17.2445812, lng: 74.0741731, color: 'blue', areaName: 'Blue Area (nearest NGO)'},
    { lat: 13.9683163, lng: 77.6310883,color: 'blue',areaName: 'Blue Area (nearest NGO)'}
  ];

  areas.forEach(area => {
    const icon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: area.color,
      fillOpacity: 1,
      strokeColor: area.color,
      strokeWeight: 2,
      scale: 10,
    };

    const marker = new google.maps.Marker({
      position: { lat: area.lat, lng: area.lng },
      map: map,
      title: area.areaName,
      icon: icon,
    });
  });

  // Fetch live weather data
  fetchWeatherData();
}

// Fetch weather data from Indian Meteorological Department API
async function fetchWeatherData() {
  const apiUrl = "https://api.weatherapi.com/v1/forecast.json?key=c4deaa7228794adf854160135253001&q=India&alerts=yes"; // Replace with actual IMD API endpoint

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    weatherData = data;

    displayWeatherData(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Display the weather data
function displayWeatherData(data) {
  const weatherDetails = document.getElementById("weather-details");

  if (data && data.weather) {
    const weatherInfo = data.weather.map((entry) => {
      return `
        <p><strong>Location:</strong> ${entry.location}</p>
        <p><strong>Temperature:</strong> ${entry.temperature} °C</p>
        <p><strong>Condition:</strong> ${entry.condition}</p>
        <hr>
      `;
    }).join('');

    weatherDetails.innerHTML = weatherInfo;
  } else {
    weatherDetails.innerHTML = "<p>No weather data available.</p>";
  }
}
