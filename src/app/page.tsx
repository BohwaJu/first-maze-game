"use client";
import CustomButton from "@/components/CustomButton";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { modalAtom } from "@/store/modalStore";

export default function Home() {
  const router = useRouter();
  const [, setModalContent] = useAtom(modalAtom);

  return (
    <div className="home-page">
      <PageHeader title="Fressia" subtitle="- The Quest for Treasure -" />
      <p className="home-story fade-in-slide-up-delay-08">
        플로랄왕국 백성여러분.
        <br />
        이번 대축제를 기념하여 지하게임을 개최합니다. <br />
        마지막 관문까지 도달하시는 분들께는 수많은 보물들과, 금화 10억코인의
        보상금이 추가로 지급됩니다. <br />
        <br />
        대축제 기간동안 제한없이 성문을 개방하오니, <br />
        부디 많은분들이 참여하여 제게 있는 보물을 찾아가시길.
        <br />
        <br />
        성 안에서도 자연의 숨결을 느낄 수 있는 곳으로 오세요.
        <br />
        첫번째 게임은 이곳에서 시작합니다.
        <br />
      </p>
      <div className="button-container">
        <CustomButton
          className="home-button fade-in-slide-up-delay-3"
          title="Let's start the game"
          onClick={() => {
            router.push("/start");
          }}
        />
      </div>
    </div>
  );
}
