const convertMap = new Map();
const eng = [
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

for (let i = 1; i < 16; i++) {
  for (let j = 1; j < 16; j++) {
    convertMap.set(i + eng[j], eng[j] + (16 - i));
    convertMap.set(eng[j] + i, eng[j] + (16 - i));
    convertMap.set(i + eng[j].toLowerCase(), eng[j] + (16 - i));
    convertMap.set(eng[j].toLowerCase() + i, eng[j] + (16 - i));
  }
}

export function processCoord(input: string) {
  if (convertMap.has(input)) {
    return convertMap.get(input);
  }
  return "";
}
