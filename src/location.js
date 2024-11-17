if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition();
} else {
    console.log("Geolocation is not supported");
}
//position.coords.latitude
//position.coords.longitude