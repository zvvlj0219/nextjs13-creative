import { add } from './sample';

describe('add function', () => {
  test('adds two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  test('returns zero when both numbers are zero', () => {
    const result = add(0, 0);
    expect(result).toBe(0);
  });

  test('returns negative sum when one number is negative', () => {
    const result = add(-5, 3);
    expect(result).toBe(-2);
  });
});