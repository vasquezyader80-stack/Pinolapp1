async function cargarNuevosPedidos() {
    const response = await fetch('../api/pedidos.php?rol=restaurante');
    const pedidos = await response.json();
    
    const contenedor = document.getElementById('lista-pedidos');
    contenedor.innerHTML = pedidos.map(p => `
        <div class="pedido-card">
            <h4>Pedido #${p.id}</h4>
            <p>Cliente: ${p.cliente_nombre}</p>
            <p>Total: C$ ${p.total}</p>
            <button onclick="cambiarEstado(${p.id}, 'Preparando')">Aceptar</button>
        </div>
    `).join('');
}

setInterval(cargarNuevosPedidos, 30000); // Check cada 30 seg
