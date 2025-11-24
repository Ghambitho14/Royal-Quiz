import type { Question } from '../App';

export const categoryIcons: Record<string, string> = {
  'Geografía': '🌍',
  'Historia': '📜',
  'Ciencia': '🔬',
  'Arte': '🎨',
  'Naturaleza': '🌿',
  'Matemáticas': '🔢',
  'Deportes': '⚽',
  'Música': '🎵',
  'Cine': '🎬',
  'Tecnología': '💻',
  'Literatura': '📚',
  'Cultura General': '🧠',
};

export const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  'Geografía': { bg: 'from-green-50 to-emerald-50', border: 'border-green-400', text: 'text-green-700' },
  'Historia': { bg: 'from-amber-50 to-yellow-50', border: 'border-amber-400', text: 'text-amber-700' },
  'Ciencia': { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-400', text: 'text-blue-700' },
  'Arte': { bg: 'from-purple-50 to-pink-50', border: 'border-purple-400', text: 'text-purple-700' },
  'Naturaleza': { bg: 'from-lime-50 to-green-50', border: 'border-lime-400', text: 'text-lime-700' },
  'Matemáticas': { bg: 'from-indigo-50 to-blue-50', border: 'border-indigo-400', text: 'text-indigo-700' },
  'Deportes': { bg: 'from-orange-50 to-red-50', border: 'border-orange-400', text: 'text-orange-700' },
  'Música': { bg: 'from-pink-50 to-rose-50', border: 'border-pink-400', text: 'text-pink-700' },
  'Cine': { bg: 'from-red-50 to-pink-50', border: 'border-red-400', text: 'text-red-700' },
  'Tecnología': { bg: 'from-slate-50 to-gray-50', border: 'border-slate-400', text: 'text-slate-700' },
  'Literatura': { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-400', text: 'text-teal-700' },
  'Cultura General': { bg: 'from-violet-50 to-purple-50', border: 'border-violet-400', text: 'text-violet-700' },
};

export const allQuestions: Question[] = [
  // Geografía
  { id: 1, question: "¿Cuál es la capital de Francia?", options: ["Londres", "París", "Berlín", "Madrid"], correctAnswer: 1, category: "Geografía" },
  { id: 2, question: "¿Cuál es el océano más grande?", options: ["Atlántico", "Índico", "Ártico", "Pacífico"], correctAnswer: 3, category: "Geografía" },
  { id: 3, question: "¿Cuántos continentes hay en la Tierra?", options: ["5", "6", "7", "8"], correctAnswer: 2, category: "Geografía" },
  { id: 4, question: "¿En qué país se encuentra la Torre Eiffel?", options: ["Italia", "España", "Francia", "Alemania"], correctAnswer: 2, category: "Geografía" },
  { id: 5, question: "¿Cuál es el río más largo del mundo?", options: ["Nilo", "Amazonas", "Yangtsé", "Mississippi"], correctAnswer: 1, category: "Geografía" },
  { id: 6, question: "¿En qué continente está Egipto?", options: ["Asia", "Europa", "África", "América"], correctAnswer: 2, category: "Geografía" },
  { id: 7, question: "¿Cuál es el país más grande del mundo?", options: ["China", "Canadá", "Estados Unidos", "Rusia"], correctAnswer: 3, category: "Geografía" },
  { id: 8, question: "¿Qué país tiene forma de bota?", options: ["Grecia", "Italia", "España", "Portugal"], correctAnswer: 1, category: "Geografía" },
  
  // Historia
  { id: 9, question: "¿En qué año llegó el hombre a la Luna?", options: ["1965", "1969", "1972", "1975"], correctAnswer: 1, category: "Historia" },
  { id: 10, question: "¿Quién descubrió América?", options: ["Marco Polo", "Cristóbal Colón", "Magallanes", "Vasco da Gama"], correctAnswer: 1, category: "Historia" },
  { id: 11, question: "¿En qué año cayó el Muro de Berlín?", options: ["1987", "1989", "1991", "1993"], correctAnswer: 1, category: "Historia" },
  { id: 12, question: "¿Quién fue el primer presidente de Estados Unidos?", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"], correctAnswer: 2, category: "Historia" },
  { id: 13, question: "¿En qué año comenzó la Segunda Guerra Mundial?", options: ["1935", "1937", "1939", "1941"], correctAnswer: 2, category: "Historia" },
  { id: 14, question: "¿Quién pintó la Capilla Sixtina?", options: ["Leonardo da Vinci", "Miguel Ángel", "Rafael", "Donatello"], correctAnswer: 1, category: "Historia" },
  
  // Ciencia
  { id: 15, question: "¿Cuál es el planeta más grande del sistema solar?", options: ["Saturno", "Neptuno", "Júpiter", "Urano"], correctAnswer: 2, category: "Ciencia" },
  { id: 16, question: "¿Cuál es el elemento químico con símbolo 'Au'?", options: ["Plata", "Oro", "Aluminio", "Hierro"], correctAnswer: 1, category: "Ciencia" },
  { id: 17, question: "¿Cuántos huesos tiene el cuerpo humano adulto?", options: ["186", "206", "226", "246"], correctAnswer: 1, category: "Ciencia" },
  { id: 18, question: "¿Qué gas es esencial para la respiración?", options: ["Nitrógeno", "Oxígeno", "Hidrógeno", "Dióxido de carbono"], correctAnswer: 1, category: "Ciencia" },
  { id: 19, question: "¿Cuál es la velocidad de la luz?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correctAnswer: 0, category: "Ciencia" },
  { id: 20, question: "¿Quién desarrolló la teoría de la relatividad?", options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"], correctAnswer: 1, category: "Ciencia" },
  { id: 21, question: "¿Cuál es el planeta más cercano al Sol?", options: ["Venus", "Marte", "Mercurio", "Tierra"], correctAnswer: 2, category: "Ciencia" },
  
  // Arte
  { id: 22, question: "¿Quién pintó la Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], correctAnswer: 2, category: "Arte" },
  { id: 23, question: "¿Quién pintó 'La noche estrellada'?", options: ["Monet", "Van Gogh", "Picasso", "Dalí"], correctAnswer: 1, category: "Arte" },
  { id: 24, question: "¿Dónde está el Museo del Louvre?", options: ["Londres", "Roma", "París", "Madrid"], correctAnswer: 2, category: "Arte" },
  { id: 25, question: "¿Quién es el autor de 'El Grito'?", options: ["Edvard Munch", "Gustav Klimt", "Vincent van Gogh", "Pablo Picasso"], correctAnswer: 0, category: "Arte" },
  
  // Naturaleza
  { id: 26, question: "¿Cuál es el animal terrestre más rápido?", options: ["León", "Guepardo", "Gacela", "Leopardo"], correctAnswer: 1, category: "Naturaleza" },
  { id: 27, question: "¿Cuál es el animal más grande del mundo?", options: ["Elefante africano", "Ballena azul", "Tiburón ballena", "Orca"], correctAnswer: 1, category: "Naturaleza" },
  { id: 28, question: "¿Cuántos corazones tiene un pulpo?", options: ["1", "2", "3", "4"], correctAnswer: 2, category: "Naturaleza" },
  { id: 29, question: "¿Qué animal puede vivir sin cabeza durante varias semanas?", options: ["Cucaracha", "Lagartija", "Serpiente", "Araña"], correctAnswer: 0, category: "Naturaleza" },
  { id: 30, question: "¿Cuál es el árbol más alto del mundo?", options: ["Secuoya", "Baobab", "Roble", "Pino"], correctAnswer: 0, category: "Naturaleza" },
  
  // Matemáticas
  { id: 31, question: "¿Cuántos lados tiene un hexágono?", options: ["5", "6", "7", "8"], correctAnswer: 1, category: "Matemáticas" },
  { id: 32, question: "¿Cuál es el valor de Pi (π) aproximadamente?", options: ["2.14", "3.14", "4.14", "5.14"], correctAnswer: 1, category: "Matemáticas" },
  { id: 33, question: "¿Cuánto es 12 x 12?", options: ["124", "144", "164", "184"], correctAnswer: 1, category: "Matemáticas" },
  { id: 34, question: "¿Cuál es la raíz cuadrada de 64?", options: ["6", "7", "8", "9"], correctAnswer: 2, category: "Matemáticas" },
  { id: 35, question: "¿Cuántos grados tiene un triángulo?", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1, category: "Matemáticas" },
  
  // Deportes
  { id: 36, question: "¿En qué deporte destaca Lionel Messi?", options: ["Baloncesto", "Fútbol", "Tenis", "Golf"], correctAnswer: 1, category: "Deportes" },
  { id: 37, question: "¿Cuántos jugadores hay en un equipo de fútbol?", options: ["9", "10", "11", "12"], correctAnswer: 2, category: "Deportes" },
  { id: 38, question: "¿Cada cuántos años son los Juegos Olímpicos?", options: ["2 años", "3 años", "4 años", "5 años"], correctAnswer: 2, category: "Deportes" },
  { id: 39, question: "¿En qué deporte se usa una raqueta?", options: ["Golf", "Cricket", "Tenis", "Hockey"], correctAnswer: 2, category: "Deportes" },
  { id: 40, question: "¿Qué país ganó el Mundial de Fútbol 2018?", options: ["Brasil", "Alemania", "Francia", "Argentina"], correctAnswer: 2, category: "Deportes" },
  
  // Música
  { id: 41, question: "¿Quién es conocido como el Rey del Pop?", options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"], correctAnswer: 1, category: "Música" },
  { id: 42, question: "¿Cuántas cuerdas tiene una guitarra española?", options: ["4", "5", "6", "7"], correctAnswer: 2, category: "Música" },
  { id: 43, question: "¿Qué banda compuso 'Bohemian Rhapsody'?", options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"], correctAnswer: 2, category: "Música" },
  { id: 44, question: "¿De qué país es Shakira?", options: ["México", "Argentina", "Colombia", "España"], correctAnswer: 2, category: "Música" },
  
  // Cine
  { id: 45, question: "¿Quién dirigió 'Titanic'?", options: ["Steven Spielberg", "James Cameron", "Martin Scorsese", "Christopher Nolan"], correctAnswer: 1, category: "Cine" },
  { id: 46, question: "¿Qué película ganó el Oscar 2020?", options: ["Joker", "1917", "Parasite", "Once Upon a Time"], correctAnswer: 2, category: "Cine" },
  { id: 47, question: "¿Cómo se llama el personaje de Johnny Depp pirata?", options: ["Jack Sparrow", "William Turner", "Hector Barbossa", "Davy Jones"], correctAnswer: 0, category: "Cine" },
  { id: 48, question: "¿En qué año se estrenó la primera película de Harry Potter?", options: ["1999", "2001", "2003", "2005"], correctAnswer: 1, category: "Cine" },
  
  // Tecnología
  { id: 49, question: "¿Quién fundó Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], correctAnswer: 1, category: "Tecnología" },
  { id: 50, question: "¿En qué año se lanzó el primer iPhone?", options: ["2005", "2007", "2009", "2011"], correctAnswer: 1, category: "Tecnología" },
  { id: 51, question: "¿Qué significa CPU?", options: ["Computer Personal Unit", "Central Processing Unit", "Central Power Unit", "Computer Processing User"], correctAnswer: 1, category: "Tecnología" },
  { id: 52, question: "¿Quién fundó Facebook?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"], correctAnswer: 2, category: "Tecnología" },
  
  // Literatura
  { id: 53, question: "¿Quién escribió 'Don Quijote de la Mancha'?", options: ["Lope de Vega", "Miguel de Cervantes", "Federico García Lorca", "Calderón de la Barca"], correctAnswer: 1, category: "Literatura" },
  { id: 54, question: "¿Quién escribió 'Cien años de soledad'?", options: ["Pablo Neruda", "Jorge Luis Borges", "Gabriel García Márquez", "Octavio Paz"], correctAnswer: 2, category: "Literatura" },
  { id: 55, question: "¿De qué país es el escritor Shakespeare?", options: ["Estados Unidos", "Inglaterra", "Irlanda", "Francia"], correctAnswer: 1, category: "Literatura" },
  
  // Cultura General
  { id: 56, question: "¿Cuántos días tiene un año bisiesto?", options: ["364", "365", "366", "367"], correctAnswer: 2, category: "Cultura General" },
  { id: 57, question: "¿Cuál es el idioma más hablado del mundo?", options: ["Inglés", "Español", "Chino mandarín", "Hindi"], correctAnswer: 2, category: "Cultura General" },
  { id: 58, question: "¿Cuántos colores tiene el arcoíris?", options: ["5", "6", "7", "8"], correctAnswer: 2, category: "Cultura General" },
  { id: 59, question: "¿Qué animal es el símbolo de WWF?", options: ["Tigre", "Elefante", "Oso panda", "Rinoceronte"], correctAnswer: 2, category: "Cultura General" },
  { id: 60, question: "¿Cuántas horas tiene un día?", options: ["12", "24", "36", "48"], correctAnswer: 1, category: "Cultura General" },
];

// Función para obtener preguntas aleatorias
export function getRandomQuestions(count: number = 15): Question[] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Función para obtener preguntas por categoría
export function getQuestionsByCategory(category: string, count: number = 5): Question[] {
  const categoryQuestions = allQuestions.filter(q => q.category === category);
  const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, categoryQuestions.length));
}
