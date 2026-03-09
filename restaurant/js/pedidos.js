// restaurant/js/pedidos.js

// 1. Escuchar pedidos en tiempo real con Supabase
const pedidosRealtime = _supabase
    .channel('cambios-pedidos')
    .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'pedidos',
        filter: `restaurante_id=eq.${localStorage.getItem('restaurant_id')}` 
    }, payload => {
        console.log('¡Nuevo cambio en pedidos!', payload);
        cargarPedidos(); // Recarga la lista automáticamente
    })
    .subscribe();

// 2. Función para cargar y mostrar los pedidos
async function cargarPedidos() {
    const restaurantId = localStorage.getItem('restaurant_id');
    
    const { data: pedidos, error } = await _supabase
        .from('pedidos')
        .select('*')
        .eq('restaurante_id', restaurantId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error cargando pedidos:", error);
        return;
    }

    const contenedor = document.getElementById('lista-pedidos');
    contenedor.innerHTML = ''; // Limpiamos antes de recargar

    pedidos.forEach(pedido => {
        const div = document.createElement('div');
        div.className = 'order-card';
        // Usamos C$ para la moneda local de Nicaragua
        div.innerHTML = `
            <h3>Orden #${pedido.id.slice(0, 8)}</h3>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
            <p><strong>Total:</strong> C$ ${pedido.total}</p>
            ${pedido.estado === 'Pendiente' ? 
                `<button class="btn-preparado" onclick="cambiarEstado('${pedido.id}', 'Preparado')">
                    Marcar como Preparado
                 </button>` : ''}
        `;
        contenedor.appendChild(div);
    });
}

// 3. Función para avisar al repartidor
async function cambiarEstado(id, nuevoEstado) {
    const { error } = await _supabase
        .from('pedidos')
        .update({ estado: nuevoEstado })
        .eq('id', id);

    if (error) {
        alert("No se pudo actualizar el pedido.");
    } else {
        alert("¡Pedido listo! El repartidor ya puede verlo.");
        cargarPedidos();
    }
}

// Iniciar al cargar la página
document.addEventListener('DOMContentLoaded', cargarPedidos);
                                            
