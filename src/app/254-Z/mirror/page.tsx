"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { MIRROR_TEXT } from "@/story/beforeUnderground";
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
      title: "또 다른 나",
      content: `"말도안돼..." \n로이드는 무언가를 깨달은 듯 했다.`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "프레시아가 둘이라면...",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (
          pathname === "/254-Z/mirror" &&
          (answer === "쌍둥이" || answer === "자매")
        ) {
          router.push("/254-Z/mirror/twin");
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
        texts={MIRROR_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="프레시아"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
