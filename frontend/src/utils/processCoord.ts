export function processCoord(input: string) {
  if (2 <= input.length) {
    // 알파벳과 숫자를 분리
    const alphabet = input.charAt(0).toUpperCase();
    const number = parseInt(input.slice(1));

    // 유효한 범위 확인
    const validAlphabets = "ABCDEFGHIJKLMNO";
    const validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    if (!validAlphabets.includes(alphabet) || !validNumbers.includes(number)) {
      return "";
    }

    // 좌표를 가공하여 저장
    const processedCoordinate = alphabet + number;

    return processedCoordinate;
  } else {
    return "";
  }
}
