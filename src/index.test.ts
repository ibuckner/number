import {
  circleArea, circleRadius, countDigit, fitToQuadrant, 
  randomInt, randomTimeInt, roundNearest
} from ".";

test("circle area test", () => {
  expect(circleArea(5)).toStrictEqual(25 * Math.PI);
  expect(circleArea(0)).toStrictEqual(0);
});

test("circle radius test", () => {
  expect(Math.ceil(circleRadius(25))).toStrictEqual(3);
  expect(circleRadius(0)).toStrictEqual(0);
});

test("count digit test", () => {
  expect(countDigit(10000)).toStrictEqual(5);
  expect(countDigit(0)).toStrictEqual(1);
  expect(countDigit(1)).toStrictEqual(1);
  expect(countDigit(-1)).toStrictEqual(1);
  expect(countDigit(0.0001)).toStrictEqual(1);
});

test("fit to quadrant test", () => {
  expect(fitToQuadrant(10, 10, 10)).toStrictEqual(2.5);
});

test("randomInt tests", () => {
  for (let n = 0; n < 10 ; n++) {
    const start = 1;
    const end = start + Math.floor(100 * Math.random());
    const res: number = randomInt(start, end);
    expect(res > start - 1 && res < end + 1).toBe(true);
  }
});

test("randomTimeInt tests", () => {
  for (let n = 0; n < 10 ; n++) {
    const start = 1000;
    let ss = Math.floor(59 * Math.random()) + 1;
    ss = ss > 59 ? 100 : ss;
    const end = start + ss;
    const res: number = randomTimeInt(start, end, 30);
    const mm: number = res - start;
    expect(res > start - 1 && res < end + 1).toBe(true);
    expect(mm === 0 || mm === 30 || mm === ss).toBe(true);
  }
});

test("roundNearest tests", () => {
  expect(roundNearest(22, 5)).toBe(20);
  expect(roundNearest(26, 5)).toBe(25);
  expect(roundNearest(112, 50)).toBe(100);
  expect(roundNearest(175, 25)).toBe(175);
  expect(roundNearest(175, 50)).toBe(200);
  expect(roundNearest(223, 5)).toBe(225);
});
