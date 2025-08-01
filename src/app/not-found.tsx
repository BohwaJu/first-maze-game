"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="not-found-page">
      <PageHeader title="404" subtitle="- Page Not Found -" />

      <div className="not-found-content">
        <h1 className="not-found-title">Game Over</h1>
        <p className="not-found-message">
          길을 잘못 들었다.
          <br />
          <br />
        </p>

        <div className="not-found-actions">
          <CustomButton
            title="홈으로 돌아가기"
            onClick={handleGoHome}
            className="not-found-button"
          />
          <CustomButton
            title="이전 페이지로"
            onClick={handleGoBack}
            className="not-found-button"
          />
        </div>
      </div>
    </div>
  );
}
