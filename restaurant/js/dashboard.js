// restaurant/js/dashboard.js

async function cargarNuevosPedidos() {
    const restaurantId = localStorage.getItem('restaurant_id');
    
    // Consultamos pedidos que estén en estado 'Pendiente' para este restaurante
    const { data: pedidos, error } = await _supabase
        .from('pedidos')
        .select('*')
        .eq('restaurante_id', restaurantId)
        .eq('estado', 'Pendiente');

    if (error) {
        console.error("Error al cargar pedidos:", error);
        return;
    }

    const contenedor = document.getElementById('lista-pedidos');
    contenedor.innerHTML = pedidos.map(p => `
        <div class="pedido-card">
            <h4>Pedido #${p.id.slice(0, 8)}</h4>
            <p><strong>Cliente:</strong> ${p.cliente_nombre}</p>
            <p><strong>Total:</strong> C$ ${p.total}</p>
            <button onclick="cambiarEstado('${p.id}', 'Preparando')">Aceptar y Preparar</button>
        </div>
    `).join('');
}

// Función para mover el pedido al siguiente paso
async function cambiarEstado(id, nuevoEstado) {
    const { error } = await _supabase
        .from('pedidos')
        .update({ estado: nuevoEstado })
        .eq('id', id);

    if (!error) {
        alert("Pedido aceptado. ¡A la cocina!");
        cargarNuevosPedidos();
    }
}

// Revisar pedidos cada 30 segundos (aunque con Realtime es automático)
setInterval(cargarNuevosPedidos, 30000);
cargarNuevosPedidos();
