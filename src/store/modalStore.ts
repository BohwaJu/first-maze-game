import { atom } from "jotai";

export interface ModalContent {
  title?: string;
  content?: string;
  children?: React.ReactNode;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  navigate?: (path: string) => void;
  placeholder?: string;
}

export const modalAtom = atom<ModalContent | null>(null);

export const isModalOpenAtom = atom(
  (get) => get(modalAtom) !== null,
  (get, set, value: boolean) => {
    if (!value) {
      set(modalAtom, null);
    }
  }
);
