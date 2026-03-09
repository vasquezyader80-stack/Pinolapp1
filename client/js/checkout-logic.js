// client/js/checkout-logic.js

const carrito = JSON.parse(localStorage.getItem('pinol_cart')) || [];

function cargarResumen() {
    const subtotal = carrito.reduce((s, i) => s + (i.precio * i.cantidad), 0);
    const envio = 40; // Costo estándar en Nicaragua
    const total = subtotal + envio;

    document.getElementById('subtotal').innerText = `C$ ${subtotal.toFixed(2)}`;
    document.getElementById('total-final').innerText = `C$ ${total.toFixed(2)}`;
}

async function enviarPedido() {
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const metodo = document.getElementById('metodo-pago').value;

    if (!direccion || !telefono) {
        alert("Por favor, completa los datos de entrega.");
        return;
    }

    // Guardamos en la tabla 'pedidos' de Supabase
    const { data, error } = await _supabase
        .from('pedidos')
        .insert([{
            cliente_nombre: localStorage.getItem('user_name') || 'Cliente Anónimo',
            direccion: direccion,
            telefono: telefono,
            total: parseFloat(document.getElementById('total-final').innerText.replace('C$ ', '')),
            items: carrito,
            estado: 'Pendiente',
            metodo_pago: metodo
        }]);

    if (error) {
        alert("Error al enviar pedido: " + error.message);
    } else {
        alert("¡Pedido enviado con éxito!");
        localStorage.removeItem('pinol_cart'); // Limpiamos carrito
        window.location.href = 'tracking.html'; // Vamos al mapa
    }
}

document.addEventListener('DOMContentLoaded', cargarResumen);
