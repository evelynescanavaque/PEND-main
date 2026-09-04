navigator.geolocation.getCurrentPosition(
    function(position) {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
        console.log("Precisão: " + position.coords.accuracy);
    },
    function(error) {
        console.error("Erro ao obter a localização: ", error);


    }
);