// restaurant/js/supabase-config.js
const SUPABASE_URL = "TU_URL_DE_SUPABASE";
const SUPABASE_KEY = "TU_KEY_ANON_DE_SUPABASE";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Exportar para que otros archivos lo usen si es necesario
console.log("PinolApp: Conexión con Supabase lista en Restaurante");
