// ============================================
// HOOK: Submit de autenticación
// ============================================

import { useState } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ERROR_MESSAGES } from '../constants';

export function useAuthSubmit({ onLogin }) {
	const [loading, setLoading] = useState(false);

	const signUp = async (email, password, name) => {
		const response = await fetch(
			`https://${projectId}.supabase.co/functions/v1/make-server-17cbebac/auth/signup`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${publicAnonKey}`,
				},
				body: JSON.stringify({ email, password, name }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || ERROR_MESSAGES.SIGNUP_FAILED);
		}

		// Now sign in
		const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (signInError) throw signInError;

		return {
			id: signInData.user.id,
			email: signInData.user.email || '',
			name: signInData.user.user_metadata?.name || name,
			avatar: signInData.user.user_metadata?.avatar_url,
			provider: 'email',
			isGuest: false,
		};
	};

	const signIn = async (email, password) => {
		const { data, error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (signInError) throw signInError;

		return {
			id: data.user.id,
			email: data.user.email || '',
			name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuario',
			avatar: data.user.user_metadata?.avatar_url,
			provider: data.user.app_metadata?.provider || 'email',
			isGuest: false,
		};
	};

	const handleAuth = async (isSignUp, email, password, name) => {
		setLoading(true);

		try {
			const userData = isSignUp
				? await signUp(email, password, name)
				: await signIn(email, password);

			onLogin(userData);
			return null;
		} catch (err) {
			console.error('Auth error:', err);
			return err.message || ERROR_MESSAGES.AUTH_FAILED;
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		handleAuth,
	};
}

