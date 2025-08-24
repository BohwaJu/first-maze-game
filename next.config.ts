import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 빌드 시에만 실행 (개발 모드에서도 동작하게 하려면 dev 조건 제거)
    if (isServer) {
      // 이미지 목록 생성 함수
      function generateImageList() {
        function getAllImages(dir: string, imageList: string[] = []) {
          if (!fs.existsSync(dir)) return imageList;

          const files = fs.readdirSync(dir);

          files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              getAllImages(filePath, imageList);
            } else if (/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i.test(file)) {
              const relativePath = filePath.replace(
                path.join(process.cwd(), "public"),
                ""
              );
              imageList.push(relativePath.replace(/\\/g, "/"));
            }
          });

          return imageList;
        }

        const publicDir = path.join(process.cwd(), "public");
        const images = getAllImages(publicDir);

        // public 폴더에 JSON 파일 생성
        const outputPath = path.join(
          process.cwd(),
          "public",
          "image-list.json"
        );
        fs.writeFileSync(outputPath, JSON.stringify(images, null, 2));

        console.log(
          `✅ Generated image list with ${images.length} images at build time`
        );
      }

      generateImageList();
    }

    return config;
  },
};

export default nextConfig;
