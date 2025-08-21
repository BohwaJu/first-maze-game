"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { GARDEN_TEXT_2 } from "@/story/garden2";
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
      content: "로이드는 펜이 쓰기용이 아닐수도 있다고 말했다.",
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "암호는...",
      onClick: (path: string) => {
        console.log(`${path}`);
        router.push(`/${path}library`);
      },
    });
  };

  return (
    <div className="game-page garden-page background-garden">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <TextSlider
        texts={GARDEN_TEXT_2}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="암호는..."
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
