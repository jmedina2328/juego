/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useGameViewModel } from './hooks/useGameViewModel';
import { RefreshCw, Trophy, Info, Home } from 'lucide-react';

export default function App() {
  const {
    cartas,
    intentos,
    paresEncontrados,
    ultimoMensaje,
    seleccionarCarta,
    reiniciarJuego,
    totalPares,
  } = useGameViewModel();

  const isGameFinished = paresEncontrados === totalPares;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-50 to-emerald-200 flex items-center justify-center font-sans overflow-hidden p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-40 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-40 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* App Container (Phone Mockup) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[360px] h-[700px] bg-white/60 backdrop-blur-xl border border-white/40 rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden"
      >
        {/* Status Bar Mockup */}
        <div className="w-full h-8 flex justify-between items-center px-8 pt-4 shrink-0">
          <span className="text-xs font-bold text-emerald-800">10:24</span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-800/20"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-800/40"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-800/80"></div>
          </div>
        </div>

        {/* App Header */}
        <div className="px-6 pt-8 pb-4 shrink-0">
          <h1 className="text-2xl font-black text-emerald-900 tracking-tight">EcoMemory</h1>
          <p className="text-sm text-emerald-700/70 font-medium">Nivel 1: Conciencia Local</p>
        </div>

        {/* Stats Bar */}
        <div className="px-6 mb-4 flex justify-between gap-3 shrink-0">
          <div className="flex-1 bg-white/40 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/50 flex flex-col shadow-sm">
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">Pares</span>
            <span className="text-lg font-bold text-emerald-900">{paresEncontrados} / {totalPares}</span>
          </div>
          <div className="flex-1 bg-white/40 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/50 flex flex-col items-end shadow-sm">
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">Intentos</span>
            <span className="text-lg font-bold text-emerald-900">{intentos}</span>
          </div>
        </div>

        {/* Memory Grid */}
        <div className="flex-1 px-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 pb-4">
            {cartas.map((carta) => (
              <motion.div
                key={carta.id}
                id={`card-${carta.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => seleccionarCarta(carta.id)}
                className="aspect-square cursor-pointer perspective-1000"
              >
                <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${carta.descubierta || carta.emparejada ? 'rotate-y-180' : ''}`}>
                  {/* Front View (Hidden State) */}
                  <div className="absolute inset-0 backface-hidden bg-emerald-500 rounded-2xl shadow-lg border-2 border-emerald-400 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-4 border-emerald-300 opacity-50"></div>
                  </div>
                  
                  {/* Back View (Revealed State) */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center border-2 ${carta.emparejada ? 'border-emerald-400 ring-4 ring-emerald-500/20' : 'border-white'}`}>
                    {carta.emparejada ? (
                      <>
                        <span className="text-3xl text-emerald-500 mb-1">✔</span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Match!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl mb-1">{carta.emoji}</span>
                        <span className={`text-[10px] font-bold uppercase ${
                          carta.tipo === 'Plástico' ? 'text-blue-600' :
                          carta.tipo === 'Papel' ? 'text-amber-700' :
                          carta.tipo === 'Vidrio' ? 'text-indigo-500' :
                          'text-orange-600'
                        }`}>{carta.tipo}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Educational Toast */}
        <div className="px-6 pb-6 shrink-0 h-[100px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={ultimoMensaje}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full"
            >
              <div className="bg-emerald-800/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-700 h-full flex items-start gap-3 overflow-hidden">
                <div className="bg-emerald-500 rounded-full p-1 shrink-0">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-tighter">Dato Curioso</p>
                  <p className="text-xs text-emerald-50 leading-tight">
                    {isGameFinished ? "¡Felicidades! Has completado el desafío ambiental. ¿Quieres jugar de nuevo?" : ultimoMensaje}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="h-20 bg-white/20 border-t border-white/30 flex items-center justify-around px-8 shrink-0">
          <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Home className="w-5 h-5 text-emerald-900" />
            <span className="text-[10px] font-bold text-emerald-900 uppercase">Inicio</span>
          </button>
          
          <button 
            id="reset-btn"
            onClick={reiniciarJuego}
            className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center gap-2 hover:bg-emerald-700"
          >
            <RefreshCw className="w-4 h-4" />
            Reiniciar
          </button>

          <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Trophy className="w-5 h-5 text-emerald-900" />
            <span className="text-[10px] font-bold text-emerald-900 uppercase">Logros</span>
          </button>
        </div>

        {/* Home Indicator */}
        <div className="w-full flex justify-center pb-2 shrink-0">
          <div className="w-24 h-1.5 bg-emerald-900/10 rounded-full"></div>
        </div>
      </motion.div>

      {/* Styled utilities for 3D card flip */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
