"use client";
import React, { useState, useEffect } from "react";

interface FadeInOutTextProps {
  title: string;
  subtitle?: string;
  titleDelay?: number; // 제목이 나타나는 지연 시간 (ms)
  subtitleDelay?: number; // 부제목이 나타나는 지연 시간 (ms)
  holdDuration?: number; // 텍스트가 유지되는 시간 (ms)
  fadeInDuration?: number; // fade-in 시간 (ms)
  fadeOutDuration?: number; // fade-out 시간 (ms)
  onComplete?: () => void; // 애니메이션 완료 후 콜백
  className?: string;
}

const FadeInOutText: React.FC<FadeInOutTextProps> = ({
  title,
  subtitle,
  titleDelay = 0,
  subtitleDelay = 1000,
  holdDuration = 2000,
  fadeInDuration = 1000,
  fadeOutDuration = 1000,
  onComplete,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [subtitleOpacity, setSubtitleOpacity] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    // 컴포넌트 시작
    setIsVisible(true);

    // 제목 fade-in
    const titleFadeInTimer = setTimeout(() => {
      setTitleOpacity(1);
    }, titleDelay + 100);

    // 부제목 fade-in
    const subtitleFadeInTimer = setTimeout(() => {
      setSubtitleOpacity(1);
    }, subtitleDelay + 100);

    // fade-out 시작 (제목과 부제목 동시에)
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTitleOpacity(0);
      setSubtitleOpacity(0);
      setBlurAmount(20); // blur 효과 시작
    }, subtitleDelay + fadeInDuration + holdDuration);

    // 완전히 사라진 후
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, subtitleDelay + fadeInDuration + holdDuration + fadeOutDuration);

    return () => {
      clearTimeout(titleFadeInTimer);
      clearTimeout(subtitleFadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [
    titleDelay,
    subtitleDelay,
    holdDuration,
    fadeInDuration,
    fadeOutDuration,
    onComplete,
  ]);

  if (!isVisible) return null;

  return (
    <div
      className={`episode-fade-container ${className}`}
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="episode-title"
        style={{
          opacity: titleOpacity,
          filter: `blur(${blurAmount}px)`,
          transition: `opacity ${fadeInDuration}ms ease-in-out, filter ${fadeOutDuration}ms ease-in-out`,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          className="episode-subtitle"
          style={{
            opacity: subtitleOpacity,
            filter: `blur(${blurAmount}px)`,
            transition: `opacity ${fadeInDuration}ms ease-in-out, filter ${fadeOutDuration}ms ease-in-out`,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default FadeInOutText;
