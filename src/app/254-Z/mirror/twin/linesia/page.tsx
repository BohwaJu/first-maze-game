"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import TextSlider from "@/components/TextSlider";
import { useModal } from "@/hooks/useModal";
import { LINESIA_TEXT } from "@/story/beforeUnderground";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const { showNavigationModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const handleLastTextReached = () => {
    setShowButton(true);
  };

  const handleButtonClick = () => {
    localStorage.setItem("episode", "/episode/ep1/firstMemory");
    router.push("/episode/ep1/firstMemory");
  };

  return (
    <div className="game-page background-library">
      <PageHeader title="Fressia" subtitle="- Prologue -" />
      <TextSlider
        texts={LINESIA_TEXT}
        onLastTextReached={handleLastTextReached}
      />

      <div className="button-container fade-in-slide-up">
        {showButton && (
          <CustomButton
            className="start-button"
            title="안개 속으로"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
