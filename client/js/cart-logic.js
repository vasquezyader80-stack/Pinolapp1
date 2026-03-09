function cargarCarrito() {
    // Recuperamos los datos del LocalStorage (Persistencia)
    const cart = JSON.parse(localStorage.getItem('pinol_cart')) || [];
    const container = document.getElementById('cart-items');
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Tu carrito está vacío. ¡Busca algo rico!</p>";
        return;
    }

    container.innerHTML = cart.map((item, index) => {
        total += item.precio;
        return `
            <div class="cart-item">
                <span>${item.nombre}</span>
                <strong>C$ ${item.precio}</strong>
                <button onclick="eliminarDelCarrito(${index})">❌</button>
            </div>
        `;
    }).join('');

    document.getElementById('cart-total').innerText = `C$ ${total.toFixed(2)}`;
}

async function procesarPedido() {
    const cart = JSON.parse(localStorage.getItem('pinol_cart'));
    
    // Aquí enviamos el pedido a Supabase
    const { data, error } = await _supabase
        .from('pedidos')
        .insert([{
            total: calcularTotal(cart),
            estado: 'Pendiente',
            restaurante_id: cart[0].restaurante_id
        }]);

    if (!error) {
        alert("¡Pedido enviado! El restaurante empezará a prepararlo.");
        localStorage.removeItem('pinol_cart'); // Limpiamos el carrito
        window.location.href = 'tracking.html';
    }
}

cargarCarrito();
