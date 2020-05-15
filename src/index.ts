/**
 * returns an integer contrained to the min and max values given
 * @param min - minimum integer (inclusive)
 * @param max - maximum integer (inclusive)
 */
export function randomInt(min: number, max: number): number {
  const r = Math.floor(Math.random() * (max - min + 1) + min);
  return r > max
    ? max
    : r < min
      ? min
      : r;
}

/**
 * Returns a random time value as hhmm (represented as an integer)
 * @param min - minimum time value (inclusive)
 * @param max - maximum time value (inclusive)
 * @param round - rounds the minutes to the nearest value specified e.g. half-hour
 */
export function randomTimeInt(min: number, max: number, round: number): number {
  let r: number = Math.floor(Math.random() * (max - min + 1) + min);
  let hh: number = Math.floor(r / 100), mm: number = r % 100;
  if (mm > 59) {
    mm = 100 - mm;
    ++hh;
  }
  mm = roundNearest(mm, round);
  if (mm > 59) {
    mm = 0;
  }
  
  if (hh > 23) {
    hh = 0;
  }
  r = hh * 100 + mm;
  return r > max 
    ? max 
    : r < min
      ? min
      : r;
}

/**
 * Rounds value to the nearest rounding factor
 * @param value - value to round off
 * @param round - rounding factor
 */
export function roundNearest(value: number, round: number): number {
  round = Math.abs(Math.trunc(round));
  if (round === 0) {
    round = 1;
  }
  return Math.round(value / round) * round;
}