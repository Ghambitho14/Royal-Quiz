import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Timer, Trophy } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "¿Cuál es la capital de Francia?",
    options: ["Londres", "París", "Berlín", "Madrid"],
    correctAnswer: 1,
    category: "Geografía"
  },
  {
    id: 2,
    question: "¿En qué año llegó el hombre a la Luna?",
    options: ["1965", "1969", "1972", "1975"],
    correctAnswer: 1,
    category: "Historia"
  },
  {
    id: 3,
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Saturno", "Neptuno", "Júpiter", "Urano"],
    correctAnswer: 2,
    category: "Ciencia"
  },
  {
    id: 4,
    question: "¿Quién pintó la Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"],
    correctAnswer: 2,
    category: "Arte"
  },
  {
    id: 5,
    question: "¿Cuál es el océano más grande?",
    options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
    correctAnswer: 3,
    category: "Geografía"
  },
  {
    id: 6,
    question: "¿Cuántos continentes hay en la Tierra?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    category: "Geografía"
  },
  {
    id: 7,
    question: "¿Cuál es el elemento químico con símbolo 'Au'?",
    options: ["Plata", "Oro", "Aluminio", "Hierro"],
    correctAnswer: 1,
    category: "Ciencia"
  },
  {
    id: 8,
    question: "¿En qué país se encuentra la Torre Eiffel?",
    options: ["Italia", "España", "Francia", "Alemania"],
    correctAnswer: 2,
    category: "Geografía"
  },
  {
    id: 9,
    question: "¿Cuál es el animal terrestre más rápido?",
    options: ["León", "Guepardo", "Gacela", "Leopardo"],
    correctAnswer: 1,
    category: "Naturaleza"
  },
  {
    id: 10,
    question: "¿Cuántos lados tiene un hexágono?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    category: "Matemáticas"
  }
];

export function QuestionGame({ players, onGameEnd, onUpdatePlayers }) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [timeLeft, setTimeLeft] = useState(15);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [currentPlayers, setCurrentPlayers] = useState(players);

  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

	const handleAnswerSelect = (answerIndex) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
      setShowResult(true);

      if (answerIndex === questions[currentQuestion].correctAnswer) {
        const points = Math.max(100, timeLeft * 10);
        const updatedPlayers = currentPlayers.map((player, index) => 
          index === (currentQuestion % currentPlayers.length)
            ? { ...player, score: player.score + points }
            : player
        );
        setCurrentPlayers(updatedPlayers);
        onUpdatePlayers(updatedPlayers);
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Badge className="bg-white/90 text-blue-700 px-4 py-2">
          Pregunta {currentQuestion + 1} de {questions.length}
        </Badge>
        <div className="flex gap-2">
          {currentPlayers.map((player) => (
            <div 
              key={player.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                player.id === currentPlayer.id 
                  ? 'bg-white/95 scale-110' 
                  : 'bg-white/60'
              } transition-all`}
            >
              <div className={`size-8 rounded-full ${player.avatar} flex items-center justify-center text-white text-sm`}>
                {player.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm">{player.name}</div>
                <div className="text-xs text-gray-600">{player.score} pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="p-8 bg-white/95 backdrop-blur shadow-2xl">
        <div className="mb-6">
          <Badge variant="outline" className="mb-4">{question.category}</Badge>
          <h2 className="text-3xl mb-6">{question.question}</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <Timer className="size-5 text-blue-700" />
            <div className="flex-1">
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <span className="text-2xl min-w-[3ch] text-center">{timeLeft}s</span>
          </div>

          {!showResult && (
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <div className={`size-6 rounded-full ${currentPlayer.avatar}`} />
              Turno de <strong>{currentPlayer.name}</strong>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => {
            let buttonClass = "p-6 text-left h-auto justify-start hover:scale-105 transition-transform";
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonClass += " bg-green-100 border-2 border-green-500 hover:bg-green-100";
              } else if (index === selectedAnswer) {
                buttonClass += " bg-red-100 border-2 border-red-500 hover:bg-red-100";
              } else {
                buttonClass += " opacity-50";
              }
            } else {
              buttonClass += " bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200";
            }

            return (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                variant="outline"
                className={buttonClass}
              >
                <span className="text-lg mr-3 text-blue-700">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            );
          })}
        </div>

        {showResult && (
          <div className="space-y-4">
            {selectedAnswer === question.correctAnswer ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Trophy className="size-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800">
                  ¡Correcto! <strong>{currentPlayer.name}</strong> gana {Math.max(100, timeLeft * 10)} puntos
                </p>
              </div>
            ) : selectedAnswer !== null ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-800">
                  Incorrecto. La respuesta correcta era: <strong>{question.options[question.correctAnswer]}</strong>
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-yellow-800">
                  ¡Se acabó el tiempo! La respuesta correcta era: <strong>{question.options[question.correctAnswer]}</strong>
                </p>
              </div>
            )}

            <Button 
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 shadow-lg shadow-blue-700/30"
            >
              {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}