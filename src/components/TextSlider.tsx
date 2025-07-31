"use client";
import React, { useState } from "react";

interface TextItem {
  text: string;
  className?: string;
}

interface TextSliderProps {
  texts: TextItem[];
  onLastTextReached?: () => void;
}

const TextSlider = ({ texts, onLastTextReached }: TextSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < texts.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      // 마지막 텍스트에 도달했을 때 콜백 호출
      if (newIndex === texts.length - 1 && onLastTextReached) {
        onLastTextReached();
      }
    }
  };

  // texts가 없거나 비어있으면 로딩 표시
  if (!texts || texts.length === 0) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        텍스트를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="text-slider-container">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="slider-button"
      >
        &lt;
      </button>

      <p
        key={currentIndex}
        className={`fade-in-slide-up base-slide-text ${
          texts[currentIndex]?.className || ""
        }`}
      >
        {texts[currentIndex]?.text || "텍스트 없음"}
      </p>

      <button
        onClick={handleNext}
        disabled={currentIndex === texts.length - 1}
        className="slider-button"
      >
        &gt;
      </button>

      {/* 태블릿 이하에서만 보이는 버튼 컨테이너 */}
      <div className="slider-buttons-container">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="slider-button"
        >
          &lt;
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === texts.length - 1}
          className="slider-button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TextSlider;
