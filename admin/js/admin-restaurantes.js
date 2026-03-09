// admin/js/admin-restaurantes.js

async function cargarLocales() {
    const { data: locales, error } = await _supabase
        .from('restaurantes')
        .select('*');

    if (error) return;

    const tabla = document.getElementById('tabla-restaurantes');
    tabla.innerHTML = locales.map(res => `
        <tr>
            <td><strong>${res.nombre}</strong></td>
            <td>${res.categoria}</td>
            <td>${res.ciudad || 'León'}</td>
            <td><span class="status-pill ${res.activo ? 'online' : 'offline'}">
                ${res.activo ? 'Activo' : 'Pausado'}
            </span></td>
            <td>
                <button onclick="toggleEstado('${res.id}', ${res.activo})">
                    ${res.activo ? 'Desactivar' : 'Activar'}
                </button>
            </td>
        </tr>
    `).join('');
}

async function toggleEstado(id, estadoActual) {
    const { error } = await _supabase
        .from('restaurantes')
        .update({ activo: !estadoActual })
        .eq('id', id);

    if (!error) cargarLocales();
}

document.addEventListener('DOMContentLoaded', cargarLocales);
