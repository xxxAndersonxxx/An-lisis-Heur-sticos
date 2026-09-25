import React, { useState } from 'react';
import { Search, ShoppingCart, HelpCircle, Save, CheckCircle2, AlertOctagon, RotateCcw } from 'lucide-react';

export const H4ConsistencyPlayground: React.FC = () => {
  const [styleMode, setStyleMode] = useState<'inconsistent' | 'consistent'>('consistent');
  const [fixedItems, setFixedItems] = useState<{ [key: string]: boolean }>({});

  const toggleFix = (key: string) => {
    setFixedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setFixedItems({});
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setStyleMode('inconsistent'); resetAll(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              styleMode === 'inconsistent'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mala práctica (Caos de estándares e inconsistencias)
          </button>
          <button
            onClick={() => { setStyleMode('consistent'); resetAll(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              styleMode === 'consistent'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Buena práctica (Estándares de la industria y Design System)
          </button>
        </div>

        <button
          onClick={resetAll}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restaurar estado
        </button>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        {styleMode === 'inconsistent' ? (
          <div className="p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-rose-200 text-xs leading-relaxed flex items-start gap-2.5">
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong>Infracción de Heurística 04:</strong> Iconos que no corresponden con la convención estándar (un ancla para el carrito), botones con colores invertidos (rojo para guardar, verde para descartar) y posiciones invertidas que generan confusión motriz.
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-200 text-xs leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>Cumplimiento de Heurística 04:</strong> Alineado a la Ley de Jakob. Los patrones de navegación, iconos, botones y semántica de color siguen las convenciones universales que el usuario ya conoce.
            </div>
          </div>
        )}

        {/* Live Mock Header Comparison */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-5">
          <div className="text-xs font-medium text-slate-400">
            Vista previa de interfaz (Simulación de barra de navegación y carrito):
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-lg flex flex-wrap items-center justify-between gap-4">
            {/* Logo / Brand */}
            <div className="font-bold tracking-tight text-sm text-slate-100">
              TiendaNórdica
            </div>

            {/* Search Input with standard or weird icon */}
            <div className="flex-1 max-w-xs relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500">
                {styleMode === 'inconsistent' && !fixedItems['search'] ? (
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </div>
              <input
                type="text"
                readOnly
                value="Buscar productos..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-300"
              />
              {styleMode === 'inconsistent' && !fixedItems['search'] && (
                <button
                  onClick={() => toggleFix('search')}
                  className="absolute right-2 top-2 text-[10px] text-amber-400 underline hover:text-amber-300"
                >
                  (Reparar icono)
                </button>
              )}
            </div>

            {/* Cart & Profile Area */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => styleMode === 'inconsistent' && toggleFix('cart')}
                className="flex items-center gap-1.5 p-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs"
                title="Carrito de compras"
              >
                {styleMode === 'inconsistent' && !fixedItems['cart'] ? (
                  <span className="text-xs text-rose-300 flex items-center gap-1">
                    ⚓ [Ancla]
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShoppingCart className="w-4 h-4" /> Carrito (2)
                  </span>
                )}
              </button>

              <div className="w-7 h-7 rounded-full bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center text-xs font-semibold text-indigo-200">
                JD
              </div>
            </div>
          </div>

          {/* Form Action Button Bar */}
          <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-lg space-y-3">
            <div className="text-xs text-slate-300 font-medium">
              Acciones de formulario: Edición de dirección de envío
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              {styleMode === 'inconsistent' && !fixedItems['buttons'] ? (
                <>
                  {/* Dangerously swapped semantics: RED for save, GREEN for cancel */}
                  <button
                    onClick={() => toggleFix('buttons')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-sm border-2 border-dashed border-rose-400"
                    title="¡Color rojo erróneo para guardar!"
                  >
                    Guardar dirección (Rojo confuso)
                  </button>
                  <button
                    onClick={() => toggleFix('buttons')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-full"
                    title="¡Color verde erróneo para cancelar!"
                  >
                    Descartar cambios (Verde)
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" /> Guardar cambios
                  </button>
                </>
              )}
            </div>

            {styleMode === 'inconsistent' && (
              <div className="text-[11px] text-amber-300 bg-amber-950/20 p-2 rounded border border-amber-900/40">
                Haz clic en los botones o enlaces señalados arriba para corregir las inconsistencias semánticas y aplicar el estándar universal.
              </div>
            )}
          </div>
        </div>

        {/* Jakob's Law Principles Card */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2">
          <div className="font-semibold text-slate-300">
            La Ley de Jakob (Jakob&apos;s Law):
          </div>
          <p className="text-slate-400 leading-relaxed">
            &quot;Los usuarios pasan el 99% de su tiempo en sitios web distintos al tuyo&quot;. Esto significa que ya tienen modelos mentales consolidados sobre cómo funciona un carrito, un buscador o un botón de guardar. Forzarlos a aprender reglas inventadas multiplica el abandono y los deslices.
          </p>
        </div>
      </div>
    </div>
  );
};
