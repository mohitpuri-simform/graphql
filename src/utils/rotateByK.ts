export const rotateByK = (arr: number[], k: number) => {
  k = k % arr.length;
  // let count = 0;
  // while (count <= k - 1) {
  //   const lastEle = arr.pop();
  //   count++;
  //   if (lastEle) arr.unshift(lastEle);
  // }

  // sol2:
  const n = arr.length;
  for (let i = 0; i < k; i++) {
    const lastEle = arr[n - 1];
    for (let j = n - 1; j > 0; j--) {
      arr[j] = arr[j - 1];
    }
    arr[0] = lastEle;
  }
  return arr;
};
