"use client";
import { useAtom } from "jotai";
import { modalAtom } from "@/store/modalStore";
import { useState, useEffect } from "react";

const Modal = () => {
  const [modalContent, setModalContent] = useAtom(modalAtom);
  const [inputValue, setInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");

  useEffect(() => {
    if (modalContent?.inputValue) {
      setInputValue(modalContent.inputValue);
    }
    if (modalContent?.inputValue2 !== undefined) {
      setSecondInputValue(modalContent.inputValue2 || "");
    }
  }, [modalContent?.inputValue, modalContent?.inputValue2]);

  if (!modalContent) return null;

  const handleCancel = () => {
    if (modalContent.onCancel) {
      modalContent.onCancel();
    }
    setModalContent(null);
    setInputValue("");
    setSecondInputValue("");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalContent(null);
      setInputValue("");
      setSecondInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (modalContent.onInputChange) {
      modalContent.onInputChange(value);
    }
  };

  const handleSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecondInputValue(value);
    if (modalContent.onSecondInputChange) {
      modalContent.onSecondInputChange(value);
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

    // 인풋 값이 있고 onClick 함수가 있으면 그대로 전달
    const trimmedFirst = inputValue.trim();
    const trimmedSecond = secondInputValue.trim();
    if (trimmedFirst && modalContent.onClick) {
      modalContent.onClick(trimmedFirst, trimmedSecond || undefined);
    }

    setModalContent(null);
    setInputValue("");
    setSecondInputValue("");
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
                modalContent.placeholder1 || "페이지 경로를 입력하세요"
              }
              className="modal-input"
              autoFocus
              key="navigation-input"
            />
          )}
          {modalContent.inputValue2 !== undefined && (
            <input
              type="text"
              value={secondInputValue}
              onChange={handleSecondInputChange}
              placeholder={
                modalContent.placeholder2 || "두번째 값을 입력하세요"
              }
              className="modal-input"
              key="navigation-second-input"
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
          {(modalContent.onConfirm || modalContent.onClick) &&
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
