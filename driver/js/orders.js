// Lógica para que el repartidor vea los pedidos de León/Chinandega
async function verNuevosPedidos() {
    const res = await fetch('../../api/repartidores.php');
    const datos = await res.json();
    // Aquí pintás los pedidos en el HTML
}
