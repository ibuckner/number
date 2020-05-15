import { randomInt, randomTimeInt, roundNearest } from ".";

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
