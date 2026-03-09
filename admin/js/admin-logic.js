// admin/js/admin-logic.js

async function cargarEstadisticas() {
    // 1. Sumar ventas totales del día
    const { data: pedidos, error } = await _supabase
        .from('pedidos')
        .select('total, estado');

    if (error) return;

    let ventasHoy = 0;
    let activos = 0;

    pedidos.forEach(p => {
        if(p.estado !== 'Entregado') activos++;
        ventasHoy += p.total;
    });

    document.getElementById('total-ventas').innerText = `C$ ${ventasHoy.toFixed(2)}`;
    document.getElementById('pedidos-activos').innerText = activos;
    
    renderizarTabla(pedidos);
}

function renderizarTabla(pedidos) {
    const tabla = document.getElementById('lista-global-pedidos');
    tabla.innerHTML = pedidos.slice(0, 10).map(p => `
        <tr>
            <td>#${p.id.slice(0,5)}</td>
            <td>Negocio Local</td>
            <td>C$ ${p.total}</td>
            <td><span class="badge ${p.estado}">${p.estado}</span></td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', cargarEstadisticas);
