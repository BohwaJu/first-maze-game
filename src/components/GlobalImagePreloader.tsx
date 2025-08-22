"use client";
import { useEffect } from "react";
import { preloadGlobalImages } from "@/utils/imageCache";

const GlobalImagePreloader = () => {
  useEffect(() => {
    // 앱 시작 시 전역 이미지들을 백그라운드에서 preload
    preloadGlobalImages();
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default GlobalImagePreloader;
