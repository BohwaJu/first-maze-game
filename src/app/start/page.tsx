"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { sampleTexts } from "@/story/step1";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const { showConfirmModal } = useModal();

  const handleLastTextReached = () => {
    setShowButton(true);
  };

  const handleButtonClick = () => {
    showConfirmModal({
      content: "로즈는 나를 바라보며 당연히 _____로 가야지! 라고 말했다.",
      onConfirm: () => {
        console.log("게임 시작");
        // 여기에 게임 시작 로직 추가
      },
      onCancel: () => {
        console.log("취소");
      },
      confirmText: "시작",
    });
  };

  return (
    <div className="game-page start-page">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <TextSlider
        texts={sampleTexts}
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
