"use client";
import { useImagePrefetch } from "../hooks/useImagePrefetch";

export default function ImagePrefetchLoader({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const { isLoading, progress, loadedCount, totalCount } = useImagePrefetch();

  if (isLoading && fallback) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {fallback}
        <div className="mt-4 w-64 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          이미지 로딩 중... {loadedCount}/{totalCount} ({Math.round(progress)}%)
        </p>
      </div>
    );
  }

  return children;
}
