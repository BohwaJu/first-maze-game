"use client";
import React, { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { isSponsorGuild } from "@/utils/sponsor";

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
}

const TextSlider = ({ texts, onLastTextReached }: TextSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredTexts, setFilteredTexts] = useState<TextItem[]>(() =>
    texts.filter((t) => !t.isSponsorCheck)
  );
  const [nickname, setNickname] = useState("무명");
  const [hydrated, setHydrated] = useState(false);

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
  }, [hydrated, texts]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredTexts.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      // 마지막 텍스트에 도달했을 때 콜백 호출
      if (newIndex === filteredTexts.length - 1 && onLastTextReached) {
        onLastTextReached();
      }
    }
  };

  // texts가 없거나 비어있으면 로딩 표시
  if (!filteredTexts || filteredTexts.length === 0) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        텍스트를 불러오는 중...
      </div>
    );
  }

  const current = filteredTexts[currentIndex];

  return (
    <div className="text-slider-container">
      <div className="text-slide" key={currentIndex}>
        {current?.imgUrl && (
          <Image
            key={`${currentIndex}-image`}
            src={current.imgUrl}
            alt={current?.text ? `${current.text} 이미지` : "slide image"}
            width={current?.imgWidth ?? 200}
            height={current?.imgHeight ?? 200}
            className="slider-image"
            priority
          />
        )}
        <p
          className={`fade-in-slide-up base-slide-text ${
            current?.className || ""
          }`}
        >
          {(current?.text || "텍스트 없음").replace(
            /\{\{nickname\}\}/g,
            nickname
          )}
        </p>
      </div>

      {/* 태블릿 이하에서만 보이는 버튼 컨테이너 */}
      <div className="prev-next-button-container">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="slider-button"
        >
          &lt;
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredTexts.length - 1}
          className="slider-button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TextSlider;
