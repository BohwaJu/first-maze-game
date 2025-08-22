"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image, { type StaticImageData } from "next/image";
import { isSponsorGuild } from "@/utils/sponsor";
import ImagePreloader from "./ImagePreloader";
import { addPreloadLinks } from "@/utils/imagePreloader";
import { imageCache } from "@/utils/imageCache";

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
  const [filteredTexts, setFilteredTexts] = useState<TextItem[]>([]);
  const [nickname, setNickname] = useState("무명");
  const [hydrated, setHydrated] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  // 이미지 URL들을 추출하고 preload link 추가
  const imageUrls = useMemo(() => {
    if (!hydrated) return [];
    const sponsor = isSponsorGuild();
    const filtered = sponsor ? texts : texts.filter((t) => !t.isSponsorCheck);
    const urls = filtered
      .map((item) => item.imgUrl)
      .filter(Boolean) as string[];

    // 브라우저 preload link 추가
    if (urls.length > 0) {
      addPreloadLinks(urls);
    }

    return urls;
  }, [hydrated, texts]);

  // 이미지 캐시 확인 및 로드
  useEffect(() => {
    if (imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const checkAndLoadImages = async () => {
      try {
        // 캐시되지 않은 이미지들만 로드
        const uncachedImages = imageUrls.filter(
          (url) => !imageCache.isCached(url)
        );

        if (uncachedImages.length > 0) {
          await imageCache.preloadImages(uncachedImages);
        }

        setImagesLoaded(true);
      } catch (error) {
        console.warn("Some images failed to load:", error);
        setImagesLoaded(true); // 에러가 나도 계속 진행
      }
    };

    checkAndLoadImages();
  }, [imageUrls]);

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

  // 이미지가 로드되지 않았으면 preloader 표시
  if (!imagesLoaded) {
    return (
      <ImagePreloader
        images={imageUrls}
        onComplete={() => setImagesLoaded(true)}
      />
    );
  }

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
