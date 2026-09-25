import React, { useState } from 'react';
import { Brain, Eye, Clock, CheckCircle, RefreshCw } from 'lucide-react';

export const H6RecognitionPlayground: React.FC = () => {
  const [mode, setMode] = useState<'recall' | 'recognition'>('recognition');
  const [typedRecall, setTypedRecall] = useState('');
  const [recallSuccess, setRecallSuccess] = useState<boolean | null>(null);
  const [selectedAddon, setSelectedAddon] = useState<string>('fast_track');

  const addons = [
    { id: 'fast_track', title: 'Acceso Fast Track Prioritario', price: '€14.00', icon: '⚡', desc: 'Evita colas de seguridad en el aeropuerto' },
    { id: 'extra_bag', title: 'Maleta adicional en bodega (23kg)', price: '€28.00', icon: '🧳', desc: 'Despacho directo sin esperas' },
    { id: 'seat_lounge', title: 'Acceso a Sala VIP Lounge', price: '€35.00', icon: '🍸', desc: 'Comida gourmet y espacio de trabajo silencioso' },
  ];

  const handleTestRecall = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedRecall.trim().toUpperCase() === 'SKU-8924-X') {
      setRecallSuccess(true);
    } else {
      setRecallSuccess(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setMode('recall'); setRecallSuccess(null); setTypedRecall(''); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'recall'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Modo Recuerdo Puro (Recall: Memoria forzada)
          </button>
          <button
            onClick={() => { setMode('recognition'); setRecallSuccess(null); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'recognition'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Modo Reconocimiento (Opciones visuales y resumen contextual)
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Carga de memoria: <span className={mode === 'recall' ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>
            {mode === 'recall' ? 'Alta (Sobrecarga de memoria de trabajo)' : 'Mínima (Reconocimiento visual)'}
          </span>
        </div>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        {mode === 'recall' ? (
          <div className="space-y-5">
            <div className="p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-rose-200 text-xs leading-relaxed flex items-start gap-2.5">
              <Brain className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>Infracción de Heurística 06:</strong> Exige a la persona memorizar datos arbitrarios de pasos previos. El cerebro humano solo retiene ~4 elementos en la memoria de trabajo a corto plazo.
              </div>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 max-w-md mx-auto text-center">
              <div className="text-xs text-slate-400">
                Paso 3 de 4: Confirmación de Servicios Adicionales
              </div>
              <p className="text-xs text-slate-300">
                &quot;Para añadir su paquete de equipaje seleccionado en el Paso 1, escriba de memoria su código SKU único asignado:&quot;
              </p>

              <form onSubmit={handleTestRecall} className="space-y-3">
                <input
                  type="text"
                  placeholder="Ej: SKU-XXXX-X"
                  value={typedRecall}
                  onChange={(e) => setTypedRecall(e.target.value)}
                  className="w-full text-center px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 uppercase"
                />

                <button
                  type="submit"
                  className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700"
                >
                  Verificar código
                </button>
              </form>

              {recallSuccess === false && (
                <div className="p-2.5 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-lg">
                  Código incorrecto o olvidado. (El código era <span className="font-mono font-bold">SKU-8924-X</span>. ¿Quién memoriza eso?).
                </div>
              )}

              {recallSuccess === true && (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs rounded-lg">
                  ¡Increíble memoria! Pero el 94% de tus usuarios habrían abandonado el proceso aquí.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="p-3.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-200 text-xs leading-relaxed flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Cumplimiento de Heurística 06:</strong> Las opciones están presentes a la vista con iconos, precios y descripciones claras. La barra lateral resume los pasos anteriores para no tener que recordar nada.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Addons Selection (Recognition) */}
              <div className="md:col-span-2 space-y-2.5">
                <div className="text-xs font-semibold text-slate-300 pb-1">
                  Selecciona complementos para tu vuelo (Opciones visibles con 1 clic):
                </div>

                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => setSelectedAddon(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedAddon === addon.id
                        ? 'bg-indigo-950/30 border-indigo-500/60 shadow-sm'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl p-2 bg-slate-900 rounded-lg">{addon.icon}</span>
                      <div>
                        <div className="text-xs font-medium text-slate-200">{addon.title}</div>
                        <div className="text-[11px] text-slate-400">{addon.desc}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-semibold text-emerald-400 font-mono">{addon.price}</div>
                      <div className="text-[10px] text-slate-500">
                        {selectedAddon === addon.id ? 'Seleccionado ✓' : 'Añadir'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Memory Aid Sidebar (Persistent summary of previous steps) */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs">
                <div className="font-semibold text-slate-300 border-b border-slate-800 pb-2">
                  Resumen de tu Viaje (Siempre visible)
                </div>

                <div className="space-y-2 text-slate-400">
                  <div className="flex justify-between">
                    <span>Vuelo:</span>
                    <span className="text-slate-200 font-medium">MAD ➔ NRT (Directo)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pasajero:</span>
                    <span className="text-slate-200 font-medium">Laura Gómez</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Asiento elegido:</span>
                    <span className="text-slate-200 font-medium font-mono">14A (Ventana)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800/80">
                    <span>Complemento:</span>
                    <span className="text-indigo-300 font-medium">
                      {addons.find(a => a.id === selectedAddon)?.title.split(' ')[0]}...
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-slate-900 rounded text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  El usuario no tiene que memorizar ningún dato de pasos anteriores.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
