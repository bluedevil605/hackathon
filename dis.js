document.addEventListener('DOMContentLoaded', function() {
    // Handle disaster report form submission
    const disasterForm = document.getElementById('disasterForm');
    disasterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const disasterName = document.getElementById('disasterName').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        // Submit the report (you can integrate your backend logic here)
        console.log('Disaster Report Submitted:', { disasterName, location, description });
        alert('Disaster report submitted successfully!');
        disasterForm.reset();
    });

    // Fetch live disaster updates
    async function fetchLiveUpdates() {
        try {
            const response = await fetch('https://api.example.com/live-disaster-updates'); // Replace with your API endpoint
            const data = await response.json();
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';
            data.updates.forEach(update => {
                const updateElement = document.createElement('div');
                updateElement.className = 'update';
                updateElement.innerHTML = `
                    <h3>${update.title}</h3>
                    <p>${update.description}</p>
                `;
                newsContainer.appendChild(updateElement);
            });
        } catch (error) {
            console.error('Error fetching live updates:', error);
        }
    }

    // Initialize Google Map
    window.initMap = function() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 20.5937, lng: 78.9629 }, // Centered on India
            zoom: 5
        });

        // Add a marker on click
        map.addListener('click', function(event) {
            placeMarker(event.latLng, map);
        });

        // Get precise location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                placeMarker(pos, map);
            }, function() {
                handleLocationError(true, map.getCenter(), map);
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter(), map);
        }
    };

    function placeMarker(location, map) {
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
        map.panTo(location);
    }

    function handleLocationError(browserHasGeolocation, pos, map) {
        const infoWindow = new google.maps.InfoWindow({ map: map });
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    // Fetch live updates on page load
    fetchLiveUpdates();
});
