"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const EpisodeRedirector = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const episodePath = localStorage.getItem("episode");
      if (episodePath && typeof episodePath === "string") {
        // 유효한 경로이고 현재 경로와 다르면 이동
        if (episodePath.startsWith("/") && pathname !== episodePath) {
          router.replace(episodePath);
        }
      }
    } catch {
      // noop
    }
  }, [pathname, router]);

  return null;
};

export default EpisodeRedirector;
