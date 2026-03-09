// Este archivo es el corazón de la conexión
const supabaseUrl = 'https://TU_PROYECTO.supabase.co'; // Lo sacas de Settings en Supabase
const supabaseKey = 'TU_ANON_KEY'; // Es una cadena larga de letras y números

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log("PinolApp conectada a la base de datos");
