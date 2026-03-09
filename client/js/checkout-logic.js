// client/js/checkout-logic.js
const resumenDiv = document.getElementById('resumen-pedido');
const totalSpan = document.getElementById('total-final');

function cargarResumen() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        resumenDiv.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    let total = 0;
    resumenDiv.innerHTML = carrito.map(item => {
        total += item.precio;
        return `<p>${item.nombre} - <strong>C$ ${item.precio}</strong></p>`;
    }).join('');

    totalSpan.innerText = `C$ ${total.toFixed(2)}`;
}

async function procesarPedido() {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const direccion = document.getElementById('direccion').value;
    const clienteId = localStorage.getItem('user_id'); // Asegúrate de tener esto del login

    if (!direccion) {
        alert("Por favor, ingresa tu dirección en Nicaragua.");
        return;
    }

    const { data, error } = await _supabase
        .from('pedidos')
        .insert([{
            cliente_id: clienteId,
            items: carrito,
            total: carrito.reduce((s, i) => s + i.precio, 0),
            direccion: direccion,
            estado: 'Pendiente' // Esto lo verá el restaurante en su panel
        }])
        .select();

    if (error) {
        alert("Hubo un error al procesar tu pedido.");
    } else {
        alert("¡Pedido enviado con éxito!");
        localStorage.removeItem('carrito'); // Limpiamos el carrito
        window.location.href = 'tracking.html?id=' + data[0].id;
    }
}

document.addEventListener('DOMContentLoaded', cargarResumen);
