// admin/js/admin-repartidores.js

async function cargarRepartidores() {
    const { data: drivers, error } = await _supabase
        .from('repartidores')
        .select('*');

    if (error) return;

    const tabla = document.getElementById('tabla-repartidores');
    let onlineCount = 0;

    tabla.innerHTML = drivers.map(d => {
        if(d.online) onlineCount++;
        return `
        <tr>
            <td>
                <div class="user-info">
                    <strong>${d.nombre}</strong><br>
                    <small>${d.email}</small>
                </div>
            </td>
            <td>${d.vehiculo || 'Motocicleta'}</td>
            <td>${d.telefono}</td>
            <td>
                <span class="status-pill ${d.online ? 'online' : 'offline'}">
                    ${d.online ? 'En Línea' : 'Desconectado'}
                </span>
            </td>
            <td>
                <button class="btn-view" onclick="verUbicacion('${d.id}')">📍 Ver Mapa</button>
                <button class="btn-block" onclick="suspender('${d.id}')">🚫</button>
            </td>
        </tr>
    `;}).join('');

    document.getElementById('count-online').innerText = onlineCount;
}

document.addEventListener('DOMContentLoaded', cargarRepartidores);
