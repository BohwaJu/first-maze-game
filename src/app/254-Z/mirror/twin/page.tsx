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
      title: "준비중",
      content: `준비중`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "...",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (pathname === "/254-Z/mirror/twin" && answer === "거울") {
          // router.push("/254-Z/mirror");
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
        texts={TWINS_TEXT}
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
