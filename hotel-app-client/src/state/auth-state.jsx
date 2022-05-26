import jsCookie from "js-cookie";
import { atom } from "recoil";
let token = jsCookie.get('token')
export const AUTH_STATE = atom({
  key: 'authentication',
  default: {isAuthenticated: token? true:false },
});