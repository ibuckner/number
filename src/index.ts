/**
 * Returns a circle's area given by radius
 * @param r - radius of circle
 */
export function circleArea(r: number): number {
  return Math.PI * r * r;
}

/**
 * Returns the number of significant digits
 * @param n - number to inspect
 */
export function countDigit(n: number): number {
  n = Math.round(Math.abs(n));
  if (n === 0) {
    return 1;
  }
  return Math.floor(Math.log(n) / Math.log(10)) + 1;
}

/**
 * Returns the circle's radius based on circle area
 * @param area - area of circle
 */
export function circleRadius(area: number): number {
  return Math.sqrt(area / Math.PI);
}

/**
 * Returns size of square
 * @description https://math.stackexchange.com/questions/466198/algorithm-to-get-the-maximum-size-of-n-squares-that-fit-into-a-rectangle-with-a
 * @param width - Width of parent quadrant
 * @param height - height of parent quadrant
 * @param n - number of squares to fit
 */
export function fitToQuadrant(width: number, height: number, n: number): number {
  let sx: number, sy: number;
  const px: number = Math.ceil(Math.sqrt(n * width / height));
  if (Math.floor(px * height / width) * px < n) {
    sx = height / Math.ceil(px * height / width);
  } else {
    sx = width / px;
  }
  const py: number = Math.ceil(Math.sqrt(n * height / width));
  if (Math.floor(py * width / height) * py < n) {
    sy = width / Math.ceil(width * py / height);
  } else {
    sy = height / py;
  }
  return Math.max(sx, sy);
}

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
 * returns true is the point lies within the shape
 * @param r - shape extent value (top left and bottom right)
 * @param point - single point
 */
export function rectContain(r: number[][], point: any): boolean {
  return r[0][0] <= point.x &&
         point.x <= r[1][0] &&
         r[0][1] <= point.y &&
         point.y <= r[1][1];
}

/**
 * returns true if intersection occurs
 * @param r1 - shape extent value (top left and bottom right)
 * @param r2 - shape extent value
 */
export function rectIntersect(r1: number[][], r2: number[][]): boolean {
  return r1[0][0] <= r2[1][0] &&
         r2[0][0] <= r1[1][0] &&
         r1[0][1] <= r2[1][1] &&
         r2[0][1] <= r1[1][1];
}

/**
 * Returns rounded number
 * @param value - value to round off
 * @param precision - number of digits after the decimal point
 */
export function round(value: number, precision: number): number {
  return precision
    ? Math.round(value * (precision = Math.pow(10, precision))) / precision
    : Math.round(value);
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

/**
 * Convert command objects to arrays of points, run de Casteljau's algorithm on it
 * to split into to the desired number of segments.
 * @param commandStart - The start command object
 * @param commandEnd - The end command object
 * @param segmentCount - The number of segments to create
 */
export function splitCurve(
  commandStart: any,
  commandEnd: any,
  segmentCount: number
): any[] {
  const points: any[] = [[commandStart.x, commandStart.y]];
  if (commandEnd.x1 !== null) {
    points.push([commandEnd.x1, commandEnd.y1]);
  }
  if (commandEnd.x2 !== null) {
    points.push([commandEnd.x2, commandEnd.y2]);
  }
  points.push([commandEnd.x, commandEnd.y]);
  return splitCurveAsPoints(points, segmentCount)
    .map(pointsToCommand);
}

/**
 * Returns standard deviation value
 * @param values - array of values
 */
export function stdDev(values: number[]): number {
  const avg: number = sumValues(values) / values.length;
  const squareDiffs: number[] = values.map((v: number) => (v - avg) * (v - avg));
  const avgSquareDiff: number = sumValues(squareDiffs) / squareDiffs.length;
  return Math.sqrt(avgSquareDiff);
}

/**
 * Returns the sum of values
 * @param values - array of numbers to sum up
 */
export function sumValues(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0);
}

/**
 * Returns a triangle's area given by lengths of three sides
 * @param a - side a
 * @param b - side b
 * @param c - side c
 */
export function triangleArea(a: number, b: number, c: number): number {
  const sum: number = a + b + c;
  const sem: number = sum / 2;
  const area: number = Math.sqrt(sem * (sem - a) * (sem - b) * (sem - c));
  return area;
}

/**
 * Returns a triangle's height given by lengths of three sides
 * @param a - side a
 * @param b - side b
 * @param c - side c
 */
export function triangleHeight(a: number, b: number, c: number): { a: number, b: number, c: number} {
  const area: any = triangleArea(a, b, c);
  return {
    a: (2 * area) / a,
    b: (2 * area) / b,
    c: (2 * area) / c,
  };
}

/**
 * de Casteljau's algorithm for drawing and splitting bezier curves.
 * @description https://pomax.github.io/bezierinfo/
 * @param points - Array of [x,y] points: [start, control1, control2, ..., end]
 * @param t - Where to split the curve (value between [0, 1])
 */
function decasteljau(points: Number[][], t: number): any {
  const left: any[] = [];
  const right: any[] = [];

  function decasteljauRecurse(points: any, t: any): any {
    if (points.length === 1) {
      left.push(points[0]);
      right.push(points[0]);
    } else {
      const newPoints: any[] = Array(points.length - 1);

      for (let i: number = 0; i < newPoints.length; i++) {
        if (i === 0) {
          left.push(points[0]);
        }
        if (i === newPoints.length - 1) {
          right.push(points[i + 1]);
        }

        newPoints[i] = [
          ((1 - t) * points[i][0]) + (t * points[i + 1][0]),
          ((1 - t) * points[i][1]) + (t * points[i + 1][1]),
        ];
      }

      decasteljauRecurse(newPoints, t);
    }
  }

  if (points.length) {
    decasteljauRecurse(points, t);
  }

  return { left, right: right.reverse() };
}

/**
 * Convert segments represented as points back into a command object
 * @param points - Array of [x,y] points: [start, control1, control2, ..., end]
 */
function pointsToCommand(points: Number[][]): any {
  const command: any = {};

  if (points.length === 4) {
    command.x2 = points[2][0];
    command.y2 = points[2][1];
  }
  if (points.length >= 3) {
    command.x1 = points[1][0];
    command.y1 = points[1][1];
  }

  command.x = points[points.length - 1][0];
  command.y = points[points.length - 1][1];

  if (points.length === 4) { // start, control1, control2, end
    command.type = "C";
  } else if (points.length === 3) { // start, control, end
    command.type = "Q";
  } else { // start, end
    command.type = "L";
  }
  return command;
}

/**
 * Runs de Casteljau's algorithm enough times to produce the desired number of segments.
 * @param points - Array of [x,y] points for de Casteljau (the initial segment to split)
 * @param segmentCount - Number of segments to split the original into
 */
function splitCurveAsPoints(
  points: Number[][],
  segmentCount: number
): Number[][][] {
  segmentCount = segmentCount || 2;

  const segments: any[] = [];
  let remainingCurve: any = points;
  const tIncrement: number = 1 / segmentCount;

  // x-----x-----x-----x
  // t=  0.33   0.66   1
  // x-----o-----------x
  // r=  0.33
  //       x-----o-----x
  // r=         0.5  (0.33 / (1 - 0.33))  === tIncrement / (1 - (tIncrement * (i - 1))

  // x-----x-----x-----x----x
  // t=  0.25   0.5   0.75  1
  // x-----o----------------x
  // r=  0.25
  //       x-----o----------x
  // r=         0.33  (0.25 / (1 - 0.25))
  //             x-----o----x
  // r=         0.5  (0.25 / (1 - 0.5))

  for (let i: number = 0; i < segmentCount - 1; i++) {
    const tRelative: number = tIncrement / (1 - (tIncrement * (i)));
    const split: any = decasteljau(remainingCurve, tRelative);
    segments.push(split.left);
    remainingCurve = split.right;
  }

  // last segment is just to the end from the last point
  segments.push(remainingCurve);

  return segments;
}
