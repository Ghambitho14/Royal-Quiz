import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award, RotateCcw } from 'lucide-react';

export function GameResults({ players, onPlayAgain }) {
	const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
	const winner = sortedPlayers[0];

	const getMedalIcon = (position) => {
    switch (position) {
      case 0:
        return <Trophy className="size-8 text-yellow-500" />;
      case 1:
        return <Medal className="size-8 text-gray-400" />;
      case 2:
        return <Award className="size-8 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-6xl mb-4">🎊</h1>
        <h2 className="text-4xl text-white mb-2">¡Juego Terminado!</h2>
        <p className="text-xl text-white/90">
          ¡Felicidades <strong>{winner.name}</strong>!
        </p>
      </div>

      <Card className="p-8 bg-white/95 backdrop-blur shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Trophy className="size-6 text-blue-700" />
          <h3 className="text-2xl">Tabla de Posiciones</h3>
        </div>

        <div className="space-y-3 mb-8">
          {sortedPlayers.map((player, index) => (
            <div 
              key={player.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                index === 0 
                  ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 scale-105' 
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center w-12">
                {getMedalIcon(index) || (
                  <span className="text-2xl text-gray-400">#{index + 1}</span>
                )}
              </div>

              <div className={`size-12 rounded-full ${player.avatar} flex items-center justify-center text-white text-lg`}>
                {player.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{player.name}</span>
                  {index === 0 && (
                    <Badge className="bg-amber-500 hover:bg-amber-500 text-white">
                      Ganador
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {player.score} puntos
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl">{player.score}</div>
                <div className="text-xs text-gray-500">puntos</div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-lg py-6 shadow-lg shadow-blue-700/30"
        >
          <RotateCcw className="size-5 mr-2" />
          Jugar de Nuevo
        </Button>
      </Card>

      <div className="mt-6 text-center text-white/80 text-sm">
        Gracias por jugar Quiz Master
      </div>
    </div>
  );
}