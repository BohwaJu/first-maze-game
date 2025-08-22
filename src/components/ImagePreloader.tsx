"use client";
import { useEffect, useState } from "react";

interface ImagePreloaderProps {
  images: string[];
  onComplete?: () => void;
  onProgress?: (loaded: number, total: number) => void;
}

const ImagePreloader = ({
  images,
  onComplete,
  onProgress,
}: ImagePreloaderProps) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    let loaded = 0;
    const total = images.length;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          onProgress?.(loaded, total);

          if (loaded === total) {
            setIsComplete(true);
            onComplete?.();
          }
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          onProgress?.(loaded, total);

          if (loaded === total) {
            setIsComplete(true);
            onComplete?.();
          }
          resolve(); // 에러가 나도 계속 진행
        };
        img.src = src;
      });
    };

    // 모든 이미지를 병렬로 preload
    Promise.all(images.map(preloadImage));
  }, [images, onComplete, onProgress]);

  if (isComplete) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        color: "#f0f0f0",
        fontFamily: "var(--font-nanum-myeongjo)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        이미지를 불러오는 중... ({loadedCount}/{images.length})
      </div>
      <div
        style={{
          width: "300px",
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(loadedCount / images.length) * 100}%`,
            height: "100%",
            backgroundColor: "#c18500",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreloader;
