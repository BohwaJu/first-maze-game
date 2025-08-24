"use client";

import { useEffect, useState } from "react";

export function useImagePrefetch() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prefetchImages() {
      try {
        // 이미지 목록 가져오기
        const response = await fetch("/image-list.json");
        const imageList = await response.json();

        setTotalCount(imageList.length);

        if (imageList.length === 0) {
          setIsLoading(false);
          return;
        }

        // 이미지 프리로딩
        const loadPromises = imageList.map((imagePath: string) => {
          return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
              setLoadedCount((prev) => prev + 1);
              resolve(imagePath);
            };

            img.onerror = () => {
              console.warn(`Failed to load image: ${imagePath}`);
              setLoadedCount((prev) => prev + 1);
              resolve(imagePath); // 에러가 나도 카운트 증가
            };

            img.src = imagePath;
          });
        });

        await Promise.all(loadPromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to prefetch images:", error);
        setIsLoading(false);
      }
    }

    prefetchImages();
  }, []);

  return {
    isLoading,
    loadedCount,
    totalCount,
    progress: totalCount > 0 ? (loadedCount / totalCount) * 100 : 0,
  };
}
