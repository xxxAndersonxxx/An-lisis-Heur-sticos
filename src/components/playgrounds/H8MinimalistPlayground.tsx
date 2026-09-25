import React, { useState } from 'react';
import { Sliders, Sparkles, AlertTriangle, Eye, ArrowRight, ShieldCheck, Flame, Bell, Heart, Gift } from 'lucide-react';

export const H8MinimalistPlayground: React.FC = () => {
  const [noiseLevel, setNoiseLevel] = useState<number>(0); // 0 = Minimalist (Good), 100 = Cluttered (Bad)

  // Cognitive load calculations
  const cognitiveLoad = noiseLevel < 30 ? 'Óptima (Baja)' : noiseLevel < 70 ? 'Moderada' : 'Crítica (Sobrecarga visual)';
  const cognitiveColor = noiseLevel < 30 ? 'text-emerald-400' : noiseLevel < 70 ? 'text-amber-400' : 'text-rose-400';

  return (
    <div className="space-y-6">
      {/* Interactive Noise Control Slider */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Nivel de Ruido Visual e Información Superflua:
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Carga cognitiva:</span>
            <span className={`font-semibold ${cognitiveColor}`}>{cognitiveLoad} ({noiseLevel}%)</span>
          </div>
        </div>

        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max="100"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>0% — Diseño Esencial y Minimalista</span>
            <span>50% — Advertencias y Banners Secundarios</span>
            <span>100% — Ruido Extremo / Caos Visual</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="text-xs text-slate-400">
          Simulador: Ficha de Reserva de Habitación de Hotel
        </div>

        {/* Visual Target Area */}
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden transition-all duration-300">
          {/* Noise layer: Flashing emergency top banners (appears if noise > 25) */}
          {noiseLevel >= 25 && (
            <div className="mb-3 p-2 bg-rose-950/60 border border-rose-800 text-rose-300 text-[11px] flex items-center justify-between rounded animate-pulse">
              <span className="flex items-center gap-1.5 font-bold">
                <Flame className="w-3.5 h-3.5" /> ¡OFERTA RELÁMPAGO! SOLO QUEDAN 2 HABITACIONES A ESTE PRECIO
              </span>
              <span className="font-mono">EXPIRA EN 04:12</span>
            </div>
          )}

          {/* Noise layer: Second coupon banner (appears if noise > 50) */}
          {noiseLevel >= 50 && (
            <div className="mb-3 p-2 bg-amber-950/40 border border-amber-800 text-amber-300 text-[11px] flex items-center gap-2 rounded">
              <Gift className="w-3.5 h-3.5" /> Usa el cupón &quot;VERANO_VIP_SUPER_EXTRA_2026&quot; para 3% de descuento en minibar.
            </div>
          )}

          {/* Main Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-100">
                    Suite Deluxe con Vistas a la Bahía
                  </h3>
                  {noiseLevel >= 40 && (
                    <span className="bg-purple-900 text-purple-200 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase animate-bounce">
                      Top Elección
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  Cama King Size · Terraza privada · Desayuno buffet incluido · Cancelación gratuita
                </p>
              </div>

              {/* Noise layer: Redundant technical details (appears if noise > 60) */}
              {noiseLevel >= 60 && (
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-slate-400 space-y-1">
                  <div>ID de Habitación: 0x99482-B | Calefactor: 220V 50Hz | Insonorización: ISO-3381</div>
                  <div>Metros cuadrados brutos: 42.4 m² | Cuota de limpieza municipal: 1.2% devengada</div>
                </div>
              )}

              {/* Noise layer: 12 social proof micro badges (appears if noise > 80) */}
              {noiseLevel >= 80 && (
                <div className="flex flex-wrap gap-1 text-[10px]">
                  <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">★ 4.9 Estrellas</span>
                  <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">1,420 Reseñas</span>
                  <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Visto hace 2 min</span>
                  <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Wifi 6 Certificado</span>
                  <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Eco-Friendly 2026</span>
                  <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Toallas 100% Algodón</span>
                </div>
              )}
            </div>

            {/* Price & Action Box */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-3">
              <div className="text-xs text-slate-400">Precio total estancia</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                €185 <span className="text-xs text-slate-400 font-sans font-normal">/ noche</span>
              </div>

              {noiseLevel >= 30 && (
                <div className="text-[10px] text-rose-400 line-through">
                  Antes €290 (Ahorras 36%)
                </div>
              )}

              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
                Reservar habitación
              </button>

              {noiseLevel >= 70 && (
                <div className="text-[10px] text-slate-500">
                  Sin cargos ocultos · Pagas al llegar · Garantía de precio mínimo de la unión hotelera
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nielsen Heuristic Insight */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2">
          <div className="font-semibold text-slate-300">
            La regla de oro: La información adicional compite con la información vital
          </div>
          <p className="text-slate-400 leading-relaxed">
            Cada etiqueta, badge, advertencia o texto redundante no suma valor por defecto: disminuye la visibilidad relativa de lo que el cliente realmente necesita saber para tomar una decisión informada. El minimalismo es respeto por la atención humana.
          </p>
        </div>
      </div>
    </div>
  );
};
