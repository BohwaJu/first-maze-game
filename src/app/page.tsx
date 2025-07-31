"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-page">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <p className="start-story fade-in-slide-up-delay-08">
        로랄왕국 백성여러분 주목해주세요. <br />
        <br />
        이번 대축제를 기념하여 단 한번만 열리는 게임을 개최합니다. <br />
        <br />
        마지막 관문까지 도달하시는 분들께는 값비싼 보물들과 함께, <br />
        <br />
        10억의 보상금이 추가로 지급됩니다. <br />
        <br />
        <br />
        <br />
        대축제 기간동안 성문을 개방하오니, <br />
        <br />
        번잡한 성 안에서도 자연의 숨결을 느낄 수 있는 곳
        <br />
        <br />
        살구나무 아래에서 게임을 시작하세요.
        <br />
        <br />
        부디 많은분들이 참여하여 제게 있는 보물을 찾아가시길.
      </p>
      <div className="button-container">
        <CustomButton
          className="start-button fade-in-slide-up-delay-3"
          title="Participate in this game"
          onClick={() => {
            router.push("/start");
          }}
        />
      </div>
    </div>
  );
}
