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
      title: "제 소속과 이름은...",
      content: "이 사람에게 내 소속을 밝혀도 될까?",
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "소속",
      placeholder2: "이름",
      onClick: (firstInput: string, secondInput?: string) => {
        const guild = firstInput.trim();
        const nickname = (secondInput || "").trim();

        if (guild) localStorage.setItem("guild", guild);
        if (nickname) localStorage.setItem("nickname", nickname);
        router.push("/garden/garden");
      },
    });
  };

  return (
    <div className="game-page garden-page background-garden">
      <PageHeader title="Fressia" subtitle="- Prologue -" />
      <TextSlider
        texts={GARDEN_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="제 이름은..."
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
