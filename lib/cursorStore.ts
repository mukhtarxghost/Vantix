type CursorPoint = { x: number; y: number };

let cursor: CursorPoint = { x: -9999, y: -9999 };

export const cursorStore = {
  get(): CursorPoint {
    return cursor;
  },
  set(x: number, y: number) {
    cursor = { x, y };
  },
  reset() {
    cursor = { x: -9999, y: -9999 };
  },
};
