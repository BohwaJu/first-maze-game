import fs from "fs";
import path from "path";

function getAllImages(dir: string, imageList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImages(filePath, imageList);
    } else if (/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i.test(file)) {
      // public 폴더 기준 상대 경로로 변환
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

// 이미지 목록을 JSON 파일로 저장
fs.writeFileSync(
  path.join(process.cwd(), "public", "image-list.json"),
  JSON.stringify(images, null, 2)
);

console.log(`Generated image list with ${images.length} images`);
