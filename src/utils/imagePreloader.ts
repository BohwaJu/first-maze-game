// 이미지 preload를 위한 유틸리티 함수들

export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // 에러가 나도 계속 진행
      img.src = url;
    });
  });

  return Promise.all(promises);
};

// 브라우저의 preload link를 동적으로 추가
export const addPreloadLinks = (imageUrls: string[]) => {
  if (typeof window === "undefined") return;

  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  });
};
