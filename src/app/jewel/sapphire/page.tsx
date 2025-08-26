"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { SAPPHIRE_TEXT } from "@/story/beforeUnderground";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const { showNavigationModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const handleLastTextReached = () => {
    setShowButton(true);
  };

  const handleButtonClick = () => {
    showNavigationModal({
      title: "정 반대의 의미",
      content: `고개를 들어 우리가 있는 위치를 한번 더 확인했다.`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "정 반대에 있는 도서",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (pathname === "/jewel/sapphire" && answer === "254-Z") {
          router.push("/254-Z");
        } else {
          router.push("/not-found");
        }
      },
    });
  };

  return (
    <div className="game-page background-library">
      <PageHeader title="Fressia" subtitle="- Prologue -" />
      <TextSlider
        texts={SAPPHIRE_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="정 반대의 의미"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
