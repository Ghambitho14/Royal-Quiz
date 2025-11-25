import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Trophy, Medal, Award, RotateCcw, Crown, Star, Target, Zap } from 'lucide-react';
import type { Player } from '../App';

interface GameResultsProps {
  players: Player[];
  onPlayAgain: () => void;
}

export function GameResults({ players, onPlayAgain }: GameResultsProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const totalScore = sortedPlayers.reduce((sum, p) => sum + p.score, 0);
  const avgScore = Math.round(totalScore / sortedPlayers.length);
  const highestScore = winner.score;

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="size-8 text-yellow-500 drop-shadow-lg" />;
      case 1:
        return <Medal className="size-8 text-gray-400 drop-shadow-md" />;
      case 2:
        return <Award className="size-8 text-orange-600 drop-shadow-md" />;
      default:
        return null;
    }
  };

  const getScoreRating = (score: number) => {
    if (score >= 1500) return { label: 'Legendario', color: 'text-purple-600', icon: '👑' };
    if (score >= 1200) return { label: 'Experto', color: 'text-yellow-600', icon: '⭐' };
    if (score >= 900) return { label: 'Avanzado', color: 'text-blue-600', icon: '🎯' };
    if (score >= 600) return { label: 'Intermedio', color: 'text-green-600', icon: '✨' };
    return { label: 'Principiante', color: 'text-gray-600', icon: '🌟' };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Winner celebration - Enhanced with floating elements */}
      <div className="text-center mb-8 animate-[fadeIn_0.8s_ease-out] relative">
        {/* Floating decorative elements */}
        <div className="absolute top-0 left-1/4 text-4xl animate-[float_3s_ease-in-out_infinite]">🎊</div>
        <div className="absolute top-10 right-1/4 text-4xl animate-[float_3s_ease-in-out_infinite] animation-delay-500">✨</div>
        <div className="absolute top-5 left-1/3 text-3xl animate-[float_3s_ease-in-out_infinite] animation-delay-1000">⭐</div>
        <div className="absolute top-5 right-1/3 text-3xl animate-[float_3s_ease-in-out_infinite] animation-delay-1500">💫</div>
        
        <div className="relative inline-block mb-6">
          <div className="text-8xl animate-bounce">🎊</div>
          <div className="absolute -top-4 -right-4 text-5xl animate-spin-slow">✨</div>
          <div className="absolute -bottom-4 -left-4 text-5xl animate-spin-slow animation-delay-500">⭐</div>
        </div>
        
        <h2 className="text-6xl text-white mb-4 drop-shadow-2xl font-bold tracking-tight animate-[pulse_2s_ease-in-out_infinite]">
          ¡Juego Terminado!
        </h2>
        
        <div className="bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-400/20 backdrop-blur-2xl border-2 border-amber-400/60 rounded-3xl px-8 py-5 inline-block shadow-2xl shadow-amber-500/30 animate-[slideUp_0.8s_ease-out]">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="size-8 text-amber-400 animate-pulse" />
            <p className="text-3xl text-white drop-shadow-lg font-bold">
              Ganador: <span className="text-amber-400">{winner.name}</span>
            </p>
            <Crown className="size-8 text-amber-400 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg">
            con {winner.score} puntos • {getScoreRating(winner.score).icon} {getScoreRating(winner.score).label}
          </p>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-xl border-2 border-blue-300 rounded-2xl text-center shadow-lg">
          <Trophy className="size-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-900">{highestScore}</div>
          <div className="text-sm text-blue-700">Mayor Puntuación</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-xl border-2 border-purple-300 rounded-2xl text-center shadow-lg">
          <Target className="size-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-900">{avgScore}</div>
          <div className="text-sm text-purple-700">Promedio</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 backdrop-blur-xl border-2 border-amber-300 rounded-2xl text-center shadow-lg">
          <Star className="size-8 text-amber-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-900">{totalScore}</div>
          <div className="text-sm text-amber-700">Puntos Totales</div>
        </Card>
      </div>

      <Card className="p-8 bg-white/98 backdrop-blur-2xl shadow-2xl border-0 rounded-3xl overflow-hidden">
        {/* Decorative gradient top bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600"></div>
        
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-xl animate-pulse">
            <Trophy className="size-8 text-white" />
          </div>
          <h3 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Tabla de Posiciones
          </h3>
        </div>

        {/* Podium - Top 3 with special design */}
        <div className="mb-8">
          {sortedPlayers.slice(0, 3).map((player, index) => {
            const rating = getScoreRating(player.score);
            const percentage = Math.round((player.score / highestScore) * 100);
            
            return (
              <div 
                key={player.id}
                className={`flex items-center gap-5 p-6 rounded-2xl transition-all mb-4 relative overflow-hidden ${
                  index === 0 
                    ? 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-400 shadow-2xl shadow-amber-500/30 scale-[1.03]' 
                    : index === 1
                    ? 'bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-2 border-gray-400 shadow-xl'
                    : 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-400 shadow-xl'
                }`}
              >
                {/* Progress bar background */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 transition-all ${
                    index === 0 ? 'bg-amber-200/30' : index === 1 ? 'bg-gray-200/30' : 'bg-orange-200/30'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>

                {/* Medal/Position */}
                <div className="flex items-center justify-center w-16 shrink-0 relative z-10">
                  {index === 0 ? (
                    <div className="relative">
                      <Trophy className="size-14 text-amber-500 drop-shadow-lg animate-pulse" />
                      <div className="absolute -top-2 -right-2 size-5 bg-amber-400 rounded-full animate-ping"></div>
                    </div>
                  ) : index === 1 ? (
                    <Medal className="size-12 text-gray-500 drop-shadow-md" />
                  ) : (
                    <Award className="size-12 text-orange-600 drop-shadow-md" />
                  )}
                </div>

                {/* Avatar */}
                <div className={`size-20 rounded-2xl ${player.avatar} flex items-center justify-center text-white text-3xl shadow-xl ring-4 ${
                  index === 0 ? 'ring-amber-300 animate-pulse' : index === 1 ? 'ring-gray-300' : 'ring-orange-300'
                } font-bold relative z-10`}>
                  {player.name.charAt(0).toUpperCase()}
                </div>

                {/* Player info */}
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold">{player.name}</span>
                    {index === 0 && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-md border-0 text-sm">
                        👑 Campeón
                      </Badge>
                    )}
                    {index === 1 && (
                      <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md border-0 text-sm">
                        🥈 2º Lugar
                      </Badge>
                    )}
                    {index === 2 && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md border-0 text-sm">
                        🥉 3º Lugar
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600 font-medium">
                      {player.score} puntos totales
                    </div>
                    <Badge variant="outline" className={`${rating.color} border-current text-xs`}>
                      {rating.icon} {rating.label}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {percentage}% del máximo
                    </div>
                  </div>
                </div>

                {/* Score display */}
                <div className="text-right relative z-10">
                  <div className={`text-5xl font-bold ${
                    index === 0 ? 'text-amber-600' : index === 1 ? 'text-gray-600' : 'text-orange-600'
                  }`}>
                    {player.score}
                  </div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">puntos</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rest of players (if more than 3) */}
        {sortedPlayers.length > 3 && (
          <>
            <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-0.5" />
            
            <div className="space-y-3">
              {sortedPlayers.slice(3).map((player, index) => {
                const rating = getScoreRating(player.score);
                const percentage = Math.round((player.score / highestScore) * 100);
                
                return (
                  <div 
                    key={player.id}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all group relative overflow-hidden"
                  >
                    {/* Progress bar background */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-blue-100/30 transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>

                    {/* Position number */}
                    <div className="flex items-center justify-center w-12 shrink-0 relative z-10">
                      <span className="text-3xl font-bold text-gray-400">#{index + 4}</span>
                    </div>

                    {/* Avatar */}
                    <div className={`size-14 rounded-xl ${player.avatar} flex items-center justify-center text-white text-xl font-semibold shadow-md relative z-10`}>
                      {player.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Player info */}
                    <div className="flex-1 relative z-10">
                      <div className="text-xl font-semibold mb-1">{player.name}</div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">{player.score} puntos</span>
                        <Badge variant="outline" className={`${rating.color} border-current text-xs`}>
                          {rating.icon} {rating.label}
                        </Badge>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right relative z-10">
                      <div className="text-3xl font-bold text-gray-700">{player.score}</div>
                      <div className="text-xs text-gray-500">pts</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Play again button */}
        <div className="mt-8 space-y-4">
          <Button 
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-900 hover:to-blue-950 text-xl h-18 rounded-2xl shadow-2xl shadow-blue-700/50 hover:shadow-3xl hover:shadow-blue-700/60 transition-all hover:scale-[1.02] font-bold py-6"
          >
            <RotateCcw className="size-7 mr-3" />
            Jugar de Nuevo
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              ¡Gracias por jugar Quiz Royal! 🎮
            </p>
            <p className="text-xs text-gray-400">
              Desafía a tus amigos para batir el récord
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}