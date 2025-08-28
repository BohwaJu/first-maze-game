import { atom } from "jotai";

export interface ToastState {
  isVisible: boolean;
  content: string;
}

export const toastAtom = atom<ToastState>({
  isVisible: false,
  content: "",
});

export const showToastAtom = atom(null, (get, set, content: string) => {
  set(toastAtom, { isVisible: true, content });

  // 2초 후 자동으로 숨기기
  setTimeout(() => {
    set(toastAtom, { isVisible: false, content: "" });
  }, 2000);
});
