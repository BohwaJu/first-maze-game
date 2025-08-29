"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import FadeInOutText from "@/components/FadeInOutText";
import { EP_1 } from "@/story/episode";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import RollbackButton from "@/components/RollbackButton";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { showNavigationModal } = useModal();
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const handleLastTextReached = () => {
    setShowButton(true);
  };

  const handleButtonClick = () => {
    showNavigationModal({
      title: "EP1",
      content: `이야기의 핵심이 되는 키워드를 찾아야 할 것 같다.`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "키워드",
      onClick: (answer: string) => {
        if (pathname === "/episode/ep1/firstMemory" && answer === "트라우마") {
          localStorage.setItem("episode", "/episode/ep2/trauma");
          router.push("/episode/ep2/trauma");
        } else {
          showToast("아무일도 일어나지 않았다.");
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
          subtitle="첫 번째 기억"
          titleDelay={0}
          onComplete={() => setShowContent(true)}
        />
      )}

      {showContent && (
        <div className="game-page background-hall">
          <PageHeader title="EP1" subtitle="잊혀지지 않는 ____" />
          <TextSlider texts={EP_1} onLastTextReached={handleLastTextReached} />

          <div className="button-container fade-in-slide-up">
            {showButton && (
              <CustomButton
                className="start-button"
                title="키워드"
                onClick={handleButtonClick}
              />
            )}
          </div>
          <RollbackButton />
        </div>
      )}
    </>
  );
};

export default Page;
