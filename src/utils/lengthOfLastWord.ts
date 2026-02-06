export const lengthOfLastWord = (s: string): number => {
  let end = s.length - 1;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === " ") {
      continue;
    } else {
      end = i;
      break;
    }
  }
  let count = 0;
  for (let i = end; i >= 0; i--) {
    if (s[i] === " ") {
      break;
    } else {
      count++;
    }
  }
  return count;
};
