function iniciarSeguimiento(pedidoId) {
    setInterval(async () => {
        const res = await fetch(`../api/tracking.php?order_id=${pedidoId}`);
        const data = await res.json();
        
        // Movemos el marcador en el mapa
        actualizarMapa(data.lat, data.lng);
        
        // Actualizamos el estado (Preparando -> En camino)
        document.getElementById('estado-actual').innerText = data.estado;
    }, 5000); // Se actualiza cada 5 segundos
}

