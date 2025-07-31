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
    content?: string;
    children?: React.ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    title?: string;
    confirmText?: string;
    cancelText?: string;
  }) => {
    openModal({
      title: options.title,
      content: options.content,
      children: options.children,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
    });
  };

  const showNavigationModal = (options: {
    title?: string;
    content?: string;
    children?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    placeholder?: string;
    navigate: (path: string) => void;
  }) => {
    openModal({
      title: options.title || "페이지 이동",
      content: options.content || "이동하고 싶은 페이지 경로를 입력하세요.",
      children: options.children,
      inputValue: "",
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      confirmText: options.confirmText || "이동",
      cancelText: options.cancelText || "취소",
      navigate: options.navigate,
      placeholder: options.placeholder,
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
    showNavigationModal,
    showAlertModal,
  };
};
