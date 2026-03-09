// Configuración de conexión única para PinolApp
const supabaseUrl = 'TU_URL_DE_SUPABASE';
const supabaseKey = 'TU_LLAVE_ANON_KEY';

// Inicializamos el cliente de Supabase
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Función global para formatear a moneda local de Nicaragua
function formatCordobas(monto) {
    return new Intl.NumberFormat('es-NI', {
        style: 'currency',
        currency: 'NIO',
    }).format(monto);
}
