import React, { useState, useEffect, useMemo } from 'react';
import { levels } from './levels';
import { extendLevels } from './data/levels';
import ExamSidebar from './components/ExamSidebar';
import LevelCompleteModal from './components/LevelCompleteModal';
import ExamResultModal from './components/ExamResultModal';
import RadioPlayer from './components/RadioPlayer';
import { shuffleNonTrivial } from './utils/shuffle';
import { playDing, playWrong } from './utils/sfx';

const expandWords = (exercise) => {
  if (!exercise) return [];
  const tiles = [];
  (exercise.words || []).forEach((w) => {
    const chars = Array.from(w.char || '');
    const pys = (w.pinyin || '').split(/\s+/);
    chars.forEach((ch, i) => {
      tiles.push({ char: ch, pinyin: pys[i] || w.pinyin, uniqueId: `${w.uniqueId || 'u'}-${i}` });
    });
  });
  return tiles;
};

export default function App() {
  const [levelsState] = useState(() => extendLevels(levels));
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseOrder, setExerciseOrder] = useState([]);

  useEffect(() => {
    const ex = levelsState[currentLevel]?.exercises || [];
    setExerciseOrder(shuffleNonTrivial(ex.map((_, i) => i)));
    setCurrentExercise(0);
  }, [currentLevel, levelsState]);

  const exercise = levelsState[currentLevel]?.exercises[exerciseOrder[currentExercise]];
  const tiles = useMemo(() => shuffleNonTrivial(expandWords(exercise)), [exercise]);

  const [answer, setAnswer] = useState('');
  useEffect(() => setAnswer(''), [exercise]);

  const isExam = !!levelsState[currentLevel]?.isExam;
  const passThreshold = levelsState[currentLevel]?.passThreshold ?? 0.8;
  const maxAttempts = levelsState[currentLevel]?.maxAttempts ?? 3;
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [examErrors, setExamErrors] = useState([]);
  useEffect(() => {
    if (isExam) {
      setCorrectCount(0);
      setAttemptsLeft(maxAttempts);
      setExamErrors([]);
    }
  }, [isExam, currentLevel, maxAttempts]);

  const [showMinusOne, setShowMinusOne] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showExamResult, setShowExamResult] = useState(false);

  const checkAnswer = () => {
    let nextAttempts = attemptsLeft;
    if (answer === exercise.chinese) {
      playDing();
      if (isExam) setCorrectCount((c) => c + 1);
    } else {
      playWrong();
      if (isExam) {
        nextAttempts = Math.max(0, attemptsLeft - 1);
        setAttemptsLeft(nextAttempts);
        setShowMinusOne(true);
        setTimeout(() => setShowMinusOne(false), 900);
        setExamErrors((err) => [...err, { correct: exercise.chinese, pinyin: exercise.pinyin, user: answer }]);
      }
    }
    const total = levelsState[currentLevel].exercises.length;
    const done = currentExercise + 1 >= total || (isExam && nextAttempts <= 0);
    if (done) {
      if (isExam) setShowExamResult(true);
      else setShowLevelComplete(true);
    } else {
      setCurrentExercise((c) => c + 1);
    }
  };

  const handleTileClick = (tile) => {
    setAnswer((prev) => {
      const next = prev + tile.char;
      if (next.length === (exercise?.chinese || '').length) {
        setTimeout(checkAnswer, 200);
      }
      return next;
    });
  };

  const handleContinueLevel = () => {
    setShowLevelComplete(false);
    setCurrentLevel((l) => Math.min(levelsState.length - 1, l + 1));
  };
  const handleRetry = () => {
    setShowExamResult(false);
    setCurrentExercise(0);
    setExerciseOrder(shuffleNonTrivial(levelsState[currentLevel].exercises.map((_, i) => i)));
    setCorrectCount(0);
    setAttemptsLeft(maxAttempts);
    setExamErrors([]);
  };
  const handleSelectLevel = () => {
    setShowExamResult(false);
    setShowLevelComplete(false);
    setCurrentExercise(0);
  };
  const handleContinueCourse = () => {
    setShowExamResult(false);
    setCurrentLevel((l) => Math.min(levelsState.length - 1, l + 1));
  };

  const passed = (correctCount / (levelsState[currentLevel]?.exercises.length || 1)) >= passThreshold && attemptsLeft > 0;

  return (
    <div className="p-4">
      {isExam && (
        <ExamSidebar correct={correctCount} total={levelsState[currentLevel].exercises.length} threshold={passThreshold} />
      )}
      <div className="max-w-xl mx-auto mt-10" style={{ transform: 'scale(1.05)' }}>
        <h2 className="text-xl font-bold mb-4">{levelsState[currentLevel]?.title}</h2>
        <p className="mb-2 text-gray-700">{exercise?.translation}</p>
        <div className="mb-4 min-h-10 border rounded p-2">{answer}</div>
        <p className="text-red-400 text-lg mb-2">Toca los caracteres para construir la frase</p>
        <div className="flex flex-wrap gap-2">
          {tiles.map((t) => (
            <button
              key={t.uniqueId}
              onClick={() => handleTileClick(t)}
              className="px-3 py-2 border rounded-lg text-xl"
            >
              {t.char}
            </button>
          ))}
        </div>
      </div>
      {isExam && (
        <div className="fixed right-8 top-40 flex flex-col gap-3 items-center">
          {Array.from({ length: attemptsLeft }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-red-500 text-white grid place-items-center text-xl animate-[heartbeat_1.6s_infinite]"
            >
              ❤
            </div>
          ))}
          {showMinusOne && <div className="text-red-600 font-bold animate-[popOut_0.9s_ease]">-1 ❤</div>}
        </div>
      )}
      <LevelCompleteModal open={showLevelComplete} onContinue={handleContinueLevel} />
      <ExamResultModal
        open={showExamResult}
        passed={passed}
        errors={examErrors}
        onRetry={handleRetry}
        onSelectLevel={handleSelectLevel}
        onContinue={handleContinueCourse}
      />
      <RadioPlayer />
      <style>{`
        @keyframes heartbeat{0%{transform:scale(1)}20%{transform:scale(1.3)}40%{transform:scale(1)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
        @keyframes popOut{0%{opacity:0; transform:translateY(10px) scale(0.9)}30%{opacity:1; transform:translateY(0) scale(1)}100%{opacity:0; transform:translateY(-20px) scale(1.1)}}
      `}</style>
    </div>
  );
}
