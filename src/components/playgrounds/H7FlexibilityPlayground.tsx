import React, { useState, useEffect } from 'react';
import { Zap, User, Command, CheckSquare, Square, Archive, Trash2, ArrowDown, ArrowUp } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  sender: string;
  priority: 'Alta' | 'Media' | 'Baja';
  archived: boolean;
}

export const H7FlexibilityPlayground: React.FC = () => {
  const [userRole, setUserRole] = useState<'novice' | 'expert'>('expert');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Revisión heurística de la pantalla de checkout', sender: 'Equipo UX', priority: 'Alta', archived: false },
    { id: 2, title: 'Aprobación de presupuesto para pruebas con usuarios', sender: 'Dirección', priority: 'Media', archived: false },
    { id: 3, title: 'Actualizar tokens en el repositorio de Figma', sender: 'Frontend Dev', priority: 'Baja', archived: false },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [lastActionMsg, setLastActionMsg] = useState('');

  const activeTasks = tasks.filter(t => !t.archived);

  // Keyboard shortcut listener for Expert mode
  useEffect(() => {
    if (userRole !== 'expert') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(activeTasks.length - 1, prev + 1));
        setLastActionMsg('Atajo: Tecla [J] ➔ Siguiente elemento');
      } else if (e.key === 'k' || e.key === 'K' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
        setLastActionMsg('Atajo: Tecla [K] ➔ Elemento anterior');
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        if (activeTasks[selectedIndex]) {
          archiveTask(activeTasks[selectedIndex].id);
          setLastActionMsg(`Atajo: Tecla [E] ➔ Archivado "${activeTasks[selectedIndex].title.slice(0, 20)}..."`);
        }
      } else if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        if (activeTasks[selectedIndex]) {
          toggleSelect(activeTasks[selectedIndex].id);
          setLastActionMsg('Atajo: Tecla [X] ➔ Seleccionar casilla');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userRole, activeTasks, selectedIndex]);

  const archiveTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, archived: true } : t));
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const archiveBatch = () => {
    setTasks(tasks.map(t => selectedIds.includes(t.id) ? { ...t, archived: true } : t));
    setSelectedIds([]);
    setLastActionMsg(`Acción masiva: ${selectedIds.length} elementos archivados en 0.2 seg.`);
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    if (selectedIds.length === activeTasks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(activeTasks.map(t => t.id));
    }
  };

  const resetTasks = () => {
    setTasks(tasks.map(t => ({ ...t, archived: false })));
    setSelectedIds([]);
    setSelectedIndex(0);
    setLastActionMsg('');
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setUserRole('novice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              userRole === 'novice'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Modo Principiante (Flujo visual guiado)
          </button>
          <button
            onClick={() => setUserRole('expert')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              userRole === 'expert'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Modo Experto (Atajos de teclado y acciones por lote)
          </button>
        </div>

        <button
          onClick={resetTasks}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          Restaurar tareas
        </button>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
        {userRole === 'novice' ? (
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300">
            <strong>Experiencia para principiantes:</strong> Botones explícitos con etiquetas completas, sin asumir conocimiento previo. Todo se realiza cómodamente con el cursor.
          </div>
        ) : (
          <div className="p-3.5 bg-amber-950/30 border border-amber-900/50 rounded-xl text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <Command className="w-4 h-4 text-amber-400" />
              Aceleradores activos (Pruébalos directamente en tu teclado físico):
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-amber-100 font-mono">
              <span className="px-2 py-0.5 bg-slate-900 rounded border border-amber-500/30"><kbd>J</kbd> Bajar</span>
              <span className="px-2 py-0.5 bg-slate-900 rounded border border-amber-500/30"><kbd>K</kbd> Subir</span>
              <span className="px-2 py-0.5 bg-slate-900 rounded border border-amber-500/30"><kbd>X</kbd> Marcar</span>
              <span className="px-2 py-0.5 bg-slate-900 rounded border border-amber-500/30"><kbd>E</kbd> Archivar</span>
            </div>
          </div>
        )}

        {/* Batch Operations Bar (Expert mode) */}
        {userRole === 'expert' && activeTasks.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white"
              >
                {selectedIds.length === activeTasks.length ? (
                  <CheckSquare className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>Seleccionar todas ({activeTasks.length})</span>
              </button>
              {selectedIds.length > 0 && (
                <span className="text-slate-500">· {selectedIds.length} seleccionadas</span>
              )}
            </div>

            {selectedIds.length > 0 && (
              <button
                onClick={archiveBatch}
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold rounded-lg transition-colors text-xs"
              >
                <Archive className="w-3.5 h-3.5" /> Archivar en lote ({selectedIds.length})
              </button>
            )}
          </div>
        )}

        {/* Live Task Feed */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
          {activeTasks.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Bandeja despejada. Todas las tareas han sido procesadas con máxima eficiencia.
            </div>
          ) : (
            activeTasks.map((task, index) => {
              const isSelectedRow = userRole === 'expert' && selectedIndex === index;
              const isChecked = selectedIds.includes(task.id);

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedIndex(index)}
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                    isSelectedRow
                      ? 'border-indigo-500/70 bg-indigo-950/20'
                      : 'border-slate-800/80 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {userRole === 'expert' ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSelect(task.id); }}
                        className="text-slate-400 hover:text-white"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                    ) : null}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-200">{task.title}</span>
                        {isSelectedRow && userRole === 'expert' && (
                          <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                            [Foco activo]
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {task.sender} · Prioridad: {task.priority}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => archiveTask(task.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-md transition-colors text-xs"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      {userRole === 'novice' ? 'Mover al archivo' : 'Archivar'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Live feedback of accelerator used */}
        {lastActionMsg && (
          <div className="text-xs text-amber-300 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            {lastActionMsg}
          </div>
        )}
      </div>
    </div>
  );
};
