import React, { useState } from 'react';
import { NIELSEN_HEURISTICS } from '../data/heuristicsData';
import { AuditRating } from '../types/heuristics';
import { Copy, Download, Check, AlertOctagon, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

const SEVERITY_LABELS: Record<number, { label: string; desc: string; color: string; badgeBg: string }> = {
  0: { label: '0 - Sin problemas', desc: 'Cumple perfectamente la heurística', color: 'text-emerald-400', badgeBg: 'bg-emerald-950/40 text-emerald-300 border-emerald-800' },
  1: { label: '1 - Cosmético', desc: 'No interfiere con la tarea, detalle estético', color: 'text-blue-400', badgeBg: 'bg-blue-950/40 text-blue-300 border-blue-800' },
  2: { label: '2 - Menor', desc: 'Causa molestia pero el usuario puede continuar', color: 'text-amber-400', badgeBg: 'bg-amber-950/40 text-amber-300 border-amber-800' },
  3: { label: '3 - Mayor', desc: 'Dificulta seriamente la tarea; alta prioridad', color: 'text-orange-400', badgeBg: 'bg-orange-950/40 text-orange-300 border-orange-800' },
  4: { label: '4 - Catástrofe', desc: 'Bloquea la tarea por completo; imperativo corregir', color: 'text-rose-400', badgeBg: 'bg-rose-950/40 text-rose-300 border-rose-800' },
};

export const AuditTool: React.FC = () => {
  const [projectName, setProjectName] = useState('Mi Aplicación Web / Tienda Online');
  const [evaluatorName, setEvaluatorName] = useState('Auditor UX');
  const [copied, setCopied] = useState(false);

  const [ratings, setRatings] = useState<Record<number, AuditRating>>(() => {
    const initial: Record<number, AuditRating> = {};
    NIELSEN_HEURISTICS.forEach(h => {
      initial[h.id] = {
        heuristicId: h.id,
        severity: 0,
        notes: '',
        recommendation: ''
      };
    });
    return initial;
  });

  const handleSeverityChange = (heuristicId: number, severity: 0 | 1 | 2 | 3 | 4) => {
    setRatings(prev => ({
      ...prev,
      [heuristicId]: {
        ...prev[heuristicId],
        severity
      }
    }));
  };

  const handleNotesChange = (heuristicId: number, notes: string) => {
    setRatings(prev => ({
      ...prev,
      [heuristicId]: {
        ...prev[heuristicId],
        notes
      }
    }));
  };

  const handleRecommendationChange = (heuristicId: number, recommendation: string) => {
    setRatings(prev => ({
      ...prev,
      [heuristicId]: {
        ...prev[heuristicId],
        recommendation
      }
    }));
  };

  const loadSampleAudit = () => {
    setProjectName('Portal de Pagos y Facturación SaaS');
    setEvaluatorName('Equipo de Experiencia de Usuario');
    setRatings({
      1: { heuristicId: 1, severity: 2, notes: 'Al generar facturas masivas tarda 4s sin barra de progreso.', recommendation: 'Implementar spinner y porcentaje de avance en segundo plano.' },
      2: { heuristicId: 2, severity: 1, notes: 'En algunas pantallas se usa el término "Payload UUID" en lugar de "Código de recibo".', recommendation: 'Cambiar a términos familiares para contadores.' },
      3: { heuristicId: 3, severity: 3, notes: 'No hay opción de "Deshacer" al eliminar un cliente de la lista.', recommendation: 'Agregar toast de recuperación con ventana de 15 segundos.' },
      4: { heuristicId: 4, severity: 0, notes: 'La barra de navegación e iconos se ajustan al estándar de la industria.', recommendation: 'Mantener la biblioteca de iconos unificada.' },
      5: { heuristicId: 5, severity: 3, notes: 'Permite ingresar fechas de fin anteriores a las fechas de inicio en los filtros.', recommendation: 'Bloquear fechas no válidas en el calendario interactivo.' },
      6: { heuristicId: 6, severity: 1, notes: 'El buscador no muestra los últimos 5 términos consultados.', recommendation: 'Añadir lista de búsquedas recientes en el dropdown.' },
      7: { heuristicId: 7, severity: 2, notes: 'Los usuarios avanzados no tienen atajos para validar facturas.', recommendation: 'Habilitar atajo de teclado Shift+Enter para aprobación rápida.' },
      8: { heuristicId: 8, severity: 1, notes: 'Hay tres banners informativos apilados en la vista principal.', recommendation: 'Consolidar las alertas en un centro de notificaciones.' },
      9: { heuristicId: 9, severity: 3, notes: 'El error de tarjeta solo dice "DECLINED 04" sin guiar cómo solucionarlo.', recommendation: 'Especificar si es por fondos insuficientes o fecha de caducidad.' },
      10: { heuristicId: 10, severity: 0, notes: 'Todos los campos tributarios complejos tienen tooltip explicativo.', recommendation: 'Excelente implementación contextual.' },
    });
  };

  const resetAudit = () => {
    const initial: Record<number, AuditRating> = {};
    NIELSEN_HEURISTICS.forEach(h => {
      initial[h.id] = {
        heuristicId: h.id,
        severity: 0,
        notes: '',
        recommendation: ''
      };
    });
    setRatings(initial);
  };

  // Usability score computation
  // Max penalty = 40 (10 heuristics * 4 severity).
  // Total penalty:
  const totalSeverityPenalty = Object.values(ratings).reduce((acc, curr) => acc + curr.severity, 0);
  const healthScore = Math.max(0, Math.round(100 - (totalSeverityPenalty / 40) * 100));

  const countCatastrophes = Object.values(ratings).filter(r => r.severity === 4).length;
  const countMajors = Object.values(ratings).filter(r => r.severity === 3).length;
  const countMinors = Object.values(ratings).filter(r => r.severity === 2).length;
  const countCosmetics = Object.values(ratings).filter(r => r.severity === 1).length;
  const countClean = Object.values(ratings).filter(r => r.severity === 0).length;

  const generateMarkdownReport = () => {
    let md = `# Informe de Auditoría Heurística de Usabilidad (Jakob Nielsen)\n\n`;
    md += `**Proyecto:** ${projectName}\n`;
    md += `**Evaluador:** ${evaluatorName}\n`;
    md += `**Fecha:** ${new Date().toLocaleDateString('es-ES')}\n`;
    md += `**Índice de Salud de Usabilidad:** ${healthScore}/100\n\n`;
    md += `### Resumen de Hallazgos:\n`;
    md += `- Catástrofes de usabilidad (Nivel 4): ${countCatastrophes}\n`;
    md += `- Problemas mayores (Nivel 3): ${countMajors}\n`;
    md += `- Problemas menores (Nivel 2): ${countMinors}\n`;
    md += `- Problemas cosméticos (Nivel 1): ${countCosmetics}\n`;
    md += `- Heurísticas aprobadas sin problemas (Nivel 0): ${countClean}\n\n`;
    md += `---\n\n`;
    md += `### Desglose por Principio Heurístico:\n\n`;

    NIELSEN_HEURISTICS.forEach(h => {
      const r = ratings[h.id];
      const sev = SEVERITY_LABELS[r.severity];
      md += `#### ${h.numberStr}. ${h.titleSpanish} (${h.titleEnglish})\n`;
      md += `- **Severidad asignada:** ${sev.label} — *${sev.desc}*\n`;
      md += `- **Hallazgos observados:** ${r.notes || 'Ninguno registrado.'}\n`;
      md += `- **Recomendación UX:** ${r.recommendation || 'Sin acciones pendientes requeridas.'}\n\n`;
    });

    return md;
  };

  const copyReport = () => {
    const md = generateMarkdownReport();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadReport = () => {
    const md = generateMarkdownReport();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Auditoria_Heuristica_${projectName.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header and Project Details */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Evaluador de Auditoría Heurística Profesional
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Herramienta basada en la escala de severidad de Jakob Nielsen (0 a 4) para auditar productos digitales.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSampleAudit}
              className="px-3 py-1.5 text-xs text-indigo-300 hover:text-white bg-indigo-950/60 border border-indigo-800/80 rounded-lg transition-colors font-medium"
            >
              Cargar ejemplo completo
            </button>
            <button
              onClick={resetAudit}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Limpiar
            </button>
          </div>
        </div>

        {/* Project & Evaluator Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nombre del Proyecto / URL evaluada</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nombre del Evaluador / Equipo UX</label>
            <input
              type="text"
              value={evaluatorName}
              onChange={(e) => setEvaluatorName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>
        </div>

        {/* Live Usability Dashboard Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-slate-400">Salud Usabilidad</div>
            <div className={`text-2xl font-bold font-mono ${healthScore > 80 ? 'text-emerald-400' : healthScore > 50 ? 'text-amber-400' : 'text-rose-400'}`}>
              {healthScore}%
            </div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-slate-400">Catástrofes (4)</div>
            <div className="text-xl font-bold font-mono text-rose-400">{countCatastrophes}</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-slate-400">Mayores (3)</div>
            <div className="text-xl font-bold font-mono text-orange-400">{countMajors}</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-slate-400">Menores (2)</div>
            <div className="text-xl font-bold font-mono text-amber-400">{countMinors}</div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center col-span-2 sm:col-span-1">
            <div className="text-[11px] text-slate-400">Aprobadas (0)</div>
            <div className="text-xl font-bold font-mono text-emerald-400">{countClean}</div>
          </div>
        </div>

        {/* Export Action Bar */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={copyReport}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '¡Informe copiado al portapapeles!' : 'Copiar Informe Markdown'}
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Descargar Informe .MD
          </button>
        </div>
      </div>

      {/* 10 Heuristics Evaluation Cards */}
      <div className="space-y-4">
        {NIELSEN_HEURISTICS.map(heuristic => {
          const currentRating = ratings[heuristic.id];

          return (
            <div
              key={heuristic.id}
              className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-750 rounded-xl space-y-4 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-indigo-400 font-semibold text-xs">{heuristic.numberStr}</span>
                    <h3 className="text-sm font-bold text-white">
                      {heuristic.titleSpanish}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {heuristic.summary}
                  </p>
                </div>

                <div className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${SEVERITY_LABELS[currentRating.severity].badgeBg}`}>
                  {SEVERITY_LABELS[currentRating.severity].label}
                </div>
              </div>

              {/* Severity Button Scale */}
              <div>
                <label className="block text-[11px] text-slate-400 mb-1.5 font-medium">
                  Escala de Severidad de Nielsen:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
                  {([0, 1, 2, 3, 4] as const).map(level => {
                    const isSelected = currentRating.severity === level;
                    const meta = SEVERITY_LABELS[level];

                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleSeverityChange(heuristic.id, level)}
                        className={`p-2 rounded-lg border text-left transition-colors ${
                          isSelected
                            ? `${meta.badgeBg} font-semibold ring-1 ring-current`
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] font-bold">{level}. {meta.label.split('-')[1]}</div>
                        <div className="text-[10px] opacity-75 truncate">{meta.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes and Recommendations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Hallazgos y Observaciones</label>
                  <textarea
                    rows={2}
                    value={currentRating.notes}
                    onChange={(e) => handleNotesChange(heuristic.id, e.target.value)}
                    placeholder="Describe los problemas o fortalezas detectados..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Recomendación de Diseño UX</label>
                  <textarea
                    rows={2}
                    value={currentRating.recommendation}
                    onChange={(e) => handleRecommendationChange(heuristic.id, e.target.value)}
                    placeholder="Qué solución concreta se propone implementar..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
