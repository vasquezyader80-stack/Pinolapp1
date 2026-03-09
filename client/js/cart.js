async function procesarPedido() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const pedidoData = {
        cliente_id: localStorage.getItem('user_id'),
        total: total,
        items: carrito,
        fecha: new Date().toISOString()
    };

    try {
        const response = await fetch('../api/pedidos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedidoData)
        });

        const result = await response.json();

        if (result.status === "success") {
            // Guardamos el ID para el tracking
            localStorage.setItem('ultimo_pedido_id', result.order_id);
            window.location.href = 'tracking.html';
        }
    } catch (error) {
        console.error("Error al enviar pedido:", error);
    }
}
