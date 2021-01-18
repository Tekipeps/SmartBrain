export interface Box {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

export function isUndefined(x: any): x is undefined {
  return typeof x === "undefined";
}

export enum Route {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  HOME = "HOME",
}
