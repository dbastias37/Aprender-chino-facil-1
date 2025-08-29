

// === Exam helpers (auto-6 preguntas) ===
const shuffleLocal = (array) => {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildExamFromExercises = (exercises, n = 6) => {
  const pool = (exercises || []).map(ex => ({ q: ex.chinese, ans: ex.spanish }));
  const pick = (arr, k) => shuffleLocal(arr).slice(0, k);
  return pick(pool, Math.min(n, pool.length)).map((item) => {
    const distractors = pool.filter(p => p.ans !== item.ans).map(p => p.ans);
    const options = shuffleLocal([item.ans, ...pick(distractors, 3)]);
    const correct = options.indexOf(item.ans);
    return { question: item.q, options, correct };
  });
};

const getExam = (level) => {
  if (level && Array.isArray(level.exam) && level.exam.length >= 6) return level.exam.slice(0, 6);
  return buildExamFromExercises(level?.exercises || [], 6);
};
// === fin helpers ===
import React, { useState, useEffect, useMemo } from 'react';
import { shuffleNonTrivial } from './utils/shuffle';
import { Book, Heart, Star, Trophy, X, Search, AlertTriangle } from 'lucide-react';
import { extendLevels } from './data/levels';