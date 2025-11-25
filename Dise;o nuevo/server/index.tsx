import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Health check
app.get('/make-server-17cbebac/health', (c) => {
  return c.json({ status: 'ok', message: 'Quiz Royal server is running' });
});

// Sign up route
app.post('/make-server-17cbebac/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email y contraseña son requeridos' }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'El email no es válido. Verifica el formato.' }, 400);
    }

    // Validate password length
    if (password.length < 6) {
      return c.json({ error: 'La contraseña debe tener al menos 6 caracteres.' }, 400);
    }

    // Create user with Supabase Admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || email.split('@')[0] },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      // Handle specific error cases
      let errorMessage = error.message;
      
      if (error.message.includes('already registered') || error.message.includes('User already registered')) {
        errorMessage = 'Este email ya está registrado. Intenta iniciar sesión.';
      } else if (error.message.includes('invalid email')) {
        errorMessage = 'El email no es válido. Verifica el formato.';
      } else if (error.message.includes('password')) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      }
      
      return c.json({ error: errorMessage }, 400);
    }

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      }
    });
  } catch (error: any) {
    return c.json({ error: error.message || 'Error al crear la cuenta' }, 500);
  }
});

Deno.serve(app.fetch);