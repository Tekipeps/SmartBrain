export interface Box {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

export const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

export function isUndefined(x: any): x is undefined {
  return typeof x === "undefined";
}

export enum Route {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  HOME = "HOME",
}
