import { supabase } from '../config/supabase.js';

/**
 * Servicio de Quiz
 * Maneja todas las operaciones relacionadas con quizzes
 */

/**
 * Obtener todos los quizzes
 */
export const getQuizzes = async () => {
	try {
		const { data, error } = await supabase
			.from('quizzes')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			throw error;
		}

		return {
			success: true,
			quizzes: data
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al obtener quizzes'
		};
	}
};

/**
 * Obtener un quiz por ID
 */
export const getQuizById = async (quizId) => {
	try {
		const { data, error } = await supabase
			.from('quizzes')
			.select('*')
			.eq('id', quizId)
			.single();

		if (error) {
			throw error;
		}

		return {
			success: true,
			quiz: data
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al obtener el quiz'
		};
	}
};

/**
 * Guardar resultado de quiz
 */
export const saveQuizResult = async (userId, quizId, score, answers) => {
	try {
		const { data, error } = await supabase
			.from('quiz_results')
			.insert({
				user_id: userId,
				quiz_id: quizId,
				score,
				answers,
				completed_at: new Date().toISOString()
			})
			.select()
			.single();

		if (error) {
			throw error;
		}

		return {
			success: true,
			result: data
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al guardar el resultado'
		};
	}
};

/**
 * Obtener estadísticas del usuario
 */
export const getUserStats = async (userId) => {
	try {
		const { data, error } = await supabase
			.from('quiz_results')
			.select('*')
			.eq('user_id', userId);

		if (error) {
			throw error;
		}

		const quizzesCompleted = data.length;
		const totalPoints = data.reduce((sum, result) => sum + (result.score || 0), 0);
		const averageScore = quizzesCompleted > 0 
			? Math.round((totalPoints / quizzesCompleted) * 100) / 100 
			: 0;

		return {
			success: true,
			stats: {
				quizzesCompleted,
				totalPoints,
				averageScore,
				correctAnswers: data.reduce((sum, result) => sum + (result.correct_answers || 0), 0)
			}
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al obtener estadísticas'
		};
	}
};

