/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ExplorerView } from './components/ExplorerView';
import { AuditTool } from './components/AuditTool';
import { QuizGame } from './components/QuizGame';
import { CheatSheetMatrix } from './components/CheatSheetMatrix';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'audit' | 'quiz' | 'matrix'>('explorer');
  const [selectedHeuristicId, setSelectedHeuristicId] = useState<number>(1);

  const handleOpenAudit = () => {
    setActiveTab('audit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFromMatrix = (id: number) => {
    setSelectedHeuristicId(id);
    setActiveTab('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Strict 3-zone Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickAudit={handleOpenAudit}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'explorer' && (
          <ExplorerView
            selectedHeuristicId={selectedHeuristicId}
            setSelectedHeuristicId={setSelectedHeuristicId}
            onOpenAudit={handleOpenAudit}
          />
        )}

        {activeTab === 'audit' && (
          <AuditTool />
        )}

        {activeTab === 'quiz' && (
          <QuizGame />
        )}

        {activeTab === 'matrix' && (
          <CheatSheetMatrix
            onSelectHeuristic={handleSelectFromMatrix}
          />
        )}
      </main>

      {/* Quiet, Clean Editorial Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">10 Heurísticas de Jakob Nielsen</span>
            <span>·</span>
            <span>Estándares de Usabilidad UX</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => { setSelectedHeuristicId(1); setActiveTab('explorer'); }}
              className="hover:text-slate-200 transition-colors"
            >
              Laboratorio
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className="hover:text-slate-200 transition-colors"
            >
              Auditoría
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="hover:text-slate-200 transition-colors"
            >
              Desafío
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className="hover:text-slate-200 transition-colors"
            >
              Matriz
            </button>
          </div>

          <div className="text-slate-600">
            Basado en las directrices de Nielsen Norman Group (NN/g).
          </div>
        </div>
      </footer>
    </div>
  );
}
