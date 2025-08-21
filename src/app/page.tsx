"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-page background-home">
      <PageHeader
        title="Fressia"
        className=""
        subtitle="- The Quest for Treasure -"
      />
      <div className="home-story fade-in-slide-up-delay-08">
        플로랄 대제국 백성여러분.
        <br />
        이번 축제를 기념하여 특별한 게임을 개최합니다. <br />
        마지막 관문까지 도달하시는 분들께는 거액의 상금이 주어집니다.
        <br />
        <br />
        <p className="text-highlight">
          수많은 보물들, 그리고…
          <br />
          금화 10억코인.
          <br />
          <br />
          오세요. 이곳으로…
          <br />
          <br />성 안에서도 자연의 숨결을 느낄 수 있는 곳으로…
        </p>
        <br />
        <br />
        대축제 기간동안 제한없이 성문을 개방하오니, <br />
        부디 많은분들이 참여하여 제게 있는 보물을 찾아가시길.
        <br />
      </div>
      <div className="button-container">
        <CustomButton
          className="home-button fade-in-slide-up-delay-3"
          title="게임 시작하기"
          onClick={() => {
            router.push("/start");
          }}
        />
      </div>
    </div>
  );
}
