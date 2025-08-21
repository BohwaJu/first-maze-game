"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { Z_TEXT } from "@/story/beforeUnderground";
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
      title: "소리없는 그것",
      content: `"그것이 뭘까? 이게 키 일것 같은데..."\n 로즈는 다른 힌트가 있는지 시집을 더 뒤적거렸지만, 똑같은 내용 뿐이였다.`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "소리없는...",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (pathname === "/254-Z" && answer === "거울") {
          router.push("/254-Z/mirror");
        } else {
          router.push("/not-found");
        }
      },
    });
  };

  return (
    <div className="game-page background-library">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <TextSlider texts={Z_TEXT} onLastTextReached={handleLastTextReached} />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="소리없는 그것"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
