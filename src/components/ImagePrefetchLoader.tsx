"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImagePrefetchLoader({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [imageList, setImageList] = useState<string[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [criticalImagesLoaded, setCriticalImagesLoaded] = useState(false);

  useEffect(() => {
    async function loadImageList() {
      try {
        const response = await fetch("/image-list.json");
        const images = await response.json();
        setImageList(images);
        setTotalCount(images.length);

        if (images.length === 0) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load image list:", error);
        setIsLoading(false);
      }
    }

    loadImageList();
  }, []);

  const handleImageLoad = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1;
      return newCount;
    });
  };

  const handleImageError = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1;
      return newCount;
    });
  };

  // 중요한 이미지들이 로드되면 메인 컨텐츠 표시
  useEffect(() => {
    if (loadedCount >= Math.min(8, totalCount)) {
      setCriticalImagesLoaded(true);
      setIsLoading(false);
    }
  }, [loadedCount, totalCount]);

  const progress = totalCount > 0 ? (loadedCount / totalCount) * 100 : 0;

  // 배경 이미지들을 우선순위로 분류
  const backgroundImages = imageList.filter((img) => img.includes("bg_"));
  const otherImages = imageList.filter((img) => !img.includes("bg_"));

  // 중요한 이미지들 (배경 이미지 + 기타 이미지 일부)
  const criticalImages = [
    ...backgroundImages.slice(0, 5),
    ...otherImages.slice(0, 3),
  ];
  const backgroundImagesRemaining = imageList.filter(
    (img) => !criticalImages.includes(img)
  );

  return (
    <>
      {/* 중요한 이미지들 (즉시 로딩) */}
      <div className="image-prefetch-container">
        {criticalImages.map((imagePath, index) => (
          <Image
            key={`critical-${index}`}
            src={imagePath}
            alt=""
            width={1}
            height={1}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={true}
            quality={1}
          />
        ))}
      </div>

      {/* 백그라운드 이미지들 (lazy 로딩) */}
      {criticalImagesLoaded && (
        <div className="image-prefetch-container">
          {backgroundImagesRemaining.map((imagePath, index) => (
            <Image
              key={`background-${index}`}
              src={imagePath}
              alt=""
              width={1}
              height={1}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={false}
              quality={1}
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* 로딩 화면 또는 메인 컨텐츠 */}
      {isLoading && fallback ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          {fallback}
          <div className="mt-4 w-64 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            이미지 로딩 중... {loadedCount}/{Math.min(8, totalCount)} (
            {Math.round(progress)}%)
          </p>
        </div>
      ) : (
        children
      )}
    </>
  );
}
