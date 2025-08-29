"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import FadeInOutText from "@/components/FadeInOutText";
import { EP_2 } from "@/story/episode";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
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
      title: "EP2",
      content: `"이야기의 키워드를 찾아아보자."`,
      confirmText: "이동",
      cancelText: "취소",
      placeholder1: "키워드",
      onClick: (answer: string) => {
        if (pathname === "/episode/ep2/trauma" && answer === "가족") {
          router.push("/episode/ep3/forgetMeNot");
        } else {
          showToast("아무일도 일어나지 않았다.");
          return;
        }
      },
    });
  };

  const [bgClass, setBgClass] = useState("background-home");

  const handleIndexChange = (index: number) => {
    console.log("현재인덱스", index);
    if (index <= 44) {
      setBgClass("background-home");
    } else if (index <= 100) {
      setBgClass("background-kings-desk");
    } else {
      setBgClass("background-home");
    }
  };

  return (
    <>
      {!showContent && (
        <FadeInOutText
          title="Episode 2"
          subtitle="없어도 되는 것"
          titleDelay={0}
          onComplete={() => setShowContent(true)}
        />
      )}

      {showContent && (
        <div className={`game-page ${bgClass}`}>
          <PageHeader title="EP2" subtitle="없어도 되는 것" />
          <TextSlider
            texts={EP_2}
            onLastTextReached={handleLastTextReached}
            onIndexChange={handleIndexChange}
          />

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
