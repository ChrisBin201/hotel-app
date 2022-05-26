import jsCookie from "js-cookie";
import { atom } from "recoil";

export const TOKEN_STATE = atom({
  key: 'tokenState',
  default: jsCookie.get("token"),
});