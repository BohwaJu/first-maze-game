"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { GARDEN_TEXT } from "@/story/garden";
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
      title: "암호를 해독하자",
      content: "로이드 어쩌면 펜이 쓰는 용도가 아닐수도 있다고 말했다.",
      confirmText: "이동",
      cancelText: "취소",
      placeholder: "암호를 입력해주세요",
      navigate: (path: string) => {
        console.log(`이동: ${path}`);
        router.push(path);
      },
    });
  };

  return (
    <div className="game-page garden-page">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <TextSlider
        texts={GARDEN_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="준비중"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
