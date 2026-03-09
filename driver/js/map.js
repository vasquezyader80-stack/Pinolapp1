// driver/js/map.js
function actualizarUbicacionRepartidor() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Mandamos la ubicación a la API de tracking que ya creamos
            await fetch('../../api/tracking.php', {
                method: 'POST',
                body: JSON.stringify({
                    pedido_id: localStorage.getItem('pedido_activo'),
                    lat: latitude,
                    lng: longitude
                })
            });
            console.log("Ubicación enviada: ", latitude, longitude);
        });
    }
}
