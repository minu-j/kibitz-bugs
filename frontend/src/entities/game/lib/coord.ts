const ABSCISSA = [
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

const COORD_MAP = new Map();
for (let i = 1; i < 16; i++) {
  for (let j = 1; j < 16; j++) {
    COORD_MAP.set(i + ABSCISSA[j], ABSCISSA[j] + (16 - i));
    COORD_MAP.set(ABSCISSA[j] + i, ABSCISSA[j] + (16 - i));
    COORD_MAP.set(i + ABSCISSA[j].toLowerCase(), ABSCISSA[j] + (16 - i));
    COORD_MAP.set(ABSCISSA[j].toLowerCase() + i, ABSCISSA[j] + (16 - i));
  }
}

function num2strCoord(i: number, j: number) {
  return `${ABSCISSA[j]}${i}`;
}

function processCoord(input: string) {
  if (COORD_MAP.has(input)) {
    return COORD_MAP.get(input);
  }
  return "";
}

function str2numCoord(c: string) {
  const a = c.charAt(0);
  return [parseInt(c.slice(1)), ABSCISSA.indexOf(a)];
}

export { num2strCoord, processCoord, str2numCoord };
