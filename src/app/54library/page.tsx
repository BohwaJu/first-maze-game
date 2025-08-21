"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { LIBRARY_TEXT } from "@/story/beforeUnderground";
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
      title: "예술가가 사용한 보석",
      content: `"이 보석을 사용했다고 들었어."`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "그게 뭔데?",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (pathname === "/54library" && answer === "루비") {
          router.push("/jewel/ruby");
        } else {
          router.push("/not-found");
        }
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
