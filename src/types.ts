/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TipoResiduo = 'Plástico' | 'Papel' | 'Vidrio' | 'Orgánico';

export interface Carta {
  id: number;
  tipo: TipoResiduo;
  emoji: string;
  descubierta: boolean;
  emparejada: boolean;
  mensajeEducativo: string;
}
