// client/js/supabase-config.js

// Reemplaza con tus datos reales de Supabase
const supabaseUrl = 'https://tu-proyecto.supabase.co';
const supabaseKey = 'tu-anon-key-de-supabase';

// Inicializamos el cliente para que el resto de archivos lo usen
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log("PinolApp: Conexión con Supabase establecida.");
