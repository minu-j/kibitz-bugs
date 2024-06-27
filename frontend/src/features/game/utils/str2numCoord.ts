export function str2numCoord(c: string) {
  const a = c.charAt(0);
  return [parseInt(c.slice(1)), alphabet.indexOf(a)];
}

const alphabet = [
  "",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];
