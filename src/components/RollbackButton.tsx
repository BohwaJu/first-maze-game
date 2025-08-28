"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";

const RollbackButton: React.FC = () => {
  const router = useRouter();
  const { showConfirmModal } = useModal();

  const handleClickRollback = () => {
    showConfirmModal({
      title: "기억을 잃는다",
      content:
        "Episode 부터는 클리어 시 기억이 저장됩니다. \n초기화 하시겠습니까?",
      confirmText: "초기화",
      cancelText: "취소",
      onConfirm: handleRollback,
    });
  };

  const handleRollback = () => {
    try {
      localStorage.clear();
      sessionStorage?.clear?.();
    } catch {}
    router.push("/");
  };

  return (
    <div className="btn-rollback">
      <button onClick={handleClickRollback}></button>
    </div>
  );
};

export default RollbackButton;
