"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { START_TEXT } from "@/story/start";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const { showConfirmModal, showNavigationModal } = useModal();

  const router = useRouter();
  const handleLastTextReached = () => {
    setShowButton(true);
  };

  const handleButtonClick = () => {
    showNavigationModal({
      title: "어디로 가시겠습니까?",
      content: "어디로? 라고 묻자, 로즈가 답했다.",
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "자연의 숨결을 느낄 수 있는 곳",
      onClick: (path: string) => {
        console.log(`이동: ${path}`);
        if (path === "정원") {
          router.push(`/garden`);
        } else {
          router.push(`/not-found`);
        }
      },
    });
  };

  return (
    <div className="game-page start-page background-beer">
      <PageHeader title="Fressia" subtitle="- Prologue -" />
      <TextSlider
        texts={START_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="어디로 가는거야?"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
