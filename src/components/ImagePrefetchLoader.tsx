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
      if (newCount >= totalCount) {
        setIsLoading(false);
      }
      return newCount;
    });
  };

  const handleImageError = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalCount) {
        setIsLoading(false);
      }
      return newCount;
    });
  };

  // CSS 배경 이미지들도 미리 로드
  useEffect(() => {
    if (imageList.length > 0) {
      const cssBackgroundImages = [
        "/bg_castle.jpg",
        "/bg_garden.jpg",
        "/bg_beer.jpg",
        "/bg_book.jpg",
        "/bg_hall.jpg",
        "/bg_kings_desk.jpg",
        "/bg_fressia_room.jpg",
        "/bg_linen.jpg",
      ];

      cssBackgroundImages.forEach((imagePath) => {
        const img = new window.Image();
        img.onload = () => {
          console.log(`CSS background image preloaded: ${imagePath}`);
        };
        img.onerror = () => {
          console.warn(`Failed to preload CSS background image: ${imagePath}`);
        };
        img.src = imagePath;
      });
    }
  }, [imageList]);

  const progress = totalCount > 0 ? (loadedCount / totalCount) * 100 : 0;

  return (
    <>
      {/* 모든 이미지 즉시 로딩 */}
      <div className="image-prefetch-container">
        {imageList.map((imagePath: string, index: number) => (
          <Image
            key={imagePath}
            src={imagePath}
            alt=""
            width={30}
            height={30}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={true}
            quality={1}
          />
        ))}
      </div>

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
            이미지 로딩 중... {loadedCount}/{totalCount} ({Math.round(progress)}
            %)
          </p>
        </div>
      ) : (
        children
      )}
    </>
  );
}
