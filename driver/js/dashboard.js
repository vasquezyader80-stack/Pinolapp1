async function tomarPedido(pedidoId) {
    const repartidorId = localStorage.getItem('repartidor_id');

    const response = await fetch('../api/repartidores.php', {
        method: 'POST',
        body: JSON.stringify({
            accion: 'aceptar_pedido',
            pedido_id: pedidoId,
            repartidor_id: repartidorId
        })
    });

    const res = await response.json();
    if (res.ok) {
        // Al aceptar, redirigimos al mapa de navegación
        window.location.href = `mapa.html?pedido=${pedidoId}`;
    }
}
