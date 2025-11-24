import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Users, Plus, Trash2, Play, LogOut, Crown, AlertCircle, Trophy } from 'lucide-react';
import { QuizRoyalLogo } from './quiz-royal-logo';
import type { Player, User } from '../types';

interface GameLobbyProps {
  user: User;
  onStartGame: (players: Player[]) => void;
  onLogout: () => void;
}

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

export function GameLobby({ user, onStartGame, onLogout }: GameLobbyProps) {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameMode, setGameMode] = useState<'casual' | 'ranked'>('casual');

  const addPlayer = () => {
    if (playerName.trim() && players.length < 8) {
      const newPlayer: Player = {
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
      const newPlayer: Player = {
        id: user.id,
        name: user.name,
        score: 0,
        avatar: avatarColors[players.length % avatarColors.length],
      };
      setPlayers([...players, newPlayer]);
    }
  };

  const removePlayer = (id: string) => {
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
    <div className="max-w-3xl mx-auto p-4">
      {/* Header with user info - Improved glassmorphism */}
      <div className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-5 shadow-2xl shadow-blue-900/20">
        <div className="flex items-center gap-4">
          <Avatar className="size-14 border-2 border-amber-400/50 shadow-xl ring-2 ring-white/20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className={`${user.isGuest ? 'bg-gradient-to-br from-gray-600 to-gray-700' : 'bg-gradient-to-br from-blue-700 to-blue-900'} text-white text-lg`}>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white flex items-center gap-2">
              <span className="drop-shadow-lg text-lg">{user.name}</span>
              {user.isGuest && (
                <Badge variant="outline" className="bg-white/25 text-white border-white/40 backdrop-blur text-xs">
                  Invitado
                </Badge>
              )}
            </div>
            {!user.isGuest && (
              <div className="text-sm text-white/90 drop-shadow">{user.email}</div>
            )}
          </div>
        </div>
        <Button 
          onClick={onLogout} 
          variant="outline" 
          className="bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur rounded-xl hover:scale-105 transition-transform shadow-lg"
        >
          <LogOut className="size-4 mr-2" />
          Salir
        </Button>
      </div>

      {/* Guest Warning - Improved design */}
      {user.isGuest && (
        <Alert className="mb-6 bg-gradient-to-r from-yellow-50/98 to-amber-50/98 border-2 border-yellow-300/50 rounded-2xl backdrop-blur-xl shadow-xl shadow-yellow-500/10">
          <AlertCircle className="size-5 text-yellow-600" />
          <AlertDescription className="text-yellow-900">
            Estás jugando como invitado. No se guardará tu progreso ni podrás jugar modo ranked. 
            <button onClick={onLogout} className="underline ml-1 font-semibold hover:text-yellow-950 transition-colors">Crea una cuenta</button> para desbloquear todas las funciones.
          </AlertDescription>
        </Alert>
      )}

      {/* Logo and title - Enhanced */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <QuizRoyalLogo size="large" className="mx-auto drop-shadow-2xl filter" />
        </div>
        <p className="text-2xl text-white/95 drop-shadow-lg tracking-tight">Prepara tu partida</p>
      </div>

      <Card className="p-8 bg-white/98 backdrop-blur-2xl shadow-2xl border-0 rounded-3xl overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 via-purple-600 to-amber-500"></div>
        
        {/* Game Mode Selection - Enhanced */}
        <div className="mb-8">
          <h3 className="text-sm mb-4 text-gray-600 uppercase tracking-wider font-semibold flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-blue-700"></div>
            Modo de Juego
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setGameMode('casual')}
              variant={gameMode === 'casual' ? 'default' : 'outline'}
              className={`h-24 rounded-2xl text-base transition-all duration-300 ${
                gameMode === 'casual' 
                  ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-xl shadow-blue-700/40 scale-105 border-2 border-blue-400/30' 
                  : 'border-2 border-gray-200 hover:bg-gray-50 hover:border-blue-300 hover:scale-102'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Users className="size-7" />
                <span className="font-semibold">Casual</span>
                <span className="text-xs opacity-80">Sin presión</span>
              </div>
            </Button>
            <Button
              onClick={() => !user.isGuest && setGameMode('ranked')}
              variant={gameMode === 'ranked' ? 'default' : 'outline'}
              disabled={user.isGuest}
              className={`h-24 rounded-2xl text-base transition-all duration-300 ${
                gameMode === 'ranked' 
                  ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:via-amber-700 hover:to-yellow-700 shadow-xl shadow-amber-500/40 scale-105 border-2 border-amber-400/30' 
                  : 'border-2 border-gray-200 hover:bg-gray-50 hover:border-amber-300 hover:scale-102'
              } ${user.isGuest ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center gap-2">
                <Trophy className="size-7" />
                <span className="font-semibold">Ranked {user.isGuest && '🔒'}</span>
                <span className="text-xs opacity-80">Competitivo</span>
              </div>
            </Button>
          </div>
          {gameMode === 'ranked' && !user.isGuest && (
            <div className="mt-4 text-center bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 py-3 px-4 rounded-xl border-2 border-amber-300/50 shadow-sm">
              <p className="text-sm text-amber-900 font-medium flex items-center justify-center gap-2">
                <Crown className="size-4 text-amber-600" />
                Tus puntuaciones se guardarán en el ranking global
              </p>
            </div>
          )}
        </div>

        <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Waiting room header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 flex items-center justify-center shadow-lg shadow-blue-700/30 ring-2 ring-blue-400/20">
            <Users className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl tracking-tight font-semibold">Sala de Espera</h2>
            <p className="text-sm text-gray-600">Agrega jugadores para comenzar</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Add current user button - Enhanced */}
          {!players.some(p => p.id === user.id) && players.length < 8 && (
            <Button
              onClick={addCurrentUser}
              className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-900 hover:to-blue-950 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-blue-600/30"
            >
              <Plus className="size-5 mr-2" />
              Unirme a la Partida
            </Button>
          )}

          {/* Add other players - Enhanced */}
          <div>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Nombre del jugador"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                maxLength={20}
                className="flex-1 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 transition-all"
              />
              <Button 
                onClick={addPlayer}
                disabled={!playerName.trim() || players.length >= 8}
                className="bg-blue-700 hover:bg-blue-800 h-12 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="size-5 mr-2" />
                Agregar
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-sm text-gray-600 font-medium">
                {players.length}/8 jugadores
              </p>
              {players.length >= 8 && (
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                  Sala llena
                </Badge>
              )}
            </div>
          </div>

          {/* Players list - Enhanced cards */}
          <div className="space-y-3">
            {players.length === 0 ? (
              <div className="text-center py-16 text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border-2 border-dashed border-gray-200">
                <Users className="size-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-1">Sala vacía</p>
                <p className="text-sm">Agrega al menos 1 jugador para comenzar</p>
              </div>
            ) : (
              players.map((player, index) => (
                <div 
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border-2 border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-xl ${player.avatar} flex items-center justify-center text-white text-lg shadow-md ring-2 ring-white/50 font-semibold`}>
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{player.name}</span>
                        {player.id === user.id && (
                          <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 bg-purple-50">
                            Tú
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">Jugador #{index + 1}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePlayer(player.id)}
                    className="hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Start game button - Enhanced */}
          {players.length >= 1 && (
            <Button 
              onClick={handleStartGame}
              disabled={user.isGuest && gameMode === 'ranked'}
              className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-900 hover:to-blue-950 text-lg h-16 rounded-2xl shadow-xl shadow-blue-700/40 hover:shadow-2xl hover:shadow-blue-700/50 transition-all hover:scale-[1.02] font-semibold"
            >
              <Play className="size-6 mr-2" />
              Comenzar Juego {gameMode === 'ranked' ? 'Ranked' : 'Casual'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}