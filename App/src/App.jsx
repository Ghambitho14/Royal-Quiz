import { useState, useEffect } from 'react';
import { LoginScreen } from './components/login-screen';
import { GameLobby } from './components/game-lobby';
import { QuestionGame } from './components/question-game';
import { GameResults } from './components/game-results';
import { LoadingSpinner } from './common';
import { supabase } from './utils/supabase/client';


export default function App() {
	const [gameState, setGameState] = useState('login');
	const [user, setUser] = useState(null);
	const [players, setPlayers] = useState([]);
	const [currentRound, setCurrentRound] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check for existing session
		checkSession();
	}, []);

	const checkSession = async () => {
		try {
			const { data: { session } } = await supabase.auth.getSession();
			
			if (session?.user) {
				const userData = {
					id: session.user.id,
					email: session.user.email || '',
					name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuario',
					avatar: session.user.user_metadata?.avatar_url,
					provider: session.user.app_metadata?.provider || 'email',
					isGuest: false,
				};
				setUser(userData);
				setGameState('lobby');
			}
		} catch (error) {
			// Silent error handling
		} finally {
			setLoading(false);
		}
	};

	const handleLogin = (userData) => {
		setUser(userData);
		setGameState('lobby');
	};

	const handleGuestLogin = () => {
		const guestUser = {
			id: `guest-${crypto.randomUUID()}`,
			email: '',
			name: 'Invitado',
			provider: 'guest',
			isGuest: true,
		};
		setUser(guestUser);
		setGameState('lobby');
	};

	const handleLogout = async () => {
		try {
			if (user && !user.isGuest) {
				await supabase.auth.signOut();
			}
			setUser(null);
			setGameState('login');
			setPlayers([]);
			setCurrentRound(0);
		} catch (error) {
			// Silent error handling
		}
	};

	const startGame = (gamePlayers) => {
		setPlayers(gamePlayers);
		setCurrentRound(0);
		setGameState('playing');
	};

	const endGame = (finalPlayers) => {
		setPlayers(finalPlayers);
		setGameState('results');
	};

	const resetGame = () => {
		setPlayers([]);
		setCurrentRound(0);
		setGameState('lobby');
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-linear-to-br from-blue-700 via-blue-800 to-blue-900 flex items-center justify-center">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
			{/* Spotlight effects */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Spotlight 1 - Blue */}
				<div 
					className="spotlight-1 absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-3xl"
					style={{
						background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%)',
					}}
				/>
				
				{/* Spotlight 2 - Gold */}
				<div 
					className="spotlight-2 absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl"
					style={{
						background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0) 70%)',
					}}
				/>
				
				{/* Spotlight 3 - Light Blue */}
				<div 
					className="spotlight-3 absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
					style={{
						background: 'radial-gradient(circle, rgba(96, 165, 250, 0.35) 0%, rgba(96, 165, 250, 0) 70%)',
					}}
				/>
			</div>

			{/* Background doodles with blur */}
			<div 
				className="absolute inset-0 opacity-20 blur-sm"
				style={{
					backgroundImage: 'url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<div className="absolute inset-0 bg-linear-to-br from-blue-700/80 via-blue-800/80 to-blue-900/80" />
			
			<div className="container mx-auto px-4 py-8 relative z-10">
				{gameState === 'login' && (
					<LoginScreen onLogin={handleLogin} onGuestLogin={handleGuestLogin} />
				)}
				
				{gameState === 'lobby' && user && (
					<GameLobby 
						user={user} 
						onStartGame={startGame} 
						onLogout={handleLogout}
					/>
				)}
				
				{gameState === 'playing' && (
					<QuestionGame 
						players={players} 
						onGameEnd={endGame}
						onUpdatePlayers={setPlayers}
					/>
				)}
				
				{gameState === 'results' && (
					<GameResults 
						players={players} 
						onPlayAgain={resetGame}
					/>
				)}
			</div>
		</div>
	);
}
