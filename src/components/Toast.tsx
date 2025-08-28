"use client";
import { useAtom } from "jotai";
import { toastAtom } from "@/store/toastStore";
import { useEffect } from "react";

const Toast = () => {
  const [toastState] = useAtom(toastAtom);

  if (!toastState.isVisible) return null;

  return (
    <div className="toast-overlay">
      <div className="toast-content">{toastState.content}</div>
    </div>
  );
};

export default Toast;
