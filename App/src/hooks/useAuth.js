// ============================================
// HOOK: Autenticación
// ============================================

import { useState } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ERROR_MESSAGES } from '../constants';

export function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const signUp = async (email, password, name) => {
		setLoading(true);
		setError('');

		try {
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

			const userData = {
				id: signInData.user.id,
				email: signInData.user.email || '',
				name: signInData.user.user_metadata?.name || name,
				avatar: signInData.user.user_metadata?.avatar_url,
				provider: 'email',
				isGuest: false,
			};

			return userData;
		} catch (err) {
			console.error('Sign up error:', err);
			setError(err.message || ERROR_MESSAGES.SIGNUP_FAILED);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const signIn = async (email, password) => {
		setLoading(true);
		setError('');

		try {
			const { data, error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (signInError) throw signInError;

			const userData = {
				id: data.user.id,
				email: data.user.email || '',
				name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuario',
				avatar: data.user.user_metadata?.avatar_url,
				provider: data.user.app_metadata?.provider || 'email',
				isGuest: false,
			};

			return userData;
		} catch (err) {
			console.error('Sign in error:', err);
			setError(err.message || ERROR_MESSAGES.SIGNIN_FAILED);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const signOut = async () => {
		try {
			await supabase.auth.signOut();
		} catch (err) {
			console.error('Sign out error:', err);
			setError(err.message || ERROR_MESSAGES.AUTH_FAILED);
		}
	};

	const signInAsGuest = () => {
		const guestUser = {
			id: `guest-${crypto.randomUUID()}`,
			email: '',
			name: 'Invitado',
			avatar: null,
			provider: 'guest',
			isGuest: true,
		};
		return guestUser;
	};

	const checkSession = async () => {
		try {
			const { data: { session } } = await supabase.auth.getSession();
			
			if (session?.user) {
				return {
					id: session.user.id,
					email: session.user.email || '',
					name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuario',
					avatar: session.user.user_metadata?.avatar_url,
					provider: session.user.app_metadata?.provider || 'email',
					isGuest: false,
				};
			}
			return null;
		} catch (err) {
			console.error('Check session error:', err);
			return null;
		}
	};

	return {
		loading,
		error,
		setError,
		signUp,
		signIn,
		signOut,
		signInAsGuest,
		checkSession,
	};
}

