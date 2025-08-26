"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import FadeInOutText from "@/components/FadeInOutText";
import { EP_1 } from "@/story/episode";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { showNavigationModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const handleLastTextReached = () => {
    setShowButton(true);
  };

  const handleButtonClick = () => {
    showNavigationModal({
      title: "EP1. 잊혀지지 않는 기억",
      content: `장애`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "키워드",
      onClick: (answer: string) => {
        console.log(`현재: ${pathname}`);
        if (pathname === "/episode/ep1/firstMemory" && answer === "트라우마") {
          router.push("/episode/ep2/trauma");
        } else {
          return;
        }
      },
    });
  };

  return (
    <>
      {!showContent && (
        <FadeInOutText
          title="Episode 1"
          subtitle="프레시아의 첫 번째 기억"
          titleDelay={0}
          onComplete={() => setShowContent(true)}
        />
      )}

      {showContent && (
        <div className="game-page background-hall">
          <PageHeader title="EP1" subtitle="- 잊혀지지 않는 ____ -" />
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
      )}
    </>
  );
};

export default Page;
