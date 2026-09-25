import React, { useState, useEffect } from 'react';
import { RotateCcw, AlertTriangle, Check, X, Undo2, Redo2, Send, Trash2, ArrowLeft } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  category: string;
}

export const H3ControlFreedomPlayground: React.FC = () => {
  const [mode, setMode] = useState<'bad' | 'good'>('good');
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'Especificaciones del sistema de diseño', category: 'UX Design' },
    { id: 2, title: 'Minuta de reunión con clientes', category: 'Gestión' },
    { id: 3, title: 'Checklist de accesibilidad WCAG 2.2', category: 'Auditoría' },
  ]);
  const [deletedNote, setDeletedNote] = useState<Note | null>(null);
  const [undoTimer, setUndoTimer] = useState<number>(0);
  const [badModalOpen, setBadModalOpen] = useState(false);
  const [goodModalOpen, setGoodModalOpen] = useState(false);
  const [history, setHistory] = useState<Note[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Undo timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (undoTimer > 0) {
      interval = setInterval(() => {
        setUndoTimer((prev) => {
          if (prev <= 1) {
            setDeletedNote(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [undoTimer]);

  // Escape key handler for Good Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && goodModalOpen) {
        setGoodModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goodModalOpen]);

  const handleDelete = (note: Note) => {
    if (mode === 'bad') {
      // Bad: No undo, deleted forever instantly
      setNotes(notes.filter(n => n.id !== note.id));
    } else {
      // Good: Save state, show undo toast with timer
      setDeletedNote(note);
      setUndoTimer(8);
      setNotes(notes.filter(n => n.id !== note.id));
    }
  };

  const handleUndo = () => {
    if (deletedNote) {
      setNotes([deletedNote, ...notes]);
      setDeletedNote(null);
      setUndoTimer(0);
    }
  };

  const resetAllNotes = () => {
    setNotes([
      { id: 1, title: 'Especificaciones del sistema de diseño', category: 'UX Design' },
      { id: 2, title: 'Minuta de reunión con clientes', category: 'Gestión' },
      { id: 3, title: 'Checklist de accesibilidad WCAG 2.2', category: 'Auditoría' },
    ]);
    setDeletedNote(null);
    setUndoTimer(0);
    setBadModalOpen(false);
    setGoodModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setMode('bad'); resetAllNotes(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'bad'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mala práctica (Trampa sin salida ni Deshacer)
          </button>
          <button
            onClick={() => { setMode('good'); resetAllNotes(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'good'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Buena práctica (Salidas de emergencia y Deshacer)
          </button>
        </div>
        <button
          onClick={resetAllNotes}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reiniciar notas
        </button>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        {mode === 'bad' ? (
          <div className="p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-rose-200 text-xs leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong>Infracción de Heurística 03:</strong> Al borrar una nota por error, desaparece instantáneamente sin opción de deshacer. Además, al abrir el modal de subida queda &quot;atrapado&quot; sin botón X ni cancelar ni respuesta a tecla Esc.
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-200 text-xs leading-relaxed flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>Cumplimiento de Heurística 03:</strong> Salida de emergencia visible (botón Cancelar, tecla Escape, clic exterior) y mecanismo de recuperación inmediata mediante toast de &quot;Deshacer&quot; con temporizador de seguridad.
            </div>
          </div>
        )}

        {/* Action Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (mode === 'bad') setBadModalOpen(true);
              else setGoodModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Abrir asistente de publicación
          </button>
          <span className="text-xs text-slate-400">
            Prueba a eliminar una nota para ver si existe marcha atrás.
          </span>
        </div>

        {/* Notes Interactive List */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-300 pb-2 border-b border-slate-800">
            Lista de documentos activos ({notes.length})
          </div>

          {notes.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              Has eliminado todas las notas. Pulsa &quot;Reiniciar notas&quot; para volver a probar.
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800/80 rounded-lg text-xs"
              >
                <div>
                  <div className="font-medium text-slate-200">{note.title}</div>
                  <div className="text-slate-500 text-[11px]">{note.category}</div>
                </div>
                <button
                  onClick={() => handleDelete(note)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 rounded-md transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {/* Undo Floating Notification (Only in Good Mode) */}
        {mode === 'good' && deletedNote && (
          <div className="p-3.5 bg-indigo-950/90 border border-indigo-500/50 rounded-xl shadow-lg flex items-center justify-between text-xs text-indigo-100 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>
                Nota &quot;<strong>{deletedNote.title}</strong>&quot; eliminada. Se descartará en {undoTimer}s.
              </span>
            </div>
            <button
              onClick={handleUndo}
              className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition-colors text-xs"
            >
              <Undo2 className="w-3.5 h-3.5" /> Deshacer acción
            </button>
          </div>
        )}

        {/* Bad Modal (Trap) */}
        {badModalOpen && (
          <div className="p-5 bg-slate-950 border border-rose-500/40 rounded-xl space-y-3 relative">
            <div className="text-sm font-semibold text-rose-300">
              Asistente de Publicación (Atrapado)
            </div>
            <p className="text-xs text-slate-400">
              Nota cómo este diálogo no tiene botón de cerrar &quot;X&quot;, no hay botón Cancelar y presionar la tecla Esc no tiene ningún efecto. El usuario se siente acorralado.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setBadModalOpen(false)}
                className="text-[11px] text-slate-600 hover:text-slate-400 underline"
              >
                (Solo para demo: forzar escape)
              </button>
            </div>
          </div>
        )}

        {/* Good Modal (Emergency Exit) */}
        {goodModalOpen && (
          <div className="p-5 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-3 relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="text-sm font-semibold text-slate-200">
                Asistente de Publicación de Documentos
              </div>
              <button
                onClick={() => setGoodModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                title="Cerrar (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cuenta con salida de emergencia evidente: botón &quot;Cancelar&quot;, cruz de cierre &quot;X&quot; y escucha activa de la tecla <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[11px] font-mono text-slate-300">Esc</kbd>.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setGoodModalOpen(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
              >
                Cancelar y regresar
              </button>
              <button
                onClick={() => setGoodModalOpen(false)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Confirmar y enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
