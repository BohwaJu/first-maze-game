import { atom } from "jotai";

export interface ModalContent {
  title?: string;
  content?: string;
  children?: React.ReactNode;
  inputValue?: string;
  inputValue2?: string;
  onInputChange?: (value: string) => void;
  onSecondInputChange?: (value: string) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  onClick?: (path: string, secondInput?: string) => void;
  placeholder1?: string;
  placeholder2?: string;
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
