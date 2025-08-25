"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { TWINS_TEXT } from "@/story/beforeUnderground";
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
      title: "프레시아의 자매",
      content: `로즈와 로이드는 처음 듣는 이름이라고 했지만, 내겐 어딘가 익숙한 이름이였다.`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "너의 이름은...",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (pathname === "/254-Z/mirror/twin" && answer === "리네시아") {
          router.push("/254-Z/mirror/twin/linesia");
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
        texts={TWINS_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="너의 이름은"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
