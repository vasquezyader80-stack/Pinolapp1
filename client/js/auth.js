// client/js/auth.js
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Error: " + error.message);
    } else {
        // Guardamos el nombre para que diga "Hola, [Nombre]" en el home
        localStorage.setItem('user_name', data.user.user_metadata.full_name || 'Nica');
        window.location.href = 'home.html';
    }
});
