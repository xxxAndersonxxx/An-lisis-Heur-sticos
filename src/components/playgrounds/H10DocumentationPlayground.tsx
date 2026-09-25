import React, { useState } from 'react';
import { HelpCircle, Search, FileText, CheckCircle2, ChevronRight, BookOpen, ExternalLink, X } from 'lucide-react';

interface FaqItem {
  id: string;
  queryKeywords: string[];
  title: string;
  steps: string[];
  contextTip: string;
}

export const H10DocumentationPlayground: React.FC = () => {
  const [helpMode, setHelpMode] = useState<'contextual' | 'monolith'>('contextual');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const articles: FaqItem[] = [
    {
      id: 'export',
      queryKeywords: ['exportar', 'descargar', 'csv', 'excel', 'reporte'],
      title: '¿Cómo exportar tus reportes a Excel o CSV?',
      steps: [
        'Abre la pestaña de "Reportes y Balances".',
        'Haz clic en el botón superior derecho con el icono de descarga.',
        'Selecciona el formato deseado (Excel o CSV) y confirma.'
      ],
      contextTip: 'Puedes programar exportaciones automáticas semanales en Configuración.'
    },
    {
      id: 'tax_id',
      queryKeywords: ['iva', 'cif', 'nif', 'fiscal', 'impuesto', 'factura'],
      title: '¿Por qué necesitamos tu Identificación Fiscal (NIF/CIF)?',
      steps: [
        'Es obligatorio legalmente para emitir facturas con validez tributaria.',
        'Se valida de forma segura con la base de datos tributaria europea VIES.'
      ],
      contextTip: 'Solo se utiliza para tus facturas y no se comparte con terceros.'
    },
    {
      id: 'refund',
      queryKeywords: ['reembolso', 'devolucion', 'cancelar', 'dinero'],
      title: '¿Cómo solicitar la devolución de un cargo?',
      steps: [
        'Dirígete a tu Historial de Pagos.',
        'Localiza la transacción y presiona "Solicitar reembolso".',
        'El abono se reflejará en tu cuenta bancaria en 3 a 5 días hábiles.'
      ],
      contextTip: 'Garantía de reembolso total durante los primeros 14 días.'
    }
  ];

  const filteredArticles = searchQuery.trim() === ''
    ? articles
    : articles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.queryKeywords.some(k => k.includes(searchQuery.toLowerCase()))
      );

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setHelpMode('contextual')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              helpMode === 'contextual'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Buena práctica: Ayuda Contextual y Pasos Concretos (Micro-ayuda)
          </button>
          <button
            onClick={() => setHelpMode('monolith')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              helpMode === 'monolith'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mala práctica: Manual PDF monolítico de 120 páginas
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Nielsen 10: <span className="text-slate-300">Fácil de buscar y centrado en la tarea</span>
        </div>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        {helpMode === 'monolith' ? (
          <div className="space-y-4">
            <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-xl text-rose-200 text-xs leading-relaxed flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>Infracción de Heurística 10:</strong> Obliga a la persona a abandonar su tarea, descargar un manual generalista interminable y buscar a ciegas sin orientación inmediata ni búsqueda interactiva.
              </div>
            </div>

            <div className="p-8 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-4 max-w-md mx-auto">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-300">
                  Manual_de_Usuario_Completo_v12.4.pdf (48.6 MB)
                </div>
                <div className="text-[11px] text-slate-500">128 páginas de especificaciones técnicas densas</div>
              </div>

              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium rounded-lg transition-colors border border-slate-700 flex items-center justify-center gap-2 mx-auto">
                <ExternalLink className="w-3.5 h-3.5" /> Descargar manual completo
              </button>

              <p className="text-[11px] text-slate-500">
                Para responder una pregunta simple de 10 segundos, el usuario tiene que leer 30 páginas de introducción.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-3.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-200 text-xs leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Cumplimiento de Heurística 10:</strong> Ayuda disponible en el punto exacto de necesidad (tooltips explicativos &quot;¿Por qué?&quot;), buscador rápido y respuestas estructuradas en pasos secuenciales 1-2-3.
              </div>
            </div>

            {/* Example Interactive Form with Contextual Tooltip */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
              <div className="text-xs font-semibold text-slate-200">
                Ejemplo de Ayuda Contextual en un Formulario:
              </div>

              <div className="max-w-md space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <label className="text-xs text-slate-300">Identificación Fiscal / CIF Europeo</label>
                    <button
                      type="button"
                      onClick={() => setActiveTooltip(activeTooltip === 'tax' ? null : 'tax')}
                      className="text-slate-400 hover:text-indigo-400 transition-colors"
                      title="Haz clic para ver ayuda contextual"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="ESB12345678"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
                  />

                  {/* Contextual In-line Explanation Tooltip */}
                  {activeTooltip === 'tax' && (
                    <div className="mt-2 p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-lg text-xs text-indigo-200 space-y-1 relative">
                      <button
                        onClick={() => setActiveTooltip(null)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="font-semibold text-white">¿Por qué requerimos este dato?</div>
                      <p className="text-[11px] text-indigo-200/90 leading-relaxed">
                        Es indispensable para aplicar la exención de IVA intracomunitario en tus facturas. Solo se cotejará con el registro oficial y no afectará tu privacidad.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* In-App Micro Search */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-semibold text-slate-200">
                  Centro de Ayuda Inmediato (Pasos concretos)
                </div>
                <div className="text-[11px] text-slate-400">
                  Prueba a buscar: <span className="text-slate-200 font-mono">&quot;exportar&quot;</span> o <span className="text-slate-200 font-mono">&quot;reembolso&quot;</span>
                </div>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar soluciones paso a paso..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-lg text-xs text-slate-200"
                />
              </div>

              {/* Articles Grid */}
              <div className="space-y-2">
                {filteredArticles.map(article => (
                  <div
                    key={article.id}
                    className="p-3.5 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-lg text-xs space-y-2.5"
                  >
                    <div className="font-semibold text-slate-100 flex items-center justify-between">
                      <span>{article.title}</span>
                      <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded">
                        Acción rápida
                      </span>
                    </div>

                    <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                      {article.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ol>

                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                      💡 <strong>Consejo útil:</strong> {article.contextTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
