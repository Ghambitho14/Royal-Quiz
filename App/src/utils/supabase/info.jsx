// Supabase configuration from environment variables
// Variables must be prefixed with VITE_ to be exposed in Vite

export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || '';
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate that environment variables are set
if (!projectId || !publicAnonKey) {
	console.warn('⚠️ Supabase environment variables are not set. Please check your .env file.');
}

