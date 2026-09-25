import React, { useState } from 'react';
import { AlertCircle, CheckCircle, RefreshCw, Upload, CreditCard, Mail, Sparkles, ArrowRight } from 'lucide-react';

export const H9ErrorRecoveryPlayground: React.FC = () => {
  const [errorScenario, setErrorScenario] = useState<'filesize' | 'email' | 'card'>('filesize');
  const [errorMode, setErrorMode] = useState<'bad' | 'good'>('good');
  const [recovered, setRecovered] = useState(false);

  const resetAll = () => {
    setRecovered(false);
  };

  const handleRecover = () => {
    setRecovered(true);
  };

  return (
    <div className="space-y-6">
      {/* Scenarios Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setErrorScenario('filesize'); resetAll(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              errorScenario === 'filesize' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Caso 1: Archivo demasiado pesado
          </button>
          <button
            onClick={() => { setErrorScenario('email'); resetAll(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              errorScenario === 'email' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Caso 2: Error en formato de correo
          </button>
          <button
            onClick={() => { setErrorScenario('card'); resetAll(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              errorScenario === 'card' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" /> Caso 3: Tarjeta vencida
          </button>
        </div>

        <button
          onClick={resetAll}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reiniciar prueba
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => { setErrorMode('bad'); resetAll(); }}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
            errorMode === 'bad'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Mensaje Críptico Deficiente (Mala Práctica)
        </button>
        <button
          onClick={() => { setErrorMode('good'); resetAll(); }}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
            errorMode === 'good'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Diagnóstico y Recuperación Constructiva (Buena Práctica)
        </button>
      </div>

      {/* Interactive Error Display */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        {recovered ? (
          <div className="p-6 bg-emerald-950/30 border border-emerald-500/50 rounded-xl text-center space-y-3">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-semibold text-emerald-300">
              ¡Problema solucionado con éxito!
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Al ofrecer una solución constructiva en un solo clic, el usuario recuperó el control de su tarea en menos de 5 segundos sin frustración ni llamadas a soporte.
            </p>
          </div>
        ) : errorMode === 'bad' ? (
          <div className="space-y-4">
            <div className="p-4 bg-rose-950/40 border border-rose-800 text-rose-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                {errorScenario === 'filesize' && 'STATUS 413: PAYLOAD_TOO_LARGE at multipart_boundary_stream'}
                {errorScenario === 'email' && 'REGEX_PARSE_FAIL: String does not conform to RFC-5322 specs'}
                {errorScenario === 'card' && 'GATEWAY_DECLINE_CODE 88: INVALID_EXPIRATION_EPOCH'}
              </div>
              <p className="text-xs text-rose-200/80 font-mono">
                Unhandled exception in thread #04. Contact your system administrator if problem persists.
              </p>
            </div>

            <div className="text-xs text-slate-400 p-3 bg-slate-950 rounded-lg">
              <strong>Análisis de la infracción:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1 text-slate-400">
                <li>Usa códigos hexadecimales y términos de servidor incomprensibles.</li>
                <li>No explica qué falló en términos del usuario.</li>
                <li>No ofrece ningún botón ni ruta para solucionar o enmendar la situación.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-5 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-100">
                    {errorScenario === 'filesize' && 'El archivo es demasiado pesado (45 MB)'}
                    {errorScenario === 'email' && 'Parece que falta el dominio en tu correo'}
                    {errorScenario === 'card' && 'Tu tarjeta bancaria está vencida'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {errorScenario === 'filesize' && 'El límite máximo por archivo en este formulario es de 10 MB. Podemos comprimirlo automáticamente o puedes elegir otro archivo de menor peso.'}
                    {errorScenario === 'email' && 'Has escrito "carlos.mendez@". Asegúrate de incluir el dominio completo, por ejemplo: carlos.mendez@empresa.com.'}
                    {errorScenario === 'card' && 'La fecha de vencimiento ingresada (08/24) ya ha pasado. Puedes actualizar la fecha de vencimiento o seleccionar otro método de pago.'}
                  </p>
                </div>
              </div>

              {/* Constructive 1-click recovery actions */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                {errorScenario === 'filesize' && (
                  <>
                    <button
                      onClick={handleRecover}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Comprimir automáticamente a 8.5 MB y continuar
                    </button>
                    <button
                      onClick={handleRecover}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                    >
                      Elegir otro archivo
                    </button>
                  </>
                )}

                {errorScenario === 'email' && (
                  <>
                    <button
                      onClick={handleRecover}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Completar con @gmail.com
                    </button>
                    <button
                      onClick={handleRecover}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                    >
                      Editar dirección a mano
                    </button>
                  </>
                )}

                {errorScenario === 'card' && (
                  <>
                    <button
                      onClick={handleRecover}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Pagar con PayPal o Apple Pay
                    </button>
                    <button
                      onClick={handleRecover}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                    >
                      Actualizar datos de tarjeta
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Heuristic 9 Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-2">
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">1. Diagnóstico Claro</span>
            Explica exactamente qué falló en lenguaje llano, sin culpar al usuario.
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">2. Localización Precisa</span>
            Señala visualmente el elemento exacto que necesita ser corregido.
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">3. Solución Constructiva</span>
            Proporciona un botón o atajo que resuelva el error de inmediato.
          </div>
        </div>
      </div>
    </div>
  );
};
