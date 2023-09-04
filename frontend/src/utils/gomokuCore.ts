// @ts-nocheck

const board_size = 15;
const empty = 0;
const black_stone = 1;
const white_stone = 2;

/**
 *
 * @param board 현재 오목판 2차원 배열
 * @param color 1-흑돌 / 2-백돌
 * @returns [놓지 못하는 좌표, 놓으면 이기는 좌표]
 */
export const gomokuCore = (board, color) => {
  if (color == white_stone) {
    const coords = new Set();
    for (let y = 1; y <= board_size; y++) {
      for (let x = 1; x <= board_size; x++) {
        if (board[y][x]) {
          continue;
        }
        if (is_five(board, x, y, white_stone)) {
          coords.add(y + " " + x);
        }
      }
    }
    return [new Set(), coords];
  }

  const forbiddenPoints = get_forbidden_points(board, black_stone);
  const finishPoints = get_finish_points(board, black_stone);
  return [forbiddenPoints, finishPoints];
};

function is_invalid(x, y) {
  return x < 1 || x > board_size || y < 1 || y > board_size;
}

function set_stone(board, x, y, stone) {
  board[y][x] = stone;
}

function get_xy(direction) {
  const list_dx = [-1, 1, -1, 1, 0, 0, 1, -1];
  const list_dy = [0, 0, -1, 1, -1, 1, -1, 1];
  return [list_dx[direction], list_dy[direction]];
}

function get_stone_count(board, x, y, stone, direction) {
  const x1 = x;
  const y1 = y;
  let cnt = 1;
  for (let i = 0; i < 2; i++) {
    const dx = get_xy(direction * 2 + i)[0];
    const dy = get_xy(direction * 2 + i)[1];
    x = x1;
    y = y1;
    while (true) {
      x = x + dx;
      y = y + dy;
      if (is_invalid(x, y) || board[y][x] != stone) {
        break;
      } else {
        cnt += 1;
      }
    }
  }
  return cnt;
}

function is_six(board, x, y, stone) {
  for (let i = 0; i < 4; i++) {
    const cnt = get_stone_count(board, x, y, stone, i);
    if (cnt > 5) {
      return true;
    }
  }
  return false;
}

function is_five(board, x, y, stone) {
  for (let i = 0; i < 4; i++) {
    const cnt = get_stone_count(board, x, y, stone, i);
    if (cnt == 5) {
      return true;
    }
  }
  return false;
}

function find_empty_point(board, x, y, stone, direction) {
  const dx = get_xy(direction)[0];
  const dy = get_xy(direction)[1];
  while (true) {
    x = x + dx;
    y = y + dy;
    if (is_invalid(x, y) || board[y][x] != stone) {
      break;
    }
  }
  if (!is_invalid(x, y) && board[y][x] == empty) {
    return [x, y];
  } else {
    return false;
  }
}

function open_three(board, x, y, stone, direction) {
  for (let i = 0; i < 2; i++) {
    const coord = find_empty_point(board, x, y, stone, direction * 2 + i);
    if (coord) {
      const dx = coord[0];
      const dy = coord[1];
      set_stone(board, dx, dy, stone);
      if (1 == open_four(board, dx, dy, stone, direction)) {
        if (!forbidden_point(board, dx, dy, stone)[0]) {
          set_stone(board, dx, dy, empty);
          return true;
        }
      }
      set_stone(board, dx, dy, empty);
    }
  }
  return false;
}

function open_four(board, x, y, stone, direction) {
  if (is_five(board, x, y, stone)) {
    return false;
  }
  let cnt = 0;
  for (let i = 0; i < 2; i++) {
    const coord = find_empty_point(board, x, y, stone, direction * 2 + i);
    if (coord) {
      if (five(board, coord[0], coord[1], stone, direction)) {
        cnt += 1;
      }
    }
  }
  if (cnt == 2) {
    if (4 == get_stone_count(board, x, y, stone, direction)) {
      cnt = 1;
    }
  } else {
    cnt = 0;
  }
  return cnt;
}

function four(board, x, y, stone, direction) {
  for (let i = 0; i < 2; i++) {
    const coord = find_empty_point(board, x, y, stone, direction * 2 + i);
    if (coord) {
      if (five(board, coord[0], coord[1], stone, direction)) {
        return true;
      }
    }
  }
  return false;
}

function five(board, x, y, stone, direction) {
  if (5 == get_stone_count(board, x, y, stone, direction)) {
    return true;
  }
  return false;
}

function double_three(board, x, y, stone) {
  let cnt = 0;
  set_stone(board, x, y, stone);
  for (let i = 0; i < 4; i++) {
    if (open_three(board, x, y, stone, i)) {
      cnt += 1;
    }
  }
  set_stone(board, x, y, empty);
  if (cnt >= 2) {
    return true;
  }
  return false;
}

function double_four(board, x, y, stone) {
  let cnt = 0;
  set_stone(board, x, y, stone);
  for (let i = 0; i < 4; i++) {
    if (open_four(board, x, y, stone, i) == 2) {
      cnt += 2;
    } else if (four(board, x, y, stone, i)) {
      cnt += 1;
    }
  }
  set_stone(board, x, y, empty);
  if (cnt >= 2) {
    return true;
  }
  return false;
}

function forbidden_point(board, x, y, stone) {
  if (is_five(board, x, y, stone)) {
    return [false, "5"];
  } else if (is_six(board, x, y, stone)) {
    return [true, "6"];
  } else if (double_four(board, x, y, stone)) {
    return [true, "44"];
  } else if (double_three(board, x, y, stone)) {
    return [true, "33"];
  }
  return [false, "X"];
}

function get_forbidden_points(board, stone) {
  const coords = new Set();
  for (let y = 1; y <= board_size; y++) {
    for (let x = 1; x <= board_size; x++) {
      if (board[y][x]) {
        continue;
      }
      if (forbidden_point(board, x, y, stone)[0]) {
        coords.add(y + " " + x);
      }
    }
  }
  return coords;
}

function get_finish_points(board, stone) {
  const coords = new Set();
  for (let y = 1; y <= board_size; y++) {
    for (let x = 1; x <= board_size; x++) {
      if (board[y][x]) {
        continue;
      }
      if (forbidden_point(board, x, y, stone)[1] == "5") {
        coords.add(y + " " + x);
      }
    }
  }
  return coords;
}
