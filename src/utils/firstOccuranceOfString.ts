export function firstOccuranceOfString(str1: string, needle: string) {
  for (let i = 0; i < str1.length + 1 - needle.length; i++) {
    const toFind = i + needle.length - 1;
    let str = "";
    for (let j = i; j <= toFind; j++) str += str1[j];

    if (str === needle) return i;
  }
}
