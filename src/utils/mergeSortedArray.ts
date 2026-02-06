export const mergeSortedArrays = (
  arr1: number[],
  arr2: number[],
  m: number,
  n: number
): number[] => {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (j >= 0) {
    if (arr1[i] > arr2[j]) {
      arr1[k] = arr1[i];
      i--;
    } else {
      arr1[k] = arr2[j];
      j--;
    }
    k--;
  }
  return arr1;
};
