import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Users, Plus, Trash2, Play, LogOut, Crown, AlertCircle, Trophy } from 'lucide-react';
import { QuizRoyalLogo } from './quiz-royal-logo';

const avatarColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
];

export function GameLobby({ user, onStartGame, onLogout }) {
	const [playerName, setPlayerName] = useState('');
	const [players, setPlayers] = useState([]);
	const [gameMode, setGameMode] = useState('casual');

	const addPlayer = () => {
		if (playerName.trim() && players.length < 8) {
			const newPlayer = {
				id: crypto.randomUUID(),
				name: playerName.trim(),
				score: 0,
				avatar: avatarColors[players.length % avatarColors.length],
			};
			setPlayers([...players, newPlayer]);
			setPlayerName('');
		}
	};

	const addCurrentUser = () => {
		if (players.length < 8 && !players.some(p => p.id === user.id)) {
			const newPlayer = {
				id: user.id,
				name: user.name,
				score: 0,
				avatar: avatarColors[players.length % avatarColors.length],
			};
			setPlayers([...players, newPlayer]);
		}
	};

	const removePlayer = (id) => {
		setPlayers(players.filter(p => p.id !== id));
	};

  const handleStartGame = () => {
    if (players.length >= 1) {
      // Guests can't play ranked
      if (user.isGuest && gameMode === 'ranked') {
        return;
      }
      onStartGame(players);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with user info */}
      <div className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 border-2 border-white shadow-lg">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className={`${user.isGuest ? 'bg-gray-600' : 'bg-blue-700'} text-white`}>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white flex items-center gap-2">
              <span className="drop-shadow">{user.name}</span>
              {user.isGuest && (
                <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur">
                  Invitado
                </Badge>
              )}
            </div>
            {!user.isGuest && (
              <div className="text-sm text-white/80 drop-shadow">{user.email}</div>
            )}
          </div>
        </div>
        <Button 
          onClick={onLogout} 
          variant="outline" 
          className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur rounded-xl"
        >
          <LogOut className="size-4 mr-2" />
          Salir
        </Button>
      </div>

      {/* Guest Warning */}
      {user.isGuest && (
        <Alert className="mb-6 bg-yellow-50/95 border-yellow-200 rounded-2xl backdrop-blur shadow-lg">
          <AlertCircle className="size-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Estás jugando como invitado. No se guardará tu progreso ni podrás jugar modo ranked. 
            <button onClick={onLogout} className="underline ml-1 hover:text-yellow-900">Crea una cuenta</button> para desbloquear todas las funciones.
          </AlertDescription>
        </Alert>
      )}

      <div className="text-center mb-8">
        <div className="mb-4">
          <QuizRoyalLogo size="large" className="mx-auto drop-shadow-2xl" />
        </div>
        <p className="text-xl text-white/90 drop-shadow">Prepara tu partida</p>
      </div>

      <Card className="p-8 bg-white/98 backdrop-blur-xl shadow-2xl border-0 rounded-2xl">
        {/* Game Mode Selection */}
        <div className="mb-8">
          <h3 className="text-sm mb-3 text-gray-600 uppercase tracking-wide">Modo de Juego</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setGameMode('casual')}
              variant={gameMode === 'casual' ? 'default' : 'outline'}
              className={`h-20 rounded-xl text-base transition-all ${
                gameMode === 'casual' 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <Users className="size-6" />
                <span>Casual</span>
              </div>
            </Button>
            <Button
              onClick={() => !user.isGuest && setGameMode('ranked')}
              variant={gameMode === 'ranked' ? 'default' : 'outline'}
              disabled={user.isGuest}
              className={`h-20 rounded-xl text-base transition-all ${
                gameMode === 'ranked' 
                  ? 'bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg shadow-amber-500/30' 
                  : 'border-gray-200 hover:bg-gray-50'
              } ${user.isGuest ? 'opacity-50' : ''}`}
            >
              <div className="flex flex-col items-center gap-1">
                <Trophy className="size-6" />
                <span>Ranked {user.isGuest && '🔒'}</span>
              </div>
            </Button>
          </div>
          {gameMode === 'ranked' && !user.isGuest && (
            <p className="text-xs text-gray-600 mt-3 text-center bg-amber-50 py-2 px-3 rounded-lg border border-amber-200">
              💎 Tus puntuaciones se guardarán en el ranking global
            </p>
          )}
        </div>

        <Separator className="my-8 bg-gray-200" />

        <div className="flex items-center gap-2 mb-6">
          <div className="size-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center shadow-lg">
            <Users className="size-5 text-white" />
          </div>
          <h2 className="text-2xl tracking-tight">Sala de Espera</h2>
        </div>

        <div className="space-y-5">
          {/* Add current user button */}
          {!players.some(p => p.id === user.id) && players.length < 8 && (
            <Button
              onClick={addCurrentUser}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="size-5 mr-2" />
              Unirme a la Partida
            </Button>
          )}

          {/* Add other players */}
          <div>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Nombre del jugador"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                maxLength={20}
                className="flex-1 h-12 rounded-xl border-gray-200 focus:border-blue-700 focus:ring-blue-700"
              />
              <Button 
                onClick={addPlayer}
                disabled={!playerName.trim() || players.length >= 8}
                className="bg-blue-700 hover:bg-blue-800 h-12 px-6 rounded-xl shadow-lg"
              >
                <Plus className="size-5 mr-2" />
                Agregar
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
              <p className="text-sm text-gray-600">
                {players.length}/8 jugadores
              </p>
              {players.length >= 8 && (
                <p className="text-xs text-orange-600">Sala llena</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {players.length === 0 ? (
              <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <Users className="size-12 mx-auto mb-3 text-gray-300" />
                <p>Agrega al menos 1 jugador para comenzar</p>
              </div>
            ) : (
              players.map((player, index) => (
                <div 
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-11 rounded-xl ${player.avatar} flex items-center justify-center text-white shadow-md`}>
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{player.name}</span>
                        {player.id === user.id && (
                          <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50">
                            Tú
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">Jugador {index + 1}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePlayer(player.id)}
                    className="hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {players.length >= 1 && (
            <Button 
              onClick={handleStartGame}
              disabled={user.isGuest && gameMode === 'ranked'}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-lg h-14 rounded-xl shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40 transition-all"
            >
              <Play className="size-5 mr-2" />
              Comenzar Juego {gameMode === 'ranked' ? 'Ranked' : 'Casual'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}