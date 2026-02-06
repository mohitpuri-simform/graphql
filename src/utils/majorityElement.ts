export const majorityElement = (arr: number[]) => {
  const mp = new Map<number, number>();
  for (const a of arr) {
    mp.set(a, (mp.get(a) ?? 0) + 1);
  }

  for (const [key, value] of mp) {
    if (value > arr.length / 2) return key;
  }
};
