// client/js/supabase-config.js

const supabaseUrl = 'https://tu-proyecto.supabase.co';
const supabaseKey = 'tu-anon-key-de-supabase';

// Inicializamos el cliente globalmente para que menu-loader lo use
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log("Conexión con Supabase lista.");
