import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { Trophy, CheckCircle, XCircle, ArrowRight, RotateCcw, AlertTriangle, Lightbulb } from 'lucide-react';

export const QuizGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (heuristicId: number) => {
    if (isAnswered) return;
    setSelectedOption(heuristicId);
    setIsAnswered(true);

    if (heuristicId === currentQ.correctHeuristicId) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-200">Desafío UX: Detecta la Heurística Rota</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Pregunta <strong className="text-white">{currentIndex + 1}</strong> de {QUIZ_QUESTIONS.length}</span>
          <span>Puntos: <strong className="text-emerald-400 font-mono">{score}</strong></span>
        </div>
      </div>

      {!quizFinished ? (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
          {/* Scenario Context */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              Caso de estudio #{currentQ.id}
            </span>
            <h3 className="text-base font-bold text-white">
              {currentQ.scenarioTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentQ.contextDescription}
            </p>
          </div>

          {/* Bad UI Evidence Box */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-slate-300">Evidencia de interfaz: </span>
              <span className="italic">{currentQ.badUiSnippet}</span>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="text-xs font-semibold text-slate-200 pt-2">
            ¿Qué principio heurístico de Jakob Nielsen se está violando principalmente?
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isChosen = selectedOption === opt.heuristicId;
              const isCorrect = opt.heuristicId === currentQ.correctHeuristicId;

              let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold';
                } else if (isChosen) {
                  btnStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-300 line-through';
                } else {
                  btnStyle = 'bg-slate-950/50 border-slate-850 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={opt.heuristicId}
                  onClick={() => handleSelectOption(opt.heuristicId)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt.title}</span>
                  {isAnswered && (
                    <span>
                      {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      {isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {isAnswered && (
            <div className="p-4 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-3 animate-in fade-in">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-indigo-300">
                    {selectedOption === currentQ.correctHeuristicId ? '¡Correcto!' : 'Respuesta errónea:'}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-emerald-400 pt-2 border-t border-slate-800">
                <strong>Recomendación UX:</strong> {currentQ.recommendation}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  {currentIndex === QUIZ_QUESTIONS.length - 1 ? 'Ver resultados finales' : 'Siguiente caso'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-6">
          <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">¡Desafío Heurístico Finalizado!</h3>
            <p className="text-xs text-slate-400">
              Has evaluado los 10 escenarios reales de usabilidad.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-xs mx-auto space-y-1">
            <div className="text-xs text-slate-400">Puntaje obtenido</div>
            <div className="text-3xl font-bold font-mono text-indigo-400">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <div className="text-xs text-emerald-400 font-medium pt-1">
              {score >= 8 ? 'Nivel: Auditor Senior UX' : score >= 5 ? 'Nivel: Diseñador Competente' : 'Nivel: Principiante UX'}
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors mx-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};
