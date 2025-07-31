import { atom } from "jotai";

export interface ModalContent {
  title?: string;
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
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
