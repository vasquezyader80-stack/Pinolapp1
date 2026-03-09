// Función para aceptar un pedido
async function aceptarPedido(pedidoId) {
    const driverId = localStorage.getItem('driver_id');
    if (!driverId) { window.location.href = 'login.html'; return; }
    
    // Actualizamos el estado del pedido en Supabase
    const { data, error } = await _supabase
        .from('pedidos')
        .update({ 
            estado: 'En camino', 
            repartidor_id: driverId 
        })
        .eq('id', pedidoId);

    if (!error) {
        // Al aceptar, redirigimos al mapa de navegación
        localStorage.setItem('active_order_id', pedidoId);
        window.location.href = 'mapa.html';
    }
}

// Escuchar cambios en tiempo real (Realtime de Supabase)
const ordersSubscription = _supabase
    .channel('public:pedidos')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pedidos' }, payload => {
        console.log('¡Nuevo pedido detectado!', payload.new);
        renderizarPedidos(); // Recarga la lista automáticamente
    })
    .subscribe();

async function renderizarPedidos() {
    const { data: pedidos } = await _supabase
        .from('pedidos')
        .select('*, restaurantes(nombre, ubicacion)')
        .eq('estado', 'Preparado');

    const container = document.getElementById('orders-container');
    container.innerHTML = pedidos.map(p => `
        <div class="card-pedido">
            <h3>Orden #${p.id}</h3>
            <p><strong>Restaurante:</strong> ${p.restaurantes.nombre}</p>
            <p><strong>Monto:</strong> C$ ${p.total}</p>
            <button onclick="aceptarPedido(${p.id})" class="btn-aceptar">Aceptar Entrega</button>
        </div>
    `).join('');
}

renderizarPedidos();
