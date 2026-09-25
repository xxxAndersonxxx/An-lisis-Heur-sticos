import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Check, AlertCircle, Calendar, Lock, Trash } from 'lucide-react';

export const H5ErrorPreventionPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dates' | 'password' | 'destructive'>('dates');

  // Dates state
  const [departureDate, setDepartureDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('2026-10-18');
  const [badReturnDate, setBadReturnDate] = useState('2026-10-10'); // past date!
  const [dateMode, setDateMode] = useState<'with_prevention' | 'without_prevention'>('with_prevention');
  const [flightSubmitted, setFlightSubmitted] = useState(false);
  const [flightError, setFlightError] = useState('');

  // Password state
  const [password, setPassword] = useState('');
  const [hasSubmittedPassword, setHasSubmittedPassword] = useState(false);

  // Destructive slider state
  const [sliderVal, setSliderVal] = useState(0);
  const [projectDeleted, setProjectDeleted] = useState(false);

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateMode === 'without_prevention') {
      if (new Date(badReturnDate) < new Date(departureDate)) {
        setFlightError('¡Error al procesar reserva! La fecha de regreso no puede ser anterior a la salida. Vuelva a empezar.');
        setFlightSubmitted(false);
        return;
      }
    }
    setFlightError('');
    setFlightSubmitted(true);
  };

  // Password checks
  const isLen = password.length >= 8;
  const hasNum = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const isStrong = isLen && hasNum && hasUpper;

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('dates')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'dates' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" /> 1. Restricción de Fechas
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'password' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" /> 2. Validación de Contraseña en Vivo
        </button>
        <button
          onClick={() => setActiveTab('destructive')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'destructive' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trash className="w-3.5 h-3.5" /> 3. Acción Destructiva con Salvaguarda
        </button>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        {/* Tab 1: Dates */}
        {activeTab === 'dates' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 p-2 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400">Selector de modo:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setDateMode('without_prevention'); setFlightSubmitted(false); setFlightError(''); }}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    dateMode === 'without_prevention'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sin prevención (Permite fechas absurdas)
                </button>
                <button
                  onClick={() => { setDateMode('with_prevention'); setFlightSubmitted(false); setFlightError(''); }}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    dateMode === 'with_prevention'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Con prevención (Restricción min automática)
                </button>
              </div>
            </div>

            <form onSubmit={handleFlightSubmit} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
              <div className="text-xs font-semibold text-slate-200">
                Reserva de Vuelo Ida y Vuelta: Madrid ➔ Tokio
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Fecha de Ida</label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Fecha de Regreso</label>
                  {dateMode === 'with_prevention' ? (
                    <div>
                      <input
                        type="date"
                        min={departureDate}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-emerald-500/50 rounded-lg text-xs text-slate-200"
                      />
                      <span className="text-[11px] text-emerald-400 mt-1 block">
                        ✓ Fechas anteriores al {departureDate} bloqueadas automáticamente en el calendario.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="date"
                        value={badReturnDate}
                        onChange={(e) => setBadReturnDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-rose-500/50 rounded-lg text-xs text-slate-200"
                      />
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        ⚠ Permite seleccionar cualquier fecha del pasado sin advertencia previa.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {flightError && (
                <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {flightError}
                </div>
              )}

              {flightSubmitted && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  ¡Reserva confirmada con éxito! Las fechas seleccionadas son lógicas y coherentes.
                </div>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Comprobar disponibilidad de vuelo
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Password */}
        {activeTab === 'password' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-indigo-950/20 border border-indigo-900/40 rounded-xl text-xs text-indigo-200">
              <strong>Principio:</strong> La retroalimentación interactiva inline mientras el usuario teclea previene la frustración de pulsar &quot;Crear cuenta&quot; y recibir una lista de 4 errores.
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 max-w-lg">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Crea tu nueva contraseña segura
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Escribe para probar..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-lg text-xs text-slate-200"
                />
              </div>

              {/* Live constraint checklist */}
              <div className="space-y-1.5 pt-1 text-xs">
                <div className={`flex items-center gap-2 ${isLen ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${isLen ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'bg-slate-800 text-slate-500'}`}>
                    {isLen ? '✓' : '•'}
                  </span>
                  Mínimo 8 caracteres ({password.length}/8)
                </div>
                <div className={`flex items-center gap-2 ${hasUpper ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${hasUpper ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'bg-slate-800 text-slate-500'}`}>
                    {hasUpper ? '✓' : '•'}
                  </span>
                  Al menos una letra mayúscula
                </div>
                <div className={`flex items-center gap-2 ${hasNum ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${hasNum ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'bg-slate-800 text-slate-500'}`}>
                    {hasNum ? '✓' : '•'}
                  </span>
                  Al menos un número
                </div>
              </div>

              <button
                disabled={!isStrong}
                onClick={() => setHasSubmittedPassword(true)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors"
              >
                {isStrong ? 'Crear cuenta protegida' : 'Completa los requisitos arriba'}
              </button>

              {hasSubmittedPassword && (
                <div className="text-xs text-emerald-400 text-center font-medium">
                  ✓ Cuenta creada sin errores de validación post-envío.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Destructive Action Protection */}
        {activeTab === 'destructive' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs text-rose-200">
              <strong>Prevención de deslices críticos:</strong> Las acciones irreversibles (como eliminar bases de datos o cuentas) deben protegerse mediante fricción deliberada: confirmaciones por deslizamiento o tipeo explícito.
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 max-w-lg">
              <div className="text-xs font-semibold text-rose-300 flex items-center gap-2">
                <Trash className="w-4 h-4 text-rose-400" />
                Zona Peligrosa: Eliminar Base de Datos de Producción
              </div>
              <p className="text-xs text-slate-400">
                Para prevenir clics involuntarios, arrastra el control deslizante hasta el final (100%) para desbloquear la eliminación.
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Desliza para autorizar:</span>
                  <span className={sliderVal === 100 ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                    {sliderVal}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <button
                disabled={sliderVal < 100}
                onClick={() => setProjectDeleted(true)}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                {sliderVal === 100 ? 'Eliminar base de datos ahora' : 'Desliza hasta 100% para habilitar'}
              </button>

              {projectDeleted && (
                <div className="p-3 bg-slate-900 border border-rose-900 text-rose-300 text-xs rounded-lg text-center">
                  Base de datos eliminada de forma consciente y deliberada sin accidentes.
                  <button
                    onClick={() => { setProjectDeleted(false); setSliderVal(0); }}
                    className="ml-2 text-indigo-400 underline hover:text-indigo-300"
                  >
                    Restaurar demo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
