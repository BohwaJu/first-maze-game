"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { LIBRARY_TEXT } from "@/story/54library";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const { showNavigationModal } = useModal();
  const router = useRouter();

  const handleLastTextReached = () => {
    setShowButton(true);
  };

  const handleButtonClick = () => {
    showNavigationModal({
      title: "예술가가 사용한 보석",
      content: "예술가는 왜 이 보석을 선택했을까?",
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "그게 뭐지?",
      onClick: (path: string) => {
        console.log(`이동: ${path}`);
        router.push(path);
      },
    });
  };

  return (
    <div className="game-page background-library">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <TextSlider
        texts={LIBRARY_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="보석을 찾아서"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
