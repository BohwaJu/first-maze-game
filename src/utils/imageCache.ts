// 이미지 캐싱을 위한 유틸리티

class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private loadingPromises = new Map<string, Promise<HTMLImageElement>>();

  async preloadImage(src: string): Promise<HTMLImageElement> {
    // 이미 캐시된 경우
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    // 이미 로딩 중인 경우
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    // 새로운 이미지 로드
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        this.loadingPromises.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  async preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
    const promises = srcs?.map((src) => this.preloadImage(src));
    return Promise.all(promises);
  }

  isCached(src: string): boolean {
    return this.cache.has(src);
  }

  getCachedImage(src: string): HTMLImageElement | undefined {
    return this.cache.get(src);
  }

  clearCache(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// 싱글톤 인스턴스
export const imageCache = new ImageCache();

// 전역 이미지 preload 함수
export const preloadGlobalImages = async () => {
  const commonImages = [
    "/Lloyd.png",
    "/rose.png",
    "/knight.png",
    "/librarian.png",
    "/q2.png",
  ];

  try {
    await imageCache.preloadImages(commonImages);
    console.log("Global images preloaded successfully");
  } catch (error) {
    console.warn("Some images failed to preload:", error);
  }
};
