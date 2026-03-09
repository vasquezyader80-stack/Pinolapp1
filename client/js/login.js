async function iniciarSesion(email, password) {
    // Conecta con tu api/login.php
    const response = await fetch('../api/login.php', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
        // Guardamos los datos para que aparezcan en el Home
        localStorage.setItem('user_name', data.nombre);
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('user_city', data.ciudad); // Chinandega, León o Managua
        
        window.location.href = 'home.html';
    } else {
        alert("Error: " + data.message);
    }
}
