// client/js/tracking-logic.js
const map = L.map('map').setView([12.4378, -86.8785], 13); // Centrado en León/Chinandega
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let marker = L.marker([12.4378, -86.8785]).addTo(map);

const pedidoId = new URLSearchParams(window.location.search).get('id');

// Suscribirse a cambios del pedido en tiempo real
_supabase
    .channel('tracking-pedido')
    .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'pedidos', 
        filter: `id=eq.${pedidoId}` 
    }, payload => {
        const estado = payload.new.estado;
        actualizarInterfaz(estado);
        if (payload.new.lat && payload.new.lng) {
            actualizarMapa(payload.new.lat, payload.new.lng);
        }
    })
    .subscribe();

function actualizarInterfaz(estado) {
    document.getElementById('pedido-status').innerText = estado;
    // Lógica para iluminar los pasos (Preparando, En camino, etc.)
}

function actualizarMapa(lat, lng) {
    const nuevaPos = [lat, lng];
    marker.setLatLng(nuevaPos);
    map.panTo(nuevaPos);
}
