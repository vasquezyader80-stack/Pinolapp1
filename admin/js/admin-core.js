async function cargarEstadisticas() {
    // 1. Obtener total de ventas hoy
    const { data: pedidos } = await _supabase
        .from('pedidos')
        .select('total, estado');

    let sumaTotal = 0;
    let activos = 0;

    pedidos.forEach(p => {
        sumaTotal += p.total;
        if(p.estado !== 'Entregado') activos++;
    });

    document.getElementById('total-ventas').innerText = `C$ ${sumaTotal.toFixed(2)}`;
    document.getElementById('pedidos-hoy').innerText = activos;

    // 2. Llenar tabla de pedidos recientes
    const tableBody = document.querySelector('#tabla-pedidos tbody');
    tableBody.innerHTML = pedidos.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td>Negocio Local</td>
            <td>C$ ${p.total}</td>
            <td style="color: ${p.estado === 'Cancelado' ? 'red' : 'green'}">${p.estado}</td>
        </tr>
    `).join('');
}

// Seguridad: Si no es el admin Yader, lo saca del panel
function verificarAccesoAdmin() {
    const userRole = localStorage.getItem('user_role');
    if (userRole !== 'super_admin') {
        window.location.href = '../client/login.html';
    }
}

cargarEstadisticas();
