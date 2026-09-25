import React, { useState } from 'react';
import { NIELSEN_HEURISTICS } from '../data/heuristicsData';
import { H1VisibilityPlayground } from './playgrounds/H1VisibilityPlayground';
import { H2RealWorldPlayground } from './playgrounds/H2RealWorldPlayground';
import { H3ControlFreedomPlayground } from './playgrounds/H3ControlFreedomPlayground';
import { H4ConsistencyPlayground } from './playgrounds/H4ConsistencyPlayground';
import { H5ErrorPreventionPlayground } from './playgrounds/H5ErrorPreventionPlayground';
import { H6RecognitionPlayground } from './playgrounds/H6RecognitionPlayground';
import { H7FlexibilityPlayground } from './playgrounds/H7FlexibilityPlayground';
import { H8MinimalistPlayground } from './playgrounds/H8MinimalistPlayground';
import { H9ErrorRecoveryPlayground } from './playgrounds/H9ErrorRecoveryPlayground';
import { H10DocumentationPlayground } from './playgrounds/H10DocumentationPlayground';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Quote,
  Compass,
  AlertCircle,
  Play
} from 'lucide-react';

interface ExplorerViewProps {
  selectedHeuristicId: number;
  setSelectedHeuristicId: (id: number) => void;
  onOpenAudit: () => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  selectedHeuristicId,
  setSelectedHeuristicId,
  onOpenAudit,
}) => {
  const [checkedPractices, setCheckedPractices] = useState<Record<string, boolean>>({});

  const activeH = NIELSEN_HEURISTICS.find(h => h.id === selectedHeuristicId) || NIELSEN_HEURISTICS[0];

  const handlePrev = () => {
    setSelectedHeuristicId(activeH.id === 1 ? 10 : activeH.id - 1);
  };

  const handleNext = () => {
    setSelectedHeuristicId(activeH.id === 10 ? 1 : activeH.id + 1);
  };

  const togglePractice = (key: string) => {
    setCheckedPractices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-12 relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <span>Jakob Nielsen & Rolf Molich</span>
              <span aria-hidden="true">·</span>
              <span>10 Principios Heurísticos de Usabilidad</span>
              <span aria-hidden="true">·</span>
              <span>Laboratorio Interactivo</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
              Aprende y experimenta las 10 Heurísticas de Usabilidad
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              No te limites a memorizar conceptos teóricos: manipula directamente cada principio con simulaciones de interfaz en vivo, compara malas vs. buenas prácticas UX y audita tus propios productos digitales.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedHeuristicId(1)}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-900/30"
              >
                <Play className="w-3.5 h-3.5" /> Explorar Simulador #01
              </button>
              <button
                onClick={onOpenAudit}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors border border-slate-700"
              >
                Iniciar Auditoría UX
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl relative bg-slate-950">
              <img
                src="/src/assets/images/hero_nielsen_heuristics_1790376448953.jpg"
                alt="Espacio de trabajo y tarjetas de evaluación heurística de usabilidad"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-300 flex items-center justify-between font-mono">
                <span>10 Heurísticas Universales</span>
                <span>Nielsen Norman Group</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Principles Quick Jump Bar */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selecciona un principio para simular:
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {activeH.numberStr} / 10
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {NIELSEN_HEURISTICS.map(h => {
            const isSelected = h.id === activeH.id;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedHeuristicId(h.id)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow-md shadow-indigo-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-xs mb-0.5">{h.numberStr}</div>
                <div className="text-[11px] truncate">{h.titleSpanish.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Heuristic Study & Sandbox View */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Conceptual Overview, Analogies & Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                Heurística {activeH.numberStr}
              </span>
              <span className="text-xs text-slate-400 italic">
                {activeH.titleEnglish}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeH.titleSpanish}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeH.summary}
            </p>

            {/* Jakob Nielsen Quote */}
            <div className="p-4 bg-slate-950 border-l-2 border-indigo-500 rounded-r-xl space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-[11px]">
                <Quote className="w-3.5 h-3.5" />
                Jakob Nielsen:
              </div>
              <p className="text-slate-300 italic leading-relaxed">
                &quot;{activeH.quote}&quot;
              </p>
            </div>

            {/* Physical Metaphor / Analogy */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3 text-xs">
              <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-slate-200">Metáfora en la vida física: </span>
                <span className="text-slate-400">{activeH.realWorldAnalogy}</span>
              </div>
            </div>

            {/* Core Evaluation Question */}
            <div className="p-3.5 bg-indigo-950/30 border border-indigo-900/40 rounded-xl flex items-start gap-3 text-xs">
              <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-indigo-300">Pregunta de prueba: </span>
                <span className="text-indigo-200">{activeH.keyQuestion}</span>
              </div>
            </div>

            {/* Best Practices Interactive Checklist */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                <span>Buenas prácticas de implementación:</span>
                <span className="text-[11px] text-slate-500">Haz clic para verificar</span>
              </div>
              <div className="space-y-2">
                {activeH.bestPractices.map((bp, i) => {
                  const checkKey = `${activeH.id}_${i}`;
                  const isChecked = !!checkedPractices[checkKey];

                  return (
                    <div
                      key={i}
                      onClick={() => togglePractice(checkKey)}
                      className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                          : 'bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isChecked ? 'text-emerald-400' : 'text-slate-600'
                        }`}
                      />
                      <span className={isChecked ? 'line-through opacity-75' : ''}>{bp}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Common Violations */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Errores comunes detectados en auditorías:
              </div>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                {activeH.commonViolations.map((v, i) => (
                  <li key={i} className="leading-relaxed">{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Sandbox Playground (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <h3 className="text-sm font-bold text-white">
                  Laboratorio Interactivo en Vivo: Principio #{activeH.numberStr}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Interactúa con los controles abajo
              </span>
            </div>

            {/* Render Specific Playground for the Active Heuristic */}
            {activeH.id === 1 && <H1VisibilityPlayground />}
            {activeH.id === 2 && <H2RealWorldPlayground />}
            {activeH.id === 3 && <H3ControlFreedomPlayground />}
            {activeH.id === 4 && <H4ConsistencyPlayground />}
            {activeH.id === 5 && <H5ErrorPreventionPlayground />}
            {activeH.id === 6 && <H6RecognitionPlayground />}
            {activeH.id === 7 && <H7FlexibilityPlayground />}
            {activeH.id === 8 && <H8MinimalistPlayground />}
            {activeH.id === 9 && <H9ErrorRecoveryPlayground />}
            {activeH.id === 10 && <H10DocumentationPlayground />}
          </div>

          {/* Previous / Next Heuristic Navigation */}
          <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Anterior Principio
            </button>

            <span className="text-xs text-slate-500">
              Heurística {activeH.id} de 10
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              Siguiente Principio <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
