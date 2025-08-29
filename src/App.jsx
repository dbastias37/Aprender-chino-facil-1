import React, { useState } from 'react';

/**
 * App Aprender Chino Fácil - extendida a 20 niveles
 */

const levels = [
  { id: 1, title: 'Saludos Básicos' },
  { id: 2, title: 'Números Básicos' },
  { id: 3, title: 'Familia' },
  { id: 4, title: 'Colores' },
  { id: 5, title: 'Días de la Semana' },
  { id: 6, title: 'Comida' },
  { id: 7, title: 'Mascotas' },
  { id: 8, title: 'Trabajo' },
  { id: 9, title: 'Dinero y Comercio' },
  { id: 10, title: 'Preguntas Simples' },
  { id: 11, title: 'Respuestas Simples' },
  { id: 12, title: 'La Hora' },
  { id: 13, title: 'Acciones en Presente' },
  { id: 14, title: 'Acciones en Pasado' },
  { id: 15, title: 'Acciones en Futuro' },
  { id: 16, title: 'Colores Avanzados' },
  { id: 17, title: 'Preguntas Avanzadas' },
  { id: 18, title: 'Respuestas Avanzadas' },
  { id: 19, title: 'Comercio' },
  { id: 20, title: 'Cultura y Expresiones' }
]

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [showCongrats, setShowCongrats] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const completeExam = () => {
    if (currentLevel === 20) {
      setShowFinal(true)
    } else {
      setShowCongrats(true)
    }
  }

  const restartLevel = () => {
    setShowCongrats(false)
    // lógica de reinicio del nivel
  }

  const nextLevel = () => {
    setShowCongrats(false)
    setCurrentLevel(currentLevel + 1)
  }

  const closeFinal = () => {
    setShowFinal(false)
    // desbloquear todos los niveles
    setCurrentLevel(1)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Aprender Chino Fácil</h1>
      <p className="mt-4 text-gray-600">Nivel actual: {levels[currentLevel-1].title}</p>

      <div className="mt-6 grid grid-cols-5 gap-2">
        {levels.map(l => (
          <button key={l.id}
            onClick={() => setCurrentLevel(l.id)}
            className={\`px-3 py-2 rounded \${currentLevel===l.id?'bg-red-500 text-white':'bg-gray-200'}\`}>
            {l.id}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <button onClick={completeExam} className="px-4 py-2 bg-green-500 text-white rounded">Completar Examen</button>
      </div>

      {/* Modal de felicitaciones */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center w-full max-w-md">
            <h2 className="text-3xl font-bold text-red-700 mb-4">🎉 ¡Felicitaciones!</h2>
            <div className="flex justify-center gap-4">
              <button onClick={restartLevel} className="px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600">
                🔄 Repasar
              </button>
              <button onClick={nextLevel} className="px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600">
                ⏭️ Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pantalla final nivel 20 */}
      {showFinal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center w-full max-w-lg">
            <h2 className="text-2xl font-bold text-red-700 mb-4">🎉 ¡Felicitaciones!</h2>
            <p className="text-gray-700 text-sm mt-4 leading-relaxed">
              Gracias por llegar hasta aquí, de seguro conoces muy bien el idioma chino y te agradezco el tiempo de aprendizaje y juego. 
              Quizá un día mi hijo o mi nieto llegue a este nivel y quiero que sepan que siendo las 4am del 2025, quiero lo mejor para ellos y para el mundo.
              <br/><br/>Viva Chile y viva China!
              <br/><br/>Diego Bastías A.
            </p>
            <div className="mt-6">
              <button onClick={closeFinal} className="px-6 py-3 rounded-xl bg-purple-500 text-white hover:bg-purple-600">
                🔙 Cerrar y volver al juego
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
