import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "saveUser",
  storeage: sessionStorage,
});

export const memberState = atom({
  key: "userState",
  default: null,
  effects: [persistAtom],
});
