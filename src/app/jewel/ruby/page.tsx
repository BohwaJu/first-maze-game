"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { RUBY_TEXT } from "@/story/beforeUnderground";
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
      title: "두 번째 보석",
      content: `"예술가가 처형당한건 사실이라는거지? 충격적이네." \n 로이드는 고민에 빠진 얼굴이였다.`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "두 번째 보석은 뭐였을까?",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (pathname === "/jewel/ruby" && answer === "사파이어") {
          router.push("/jewel/sapphire");
        } else {
          router.push("/not-found");
        }
      },
    });
  };

  return (
    <div className="game-page background-library">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <TextSlider texts={RUBY_TEXT} onLastTextReached={handleLastTextReached} />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="두번째 보석"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
