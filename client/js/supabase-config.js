const supabaseUrl = 'https://xcfebmqpcshkrfascaqb.supabase.co';
const supabaseKey = 'sb_publishable_C7hmzFXYzmkKBN0N5vFF2Q_a3ONnTxf';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Esto nos avisará en la consola del navegador si la conexión es exitosa
console.log("PinolApp conectada exitosamente a la base de datos.");
