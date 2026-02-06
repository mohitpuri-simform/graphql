export const removeDuplicateElements = (arr: number[]) => {
  const brr = [];
  let count = 1;
  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    if (count <= 2) {
      brr.push(arr[i]);
    }
  }
  return brr;
};
