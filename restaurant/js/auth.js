// restaurant/js/auth.js
const authRestaurante = {
    // Función para iniciar sesión
    async login(email, password) {
        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert("Error: Credenciales incorrectas para el negocio.");
            return;
        }

        // Guardamos el ID del restaurante para filtrar sus pedidos después
        localStorage.setItem('restaurant_id', data.user.id);
        window.location.href = 'dashboard.html';
    },

    // Función para cerrar sesión
    async logout() {
        await _supabase.auth.signOut();
        localStorage.removeItem('restaurant_id');
        window.location.href = 'login.html';
    },

    // Validar que el usuario esté logueado al cargar el dashboard
    checkSession() {
        const restoId = localStorage.getItem('restaurant_id');
        if (!restoId) {
            window.location.href = 'login.html';
        }
    }
};

// Ejecutar validación de inmediato
authRestaurante.checkSession();
