import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Timer, Trophy, Zap, Target, Award } from 'lucide-react';
import type { Player, Question } from '../App';
import { getRandomQuestions, categoryIcons, categoryColors } from '../data/questions';

interface QuestionGameProps {
  players: Player[];
  onGameEnd: (players: Player[]) => void;
  onUpdatePlayers: (players: Player[]) => void;
}

export function QuestionGame({ players, onGameEnd, onUpdatePlayers }: QuestionGameProps) {
  const [questions] = useState<Question[]>(() => getRandomQuestions(15));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentPlayers, setCurrentPlayers] = useState(players);
  const [streak, setStreak] = useState(0);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
      setStreak(0); // Reset streak on timeout
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
      setShowResult(true);

      if (answerIndex === questions[currentQuestion].correctAnswer) {
        const basePoints = Math.max(100, timeLeft * 10);
        const comboMultiplier = 1 + (streak * 0.1); // 10% bonus per streak
        const points = Math.round(basePoints * comboMultiplier);
        
        const updatedPlayers = currentPlayers.map((player, index) => 
          index === (currentQuestion % currentPlayers.length)
            ? { ...player, score: player.score + points }
            : player
        );
        
        setCurrentPlayers(updatedPlayers);
        onUpdatePlayers(updatedPlayers);
        
        // Increase streak
        const newStreak = streak + 1;
        setStreak(newStreak);
        
        // Show streak animation for streaks >= 3
        if (newStreak >= 3) {
          setShowStreakAnimation(true);
          setTimeout(() => setShowStreakAnimation(false), 2000);
        }
        
        // Show confetti for perfect answers
        if (timeLeft >= 12) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        setStreak(0); // Reset streak on wrong answer
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onGameEnd(currentPlayers);
    }
  };

  const question = questions[currentQuestion];
  const currentPlayerIndex = currentQuestion % currentPlayers.length;
  const currentPlayer = currentPlayers[currentPlayerIndex];
  const progressPercentage = ((timeLeft / 15) * 100);
  const categoryColor = categoryColors[question.category] || categoryColors['Cultura General'];
  const categoryIcon = categoryIcons[question.category] || '🧠';

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-[fall_3s_ease-in_forwards]"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {['🎉', '⭐', '✨', '🏆', '💫', '🎊'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      {/* Streak notification */}
      {showStreakAnimation && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-[bounce_0.5s_ease-in-out_3]">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-white">
            <div className="flex items-center gap-3">
              <Zap className="size-8 animate-pulse" />
              <div>
                <div className="text-2xl font-bold">¡RACHA x{streak}!</div>
                <div className="text-sm opacity-90">+{streak * 10}% Bonus</div>
              </div>
              <Zap className="size-8 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Progress bar at top */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/90 text-sm font-medium">Progreso del Juego</span>
          <span className="text-white/90 text-sm font-medium">{currentQuestion + 1} / {questions.length}</span>
        </div>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-yellow-500" />
      </div>

      {/* Top bar - Enhanced with glassmorphism */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge className={`bg-gradient-to-r ${categoryColor.bg} ${categoryColor.border} ${categoryColor.text} px-5 py-2.5 shadow-xl border-2 rounded-2xl text-base font-semibold`}>
            {categoryIcon} {question.category}
          </Badge>
          
          {streak > 0 && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 shadow-lg border-2 border-orange-300 rounded-xl font-semibold animate-pulse">
              <Zap className="size-4 mr-1" />
              Racha x{streak}
            </Badge>
          )}
        </div>
        
        {/* Players mini scoreboard */}
        <div className="flex flex-wrap gap-2 justify-center">
          {currentPlayers.map((player, index) => (
            <div 
              key={player.id}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all duration-300 shadow-lg ${
                index === currentPlayerIndex
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 scale-110 ring-2 ring-blue-400/50 shadow-blue-500/50' 
                  : 'bg-white/90 backdrop-blur-xl border-2 border-gray-200'
              }`}
            >
              <div className={`size-9 rounded-xl ${player.avatar} flex items-center justify-center text-white text-sm font-semibold shadow-md ${
                index === currentPlayerIndex ? 'ring-2 ring-white/50 animate-pulse' : ''
              }`}>
                {player.name.charAt(0).toUpperCase()}
              </div>
              <div className={index === currentPlayerIndex ? 'text-white' : ''}>
                <div className={`text-sm font-medium ${index === currentPlayerIndex ? 'text-white' : 'text-gray-900'}`}>
                  {player.name}
                </div>
                <div className={`text-xs flex items-center gap-1 ${index === currentPlayerIndex ? 'text-blue-100' : 'text-gray-600'}`}>
                  <Trophy className="size-3" />
                  {player.score} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="p-8 bg-white/98 backdrop-blur-2xl shadow-2xl border-0 rounded-3xl overflow-hidden animate-[slideUp_0.5s_ease-out]">
        {/* Decorative gradient top bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${categoryColor.bg}`}></div>
        
        {/* Question header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <Badge variant="outline" className={`px-5 py-2 bg-gradient-to-r ${categoryColor.bg} border-2 ${categoryColor.border} ${categoryColor.text} rounded-xl font-semibold text-base shadow-md`}>
              <span className="text-xl mr-2">{categoryIcon}</span>
              {question.category}
            </Badge>
            
            <Badge className="bg-white/95 backdrop-blur-xl text-gray-800 px-4 py-2 shadow-lg border-2 border-gray-200 rounded-xl font-semibold">
              Pregunta {currentQuestion + 1}/{questions.length}
            </Badge>
          </div>
          
          <h2 className="text-3xl mb-8 leading-tight font-semibold text-gray-900 min-h-[80px] flex items-center">
            {question.question}
          </h2>
          
          {/* Timer with progress bar - Enhanced */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-5 rounded-2xl border-2 border-gray-200/50 shadow-inner">
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-2.5 rounded-xl shadow-lg transition-all ${
                timeLeft <= 5 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse scale-110' 
                  : 'bg-gradient-to-br from-blue-700 to-blue-800'
              }`}>
                <Timer className="size-5 text-white" />
              </div>
              <div className="flex-1">
                <Progress 
                  value={progressPercentage} 
                  className={`h-3 transition-all ${timeLeft <= 5 ? '[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600' : '[&>div]:bg-gradient-to-r [&>div]:from-blue-700 [&>div]:to-blue-800'}`} 
                />
              </div>
              <span className={`text-3xl font-bold min-w-[3ch] text-center transition-all ${
                timeLeft <= 5 ? 'text-red-600 scale-110' : 'text-blue-700'
              }`}>
                {timeLeft}s
              </span>
            </div>

            {!showResult && (
              <div className="text-sm text-gray-700 flex items-center gap-2 font-medium">
                <div className={`size-7 rounded-xl ${currentPlayer.avatar} flex items-center justify-center text-white text-xs font-bold shadow-md animate-pulse`}>
                  {currentPlayer.name.charAt(0).toUpperCase()}
                </div>
                Turno de <strong className="text-blue-700">{currentPlayer.name}</strong>
                {streak > 0 && (
                  <span className="ml-2 text-orange-600 flex items-center gap-1">
                    <Zap className="size-4" />
                    Racha x{streak}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Answer options - Enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option, index) => {
            let buttonClass = "p-6 text-left h-auto justify-start transition-all duration-300 rounded-2xl border-2 font-medium relative overflow-hidden";
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonClass += " bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 shadow-lg shadow-green-500/20 scale-105";
              } else if (index === selectedAnswer) {
                buttonClass += " bg-gradient-to-r from-red-50 to-rose-50 border-red-500 shadow-lg shadow-red-500/20";
              } else {
                buttonClass += " opacity-40 border-gray-200";
              }
            } else {
              buttonClass += " bg-gradient-to-br from-white to-blue-50/30 border-blue-200 hover:from-blue-50 hover:to-blue-100 hover:border-blue-400 hover:scale-105 hover:shadow-xl shadow-md";
            }

            return (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                variant="outline"
                className={buttonClass}
              >
                {!showResult && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
                <span className={`text-xl font-bold mr-4 size-10 rounded-xl flex items-center justify-center shadow-sm transition-all relative z-10 ${
                  showResult 
                    ? index === question.correctAnswer 
                      ? 'bg-green-600 text-white scale-110'
                      : index === selectedAnswer
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                    : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white group-hover:scale-110'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-base relative z-10">{option}</span>
              </Button>
            );
          })}
        </div>

        {/* Result feedback - Enhanced */}
        {showResult && (
          <div className="space-y-4 animate-[slideUp_0.3s_ease-out]">
            {selectedAnswer === question.correctAnswer ? (
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-400 rounded-2xl p-6 text-center shadow-xl shadow-green-500/10">
                <div className="inline-block p-3 bg-green-600 rounded-2xl mb-3 shadow-lg animate-bounce">
                  <Trophy className="size-10 text-white" />
                </div>
                <p className="text-green-900 text-xl mb-2 font-bold">
                  ¡Respuesta Correcta! 🎉
                </p>
                <p className="text-green-800 text-lg">
                  <strong>{currentPlayer.name}</strong> gana{' '}
                  <span className="text-2xl font-bold text-green-600">
                    {Math.round(Math.max(100, timeLeft * 10) * (1 + streak * 0.1))}
                  </span>{' '}
                  puntos
                  {streak > 0 && (
                    <span className="ml-2 text-orange-600 font-semibold">
                      (Racha x{streak + 1} = +{streak * 10}% bonus!)
                    </span>
                  )}
                </p>
                {timeLeft >= 12 && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-amber-700">
                    <Target className="size-5" />
                    <span className="font-semibold">¡Respuesta Perfecta!</span>
                  </div>
                )}
              </div>
            ) : selectedAnswer !== null ? (
              <div className="bg-gradient-to-r from-red-50 via-rose-50 to-red-50 border-2 border-red-400 rounded-2xl p-6 text-center shadow-xl shadow-red-500/10">
                <div className="text-5xl mb-3 animate-[shake_0.5s_ease-in-out]">❌</div>
                <p className="text-red-900 text-xl mb-2 font-bold">
                  Respuesta Incorrecta
                </p>
                <p className="text-red-800 text-lg">
                  La respuesta correcta era: <strong className="text-red-600 text-xl">{question.options[question.correctAnswer]}</strong>
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 text-center shadow-xl shadow-yellow-500/10">
                <div className="text-5xl mb-3 animate-pulse">⏰</div>
                <p className="text-yellow-900 text-xl mb-2 font-bold">
                  ¡Se Acabó el Tiempo!
                </p>
                <p className="text-yellow-800 text-lg">
                  La respuesta correcta era: <strong className="text-yellow-600 text-xl">{question.options[question.correctAnswer]}</strong>
                </p>
              </div>
            )}

            <Button 
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-900 hover:to-blue-950 shadow-xl shadow-blue-700/40 h-16 text-lg rounded-2xl font-semibold hover:scale-[1.02] transition-all"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  ➡️ Siguiente Pregunta
                  <span className="ml-2 text-sm opacity-80">({questions.length - currentQuestion - 1} restantes)</span>
                </>
              ) : (
                <>
                  🏆 Ver Resultados Finales
                </>
              )}
            </Button>
          </div>
        )}
      </Card>

      {/* Bottom stats */}
      <div className="mt-4 flex items-center justify-center gap-4 text-white/80 text-sm">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl">
          <Award className="size-4" />
          <span>Máxima racha: {streak}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl">
          <Target className="size-4" />
          <span>Precisión: {Math.round(((currentQuestion - (selectedAnswer === null ? 1 : 0)) / Math.max(currentQuestion, 1)) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}