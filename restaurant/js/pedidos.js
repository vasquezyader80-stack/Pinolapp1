async function actualizarEstadoPedido(pedidoId, nuevoEstado) {
    const response = await fetch('../api/pedidos.php', {
        method: 'PUT',
        body: JSON.stringify({
            id: pedidoId,
            estado: nuevoEstado // Ejemplo: 'Preparando'
        })
    });

    const result = await response.json();
    if (result.success) {
        alert("Pedido actualizado a: " + nuevoEstado);
        location.reload(); // Refresca la lista de pedidos
    }
}
