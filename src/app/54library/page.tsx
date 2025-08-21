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
      title: "준비중",
      content: "ㅇㅇ",
      confirmText: "이동",
      cancelText: "취소",
      placeholder: "준비중임",
      navigate: (path: string) => {
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
            title="암호 해독하기"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
