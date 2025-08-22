"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { EP_1 } from "@/story/episode";
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
      title: "EP1. 잊혀지지 않는 밤의 ㅁㅁㅁㅁ",
      content: `장애`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "키워드",
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
      <PageHeader title="EP1" subtitle="- 잊혀지지 않는 밤의 -" />
      <TextSlider texts={EP_1} onLastTextReached={handleLastTextReached} />

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
