import {AVAX_DIVISOR} from './constants';

export function getBeautifiedCost(cost: number): string {
  return (cost / AVAX_DIVISOR).toFixed(2);
}
