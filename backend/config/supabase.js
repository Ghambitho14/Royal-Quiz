import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno (compatible con Vite y Node.js)
const getEnvVar = (key) => {
	if (typeof import.meta !== 'undefined' && import.meta.env) {
		return import.meta.env[key];
	}
	if (typeof process !== 'undefined' && process.env) {
		return process.env[key];
	}
	return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');
const supabaseServiceKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

// Validar que las variables estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Faltan las variables de entorno de Supabase. Por favor, asegúrate de tener VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'
	);
}

// Cliente de Supabase para el frontend (con ANON KEY)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storageKey: 'quiz-royal-auth',
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	}
});

// Cliente de Supabase para el backend (con SERVICE ROLE KEY) - Solo si está disponible
export const supabaseAdmin = supabaseServiceKey 
	? createClient(supabaseUrl, supabaseServiceKey, {
			auth: {
				autoRefreshToken: false,
				persistSession: false
			}
		})
	: null;

