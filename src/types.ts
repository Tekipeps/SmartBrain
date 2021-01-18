export interface Box {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

export function isUndefined(x: any): x is undefined {
  return typeof x === "undefined";
}
