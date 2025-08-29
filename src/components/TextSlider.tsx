"use client";
import React, { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { isSponsorGuild } from "@/utils/sponsor";
import { useModal } from "@/hooks/useModal";

interface TextItem {
  text: string;
  className?: string;
  imgUrl?: string;
  image?: StaticImageData;
  imgWidth?: number;
  imgHeight?: number;
  isSponsorCheck?: boolean;
}

interface TextSliderProps {
  texts: TextItem[];
  onLastTextReached?: () => void;
  onIndexChange?: (index: number) => void;
}

const TextSlider = ({
  texts,
  onLastTextReached,
  onIndexChange,
}: TextSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredTexts, setFilteredTexts] = useState<TextItem[]>([]);
  const [nickname, setNickname] = useState("무명");
  const [hydrated, setHydrated] = useState(false);

  const { showConfirmModal, closeModal } = useModal();
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const sponsor = isSponsorGuild();
    setFilteredTexts(sponsor ? texts : texts.filter((t) => !t.isSponsorCheck));
    try {
      const nn = localStorage.getItem("nickname") || "무명";
      setNickname(nn);
    } catch {
      setNickname("무명");
    }
  }, [hydrated, texts, onIndexChange]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (onIndexChange) onIndexChange(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredTexts.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (onIndexChange) onIndexChange(newIndex);

      // 마지막 텍스트에 도달했을 때 콜백 호출
      if (newIndex === filteredTexts.length - 1 && onLastTextReached) {
        onLastTextReached();
      }
    }
  };

  const handleClickJumpToLast = () => {
    showConfirmModal({
      title: "마지막 대사로 이동",
      content: "마지막 대사로 이동할까요?",
      confirmText: "이동",
      cancelText: "취소",
      onCancel: closeModal,
      onConfirm: () => {
        const lastIndex = filteredTexts.length - 1;
        setCurrentIndex(lastIndex);
        if (onIndexChange) onIndexChange(lastIndex);
        if (onLastTextReached) onLastTextReached();
      },
    });
  };

  const current = filteredTexts[currentIndex];

  return (
    <div className="text-slider-container">
      <div className="text-slide" key={currentIndex}>
        {current?.imgUrl && (
          <Image
            key={current.imgUrl}
            src={current.imgUrl}
            alt={current?.text ? `${current.text} 이미지` : "slide image"}
            width={current?.imgWidth ?? 200}
            height={current?.imgHeight ?? 200}
            className="slider-image"
            loading="eager"
            priority
          />
        )}
        <p
          className={`fade-in-slide-up base-slide-text ${
            current?.className || ""
          }`}
        >
          {(current?.text || " ").replace(/\{\{nickname\}\}/g, nickname)}
        </p>
      </div>

      <div className="prev-next-button-container">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="slider-button prev"
        ></button>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredTexts.length - 1}
          className="slider-button next"
        ></button>
      </div>
      <button
        onClick={handleClickJumpToLast}
        disabled={currentIndex === filteredTexts.length - 1}
        className="btn-jump-to-last"
        title="마지막으로 이동"
      ></button>
    </div>
  );
};

export default TextSlider;
