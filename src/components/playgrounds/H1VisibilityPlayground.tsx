import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Wifi, Database } from 'lucide-react';

export const H1VisibilityPlayground: React.FC = () => {
  const [mode, setMode] = useState<'bad' | 'good'>('good');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [badClickCount, setBadClickCount] = useState(0);
  const [badStatus, setBadStatus] = useState<string>('');
  const [networkSpeed, setNetworkSpeed] = useState<'fast' | 'slow'>('fast');

  // Good UX Progress animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === 'good' && isProcessing) {
      const stepDuration = networkSpeed === 'fast' ? 70 : 180;
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsProcessing(false);
            setStep(3);
            return 100;
          }
          const next = prev + 2;
          if (next > 40 && next < 80) setStep(2);
          return next;
        });
      }, stepDuration);
    }
    return () => clearInterval(interval);
  }, [mode, isProcessing, networkSpeed]);

  const handleBadClick = () => {
    setBadClickCount((c) => c + 1);
    setBadStatus('procesando en silencio');
    // Simulate blind delay
    setTimeout(() => {
      if (badClickCount > 2) {
        setBadStatus('¡Advertencia! Peticiones duplicadas en el servidor por clics múltiples.');
      } else {
        setBadStatus('Completado tras espera a ciegas.');
      }
    }, 3500);
  };

  const handleStartGood = () => {
    setProgress(0);
    setStep(1);
    setIsProcessing(true);
  };

  const handleReset = () => {
    setIsProcessing(false);
    setProgress(0);
    setStep(1);
    setBadClickCount(0);
    setBadStatus('');
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setMode('bad'); handleReset(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'bad'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mala práctica (Sin feedback)
          </button>
          <button
            onClick={() => { setMode('good'); handleReset(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'good'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Buena práctica (Feedback transparente)
          </button>
        </div>

        {mode === 'good' && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Velocidad de red:</span>
            <button
              onClick={() => setNetworkSpeed('fast')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                networkSpeed === 'fast' ? 'bg-slate-700 text-white font-medium' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Fibra (Rápida)
            </button>
            <button
              onClick={() => setNetworkSpeed('slow')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                networkSpeed === 'slow' ? 'bg-slate-700 text-white font-medium' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              3G Móvil
            </button>
          </div>
        )}
      </div>

      {/* Interactive Canvas */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        {mode === 'bad' ? (
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-rose-200 text-xs leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>Deficiencia UX:</strong> Al hacer clic, el botón no cambia, no hay cursor de espera, ni porcentaje. El usuario no sabe si el sistema se colgó o si recibió la orden, induciendo a clics repetitivos.
              </div>
            </div>

            <div className="py-8 text-center space-y-4">
              <p className="text-sm text-slate-300 font-medium">
                Simulador: Envío de balance contable de 2.4 GB
              </p>

              <button
                onClick={handleBadClick}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-sm font-medium rounded-lg transition-colors border border-slate-700"
              >
                Subir y procesar reporte
              </button>

              <div className="text-xs text-slate-500">
                (Haz clic repetidas veces para experimentar la incertidumbre)
              </div>

              {badClickCount > 0 && (
                <div className="max-w-md mx-auto p-4 bg-slate-950 border border-slate-800 rounded-xl text-left space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Intentos de clic registrados:</span>
                    <span className="font-mono text-amber-400 font-bold">{badClickCount}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Estado visible para el usuario:{' '}
                    <span className="text-slate-200 font-mono">
                      {badStatus || 'Sin respuesta en pantalla...'}
                    </span>
                  </div>
                  {badClickCount >= 3 && (
                    <p className="text-xs text-rose-400 pt-1 border-t border-slate-800/80">
                      El servidor recibió {badClickCount} solicitudes idénticas. Riesgo de transacciones duplicadas y bloqueo de base de datos.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-3.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-200 text-xs leading-relaxed">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Alineado a Heurística 01:</strong> Información en tiempo real. Retroalimentación visual inmediata (&lt;100ms), desglose por fases, porcentaje, tasa de transferencia y estimación de tiempo restante.
              </div>
            </div>

            {/* Live System Header Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">Servidor activo</span>
                <span className="text-slate-600">·</span>
                <span>Latencia: 24ms</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-slate-400" /> {networkSpeed === 'fast' ? '120 Mbps' : '4.5 Mbps'}
                </span>
                <span className="flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-slate-400" /> Almacén en la nube
                </span>
              </div>
            </div>

            {/* Process Stage Flow */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div
                className={`p-2.5 rounded-lg border transition-colors ${
                  step === 1
                    ? 'border-indigo-500/50 bg-indigo-950/20 text-indigo-300 font-medium'
                    : progress > 40
                    ? 'border-emerald-500/30 bg-emerald-950/10 text-emerald-400'
                    : 'border-slate-800 bg-slate-950/50 text-slate-500'
                }`}
              >
                1. Validación de integridad
              </div>
              <div
                className={`p-2.5 rounded-lg border transition-colors ${
                  step === 2
                    ? 'border-indigo-500/50 bg-indigo-950/20 text-indigo-300 font-medium'
                    : progress >= 100
                    ? 'border-emerald-500/30 bg-emerald-950/10 text-emerald-400'
                    : 'border-slate-800 bg-slate-950/50 text-slate-500'
                }`}
              >
                2. Cifrado y transferencia
              </div>
              <div
                className={`p-2.5 rounded-lg border transition-colors ${
                  progress === 100
                    ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 font-medium'
                    : 'border-slate-800 bg-slate-950/50 text-slate-500'
                }`}
              >
                3. Sincronización exitosa
              </div>
            </div>

            {/* Visual Meter & Details */}
            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  {isProcessing
                    ? step === 1
                      ? 'Analizando paquetes y firma digital...'
                      : 'Subiendo paquetes binarios a la nube...'
                    : progress === 100
                    ? 'Transferencia completada correctamente'
                    : 'Listo para iniciar transferencia de 2.4 GB'}
                </span>
                <span className="font-mono text-indigo-400 font-semibold">{progress}%</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 font-mono">
                <span>
                  {progress > 0 ? `${((progress / 100) * 2.4).toFixed(2)} GB de 2.4 GB` : '0 MB de 2.4 GB'}
                </span>
                <span>
                  {isProcessing
                    ? networkSpeed === 'fast'
                      ? `~${Math.max(1, Math.round((100 - progress) / 30))} seg restantes`
                      : `~${Math.max(1, Math.round((100 - progress) / 12))} seg restantes`
                    : progress === 100
                    ? '0 seg restantes'
                    : 'Espera estimada: ~3 seg'}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleStartGood}
                disabled={isProcessing}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                {isProcessing ? 'Procesando...' : progress === 100 ? 'Volver a transferir' : 'Iniciar transferencia guiada'}
              </button>
              {(isProcessing || progress > 0) && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
