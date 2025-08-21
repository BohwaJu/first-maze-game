"use client";
import { useAtom } from "jotai";
import { modalAtom } from "@/store/modalStore";
import { useState, useEffect } from "react";

const Modal = () => {
  const [modalContent, setModalContent] = useAtom(modalAtom);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (modalContent?.inputValue) {
      setInputValue(modalContent.inputValue);
    }
  }, [modalContent?.inputValue]);

  if (!modalContent) return null;

  const handleCancel = () => {
    if (modalContent.onCancel) {
      modalContent.onCancel();
    }
    setModalContent(null);
    setInputValue("");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalContent(null);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (modalContent.onInputChange) {
      modalContent.onInputChange(value);
    }
  };

  const translatePath = (path: string): string => {
    const pathMap: { [key: string]: string } = {
      정원: "garden",
      54: "54library",
    };

    return pathMap[path] || path;
  };

  const handleConfirm = () => {
    if (modalContent.onConfirm) {
      modalContent.onConfirm();
    }

    // 인풋 값이 있고 navigate 함수가 있으면 네비게이션
    if (inputValue.trim() && modalContent.navigate) {
      const translatedPath = translatePath(inputValue.trim());
      const path = `/${translatedPath}`;
      modalContent.navigate(path);
    }

    setModalContent(null);
    setInputValue("");
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {modalContent.title && (
          <h2 className="modal-title">{modalContent.title}</h2>
        )}
        <div className="modal-body">
          {modalContent.content && <p>{modalContent.content}</p>}
          {modalContent.children}
          {modalContent.inputValue !== undefined && (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={
                modalContent.placeholder || "페이지 경로를 입력하세요"
              }
              className="modal-input"
              autoFocus
              key="navigation-input"
            />
          )}
        </div>
        <div className="modal-actions">
          {modalContent.onCancel && modalContent.cancelText && (
            <button
              className="modal-button modal-button-cancel"
              onClick={handleCancel}
            >
              {modalContent.cancelText}
            </button>
          )}
          {(modalContent.onConfirm || modalContent.navigate) &&
            modalContent.confirmText && (
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
