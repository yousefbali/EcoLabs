if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            // Use reverse geocoding to get the state
            const state = await getStateFromCoordinates(latitude, longitude);
            console.log("State:", state);
        },
        (error) => {
            console.error("Error getting location:", error.message);
        }
    );
} else {
    console.log("Geolocation is not supported by this browser.");
}

// Function to get the state using Google Maps Geocoding API
async function getStateFromCoordinates(latitude, longitude) {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.status === "OK") {
            // Parse the results to find the state
            const results = data.results;
            for (const result of results) {
                for (const component of result.address_components) {
                    if (component.types.includes("administrative_area_level_1")) {
                        return component.long_name; // Returns the state name
                    }
                }
            }
        } else {
            console.error("Geocoding error:", data.status);
        }
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
    }

    return "Unknown State"; // Fallback if the state is not found
}
