import { useState } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { createUserFromAuthData, mapErrorToField } from '../utils/auth-helpers';
import { VALIDATION_MESSAGES } from '../constants/validation';

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
			const errorMsg = data.error || '';
			const field = mapErrorToField(errorMsg);
			return { success: false, fieldErrors: { [field]: errorMsg } };
		}

		// Auto sign-in after signup
		const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (signInError) {
			return { 
				success: false, 
				fieldErrors: { email: VALIDATION_MESSAGES.SIGNUP_AUTO_LOGIN_ERROR } 
			};
		}

		const user = createUserFromAuthData(signInData.user, name);
		return { success: true, user };
	};

	const signIn = async (email, password) => {
		const { data, error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (signInError) {
			return { 
				success: false, 
				fieldErrors: { password: VALIDATION_MESSAGES.INVALID_CREDENTIALS } 
			};
		}

		const user = createUserFromAuthData(data.user);
		return { success: true, user };
	};

	const handleAuth = async (
		isSignUp,
		email,
		password,
		name
	) => {
		setLoading(true);

		try {
			const result = isSignUp
				? await signUp(email, password, name)
				: await signIn(email, password);

			if (result.success && result.user) {
				onLogin(result.user);
			}

			return result;
		} catch (err) {
			return { 
				success: false, 
				fieldErrors: { email: VALIDATION_MESSAGES.UNEXPECTED_ERROR } 
			};
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		handleAuth,
	};
}

