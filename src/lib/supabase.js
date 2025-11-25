import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que las variables estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Faltan las variables de entorno de Supabase. Por favor, asegúrate de tener VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'
	);
}

// Crear y exportar el cliente de Supabase con ANON KEY
// Este es el cliente que debe usarse en el frontend para autenticación
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storageKey: 'quiz-royal-auth',
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	}
});

