// ============================================
// TIPOS COMPARTIDOS - Quiz Royal
// ============================================

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'email' | 'google' | 'guest'} provider
 * @property {string} [avatar]
 * @property {boolean} [isGuest]
 */

/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} name
 * @property {number} score
 * @property {string} avatar
 * @property {Answer[]} [answers]
 */

/**
 * @typedef {Object} Answer
 * @property {number} questionId
 * @property {string} answer
 * @property {boolean} isCorrect
 * @property {number} timeSpent
 */

/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} question
 * @property {string[]} options
 * @property {string} correctAnswer
 * @property {string} [category]
 * @property {'easy' | 'medium' | 'hard'} [difficulty]
 */

/**
 * @typedef {'casual' | 'ranked'} GameMode
 */

/**
 * @typedef {'login' | 'lobby' | 'game' | 'results'} GameScreen
 */

/**
 * @typedef {Object} GameState
 * @property {GameScreen} currentScreen
 * @property {User | null} user
 * @property {Player[]} players
 * @property {GameMode} gameMode
 * @property {number} currentQuestion
 * @property {Question[]} questions
 * @property {number} timeRemaining
 */

