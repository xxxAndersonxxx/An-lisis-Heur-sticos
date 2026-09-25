import React from 'react';
import { Layers, Sparkles, ClipboardCheck, HelpCircle, Table2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explorer' | 'audit' | 'quiz' | 'matrix';
  setActiveTab: (tab: 'explorer' | 'audit' | 'quiz' | 'matrix') => void;
  onOpenQuickAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickAudit,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display font */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('explorer'); }}
            className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors"
          >
            Nielsen Heuristics Lab
          </a>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`transition-colors pb-0.5 whitespace-nowrap ${
              activeTab === 'explorer'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'hover:text-white'
            }`}
          >
            10 Principios y Laboratorio
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`transition-colors pb-0.5 whitespace-nowrap ${
              activeTab === 'audit'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'hover:text-white'
            }`}
          >
            Evaluador de Auditoría UX
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors pb-0.5 whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'hover:text-white'
            }`}
          >
            Desafío de Casos Reales
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`transition-colors pb-0.5 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400'
                : 'hover:text-white'
            }`}
          >
            Matriz de Referencia Rápida
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuickAudit}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-sm shadow-indigo-900/30"
          >
            Auditar mi Proyecto
          </button>
        </div>
      </div>

      {/* Mobile navigation row for responsive access */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-800/80 bg-slate-950/95 text-[11px] overflow-x-auto">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'explorer' ? 'text-indigo-400 font-bold bg-indigo-950/40' : 'text-slate-400'}`}
        >
          Principios
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'audit' ? 'text-indigo-400 font-bold bg-indigo-950/40' : 'text-slate-400'}`}
        >
          Auditoría
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'quiz' ? 'text-indigo-400 font-bold bg-indigo-950/40' : 'text-slate-400'}`}
        >
          Desafío
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'matrix' ? 'text-indigo-400 font-bold bg-indigo-950/40' : 'text-slate-400'}`}
        >
          Matriz
        </button>
      </div>
    </header>
  );
};
