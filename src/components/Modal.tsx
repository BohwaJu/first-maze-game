"use client";
import { useAtom } from "jotai";
import { modalAtom } from "@/store/modalStore";

const Modal = () => {
  const [modalContent, setModalContent] = useAtom(modalAtom);

  if (!modalContent) return null;

  const handleConfirm = () => {
    if (modalContent.onConfirm) {
      modalContent.onConfirm();
    }
    setModalContent(null);
  };

  const handleCancel = () => {
    if (modalContent.onCancel) {
      modalContent.onCancel();
    }
    setModalContent(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalContent(null);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {modalContent.title && (
          <h2 className="modal-title">{modalContent.title}</h2>
        )}
        <div className="modal-body">{modalContent.content}</div>
        <div className="modal-actions">
          {modalContent.onCancel && modalContent.cancelText && (
            <button
              className="modal-button modal-button-cancel"
              onClick={handleCancel}
            >
              {modalContent.cancelText}
            </button>
          )}
          {modalContent.onConfirm && modalContent.confirmText && (
            <button
              className="modal-button modal-button-confirm"
              onClick={handleConfirm}
            >
              {modalContent.confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
