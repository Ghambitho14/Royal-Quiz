/**
 * Backend Index
 * Punto de entrada para todos los servicios del backend
 */

// Exportar configuración
export { supabase, supabaseAdmin } from './config/supabase.js';

// Exportar servicios
export * from './services/auth.js';
export * from './services/user.js';
export * from './services/quiz.js';

// Exportar utilidades
export * from './utils/helpers.js';

