import React, { useState } from 'react';
import { NIELSEN_HEURISTICS } from '../data/heuristicsData';
import { Search, ExternalLink, ArrowRight, Check } from 'lucide-react';

interface CheatSheetMatrixProps {
  onSelectHeuristic: (id: number) => void;
}

export const CheatSheetMatrix: React.FC<CheatSheetMatrixProps> = ({ onSelectHeuristic }) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = NIELSEN_HEURISTICS.filter(h =>
    h.titleSpanish.toLowerCase().includes(filterQuery.toLowerCase()) ||
    h.titleEnglish.toLowerCase().includes(filterQuery.toLowerCase()) ||
    h.summary.toLowerCase().includes(filterQuery.toLowerCase()) ||
    h.keyQuestion.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header and Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Matriz de Referencia Rápida: Los 10 Principios
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Publicadas por Jakob Nielsen y Rolf Molich (1990) y refinadas por Nielsen en 1994.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filtrar por principio o pregunta..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200"
          />
        </div>
      </div>

      {/* Grid of 10 Heuristics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(h => (
          <div
            key={h.id}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl space-y-4 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-400">
                  Principio {h.numberStr}
                </span>
                <span className="text-[11px] text-slate-500 italic">
                  {h.titleEnglish}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">
                {h.titleSpanish}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {h.summary}
              </p>

              <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg text-[11px] text-slate-400 space-y-1">
                <div className="text-slate-300 font-medium">Pregunta clave de auditoría:</div>
                <div className="italic text-indigo-300">&quot;{h.keyQuestion}&quot;</div>
              </div>

              <div className="text-[11px] text-slate-400">
                <span className="text-slate-300 font-medium">Metáfora física: </span>
                {h.realWorldAnalogy}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => onSelectHeuristic(h.id)}
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Abrir simulador interactivo <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
