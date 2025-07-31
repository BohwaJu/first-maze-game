import { useAtom } from "jotai";
import { modalAtom, ModalContent } from "@/store/modalStore";

export const useModal = () => {
  const [modalContent, setModalContent] = useAtom(modalAtom);

  const openModal = (content: ModalContent) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const showConfirmModal = (options: {
    content: string;
    onConfirm: () => void;
    onCancel?: () => void;
    title?: string;
    confirmText?: string;
    cancelText?: string;
  }) => {
    openModal({
      title: options.title,
      content: options.content,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
    });
  };

  const showAlertModal = (
    content: string,
    title?: string,
    confirmText?: string
  ) => {
    openModal({
      title,
      content,
      onConfirm: () => closeModal(),
      confirmText,
    });
  };

  return {
    isOpen: modalContent !== null,
    openModal,
    closeModal,
    showConfirmModal,
    showAlertModal,
  };
};
