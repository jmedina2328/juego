/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Carta, TipoResiduo } from '../types';

const RESIDUOS: { tipo: TipoResiduo; emoji: string; mensaje: string }[] = [
  {
    tipo: 'Plástico',
    emoji: '♻️',
    mensaje: 'El plástico puede tardar hasta 500 años en descomponerse. ¡Recicla tus botellas!',
  },
  {
    tipo: 'Papel',
    emoji: '📦',
    mensaje: 'Reciclar una tonelada de papel salva 17 árboles adultos.',
  },
  {
    tipo: 'Vidrio',
    emoji: '🫙',
    mensaje: 'El vidrio es 100% reciclable y puede renacer infinitas veces sin perder calidad.',
  },
  {
    tipo: 'Orgánico',
    emoji: '🍎',
    mensaje: 'Los restos orgánicos pueden convertirse en compost para nutrir la tierra.',
  },
];

export function useGameViewModel() {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [intentos, setIntentos] = useState(0);
  const [paresEncontrados, setParesEncontrados] = useState(0);
  const [ultimoMensaje, setUltimoMensaje] = useState<string>('¡Encuentra los pares para aprender!');

  const inicializarJuego = useCallback(() => {
    const mazo: Carta[] = [];
    // Crear pares
    [...RESIDUOS, ...RESIDUOS].forEach((res, index) => {
      mazo.push({
        id: index,
        tipo: res.tipo,
        emoji: res.emoji,
        descubierta: false,
        emparejada: false,
        mensajeEducativo: res.mensaje,
      });
    });

    // Mezclar
    setCartas(mazo.sort(() => Math.random() - 0.5));
    setSeleccionadas([]);
    setIntentos(0);
    setParesEncontrados(0);
    setUltimoMensaje('¡Encuentra los pares para aprender!');
  }, []);

  useEffect(() => {
    inicializarJuego();
  }, [inicializarJuego]);

  const seleccionarCarta = (id: number) => {
    if (seleccionadas.length === 2 || cartas[id].descubierta || cartas[id].emparejada) return;

    const nuevasCartas = [...cartas];
    nuevasCartas[id].descubierta = true;
    setCartas(nuevasCartas);

    const nuevasSeleccionadas = [...seleccionadas, id];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      validarPar(nuevasSeleccionadas, nuevasCartas);
    }
  };

  const validarPar = (indices: number[], mazoActual: Carta[]) => {
    setIntentos((i) => i + 1);
    const [id1, id2] = indices;

    if (mazoActual[id1].tipo === mazoActual[id2].tipo) {
      // Par correcto
      setTimeout(() => {
        setCartas((prev) => {
          const next = [...prev];
          next[id1].emparejada = true;
          next[id2].emparejada = true;
          return next;
        });
        setParesEncontrados((p) => p + 1);
        setUltimoMensaje(mazoActual[id1].mensajeEducativo);
        setSeleccionadas([]);
      }, 500);
    } else {
      // Par incorrecto
      setTimeout(() => {
        setCartas((prev) => {
          const next = [...prev];
          next[id1].descubierta = false;
          next[id2].descubierta = false;
          return next;
        });
        setSeleccionadas([]);
      }, 1000);
    }
  };

  return {
    cartas,
    intentos,
    paresEncontrados,
    ultimoMensaje,
    seleccionarCarta,
    reiniciarJuego: inicializarJuego,
    totalPares: RESIDUOS.length,
  };
}
