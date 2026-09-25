import React, { useState } from 'react';
import { Trash2, Folder, FileText, ShoppingBag, AlertCircle, Sparkles, ArrowRight, Undo } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  date: string;
  inTrash: boolean;
}

export const H2RealWorldPlayground: React.FC = () => {
  const [viewMode, setViewMode] = useState<'jargon' | 'natural'>('natural');
  const [files, setFiles] = useState<FileItem[]>([
    { id: 'f1', name: 'Presupuesto_Renovacion_2026.pdf', size: '2.4 MB', date: 'Hoy, 10:30', inTrash: false },
    { id: 'f2', name: 'Fotografia_Equipo_Diseño.jpg', size: '4.8 MB', date: 'Ayer', inTrash: false },
    { id: 'f3', name: 'Borrador_Contrato_Servicios.docx', size: '820 KB', date: '21 Sep', inTrash: false },
  ]);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const trashCount = files.filter(f => f.inTrash).length;

  const moveToTrash = (id: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, inTrash: true } : f));
    setActiveModal(null);
  };

  const restoreAll = () => {
    setFiles(files.map(f => ({ ...f, inTrash: false })));
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode('jargon')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              viewMode === 'jargon'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Modo Jerga Técnica (Orientado a la máquina)
          </button>
          <button
            onClick={() => setViewMode('natural')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              viewMode === 'natural'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Modo Mundo Real (Metáforas familiares y humano)
          </button>
        </div>
        <div className="text-xs text-slate-400">
          Metáforas físicas: <span className="text-slate-300">Carpetas, Papelera, Documentos</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        {/* Banner Insight */}
        {viewMode === 'jargon' ? (
          <div className="p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-rose-200 text-xs leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong>Infracción de Heurística 02:</strong> Utiliza identificadores de bloque de disco, códigos hexadecimales y términos de servidor que confunden e intimidan a los usuarios.
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-200 text-xs leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>Cumplimiento de Heurística 02:</strong> Se usan metáforas del mundo físico (la papelera donde un papel arrugado puede sacarse antes de quemar la basura, carpetas de oficina, fechas relativas como &quot;Hoy&quot; o &quot;Ayer&quot;).
            </div>
          </div>
        )}

        {/* File Manager UI */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-slate-200">
                {viewMode === 'jargon' ? 'ROOT_VOL_FS_EXT4 /dev/nvme0n1p2' : 'Mis Documentos de Proyecto'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {viewMode === 'jargon' ? `INODE_PURGE_QUEUE [${trashCount}]` : `Papelera (${trashCount})`}
                </span>
              </div>
              {trashCount > 0 && (
                <button
                  onClick={restoreAll}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  <Undo className="w-3 h-3" /> {viewMode === 'jargon' ? 'ROLLBACK_INODES' : 'Restaurar todo'}
                </button>
              )}
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-2">
            {files.filter(f => !f.inTrash).length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500">
                {viewMode === 'jargon' ? 'NULL_SET: NO ENTRIES IN DIRECTORY' : 'La carpeta está vacía. Todos los archivos están en la papelera.'}
              </div>
            ) : (
              files.filter(f => !f.inTrash).map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-lg transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-200">
                        {viewMode === 'jargon' ? `BLOB_ID_${file.id.toUpperCase()}_0x8849.bin` : file.name}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {viewMode === 'jargon'
                          ? `BYTES: 2516582 | EPOCH_TS: 1790382900 | CHMOD 0644`
                          : `${file.size} · Modificado ${file.date}`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(file.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      viewMode === 'jargon'
                        ? 'bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 font-mono text-[11px]'
                        : 'bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-200'
                    }`}
                  >
                    {viewMode === 'jargon' ? 'SIGKILL_INODE' : 'Enviar a la Papelera'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal for Deletion */}
        {activeModal && (
          <div className="p-4 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-slate-200">
              {viewMode === 'jargon'
                ? 'CONFIRM EXEC: UNLINK() ON DESCRIPTOR 0x9B1?'
                : '¿Quieres mover este documento a la Papelera?'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {viewMode === 'jargon'
                ? 'WARNING: MEMORY ADDRESS WILL BE MARKED DIRTY. ZERO FLUSH TO SECTOR.'
                : 'No te preocupes: el archivo permanecerá en tu Papelera de reciclaje durante 30 días antes de eliminarse de forma permanente.'}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => moveToTrash(activeModal)}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg transition-colors"
              >
                {viewMode === 'jargon' ? 'EXECUTE UNLINK' : 'Mover a la papelera'}
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
              >
                {viewMode === 'jargon' ? 'ABORT 0' : 'Cancelar'}
              </button>
            </div>
          </div>
        )}

        {/* Comparative Vocabulary Table */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="text-xs font-semibold text-slate-300 mb-3">
            Glosario interactivo: De Jerga de Sistema a Lenguaje del Mundo Real
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-950/70 border border-slate-800/70 rounded-lg flex items-center justify-between">
              <span className="font-mono text-rose-400 text-[11px]">&quot;Terminar subrutina&quot;</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 mx-1 shrink-0" />
              <span className="font-medium text-emerald-400">&quot;Cerrar sesión&quot;</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 border border-slate-800/70 rounded-lg flex items-center justify-between">
              <span className="font-mono text-rose-400 text-[11px]">&quot;Commit a tabla_tmp&quot;</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 mx-1 shrink-0" />
              <span className="font-medium text-emerald-400">&quot;Guardar borrador&quot;</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 border border-slate-800/70 rounded-lg flex items-center justify-between">
              <span className="font-mono text-rose-400 text-[11px]">&quot;Null pointer en payload&quot;</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 mx-1 shrink-0" />
              <span className="font-medium text-emerald-400">&quot;Falta completar tu correo&quot;</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 border border-slate-800/70 rounded-lg flex items-center justify-between">
              <span className="font-mono text-rose-400 text-[11px]">&quot;Reasignar descriptor&quot;</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 mx-1 shrink-0" />
              <span className="font-medium text-emerald-400">&quot;Cambiar nombre a la carpeta&quot;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
