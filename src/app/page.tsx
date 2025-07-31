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
      <p className="start-story fade-in-slide-up-delay-08">
        황야의 중심지, 플로랄 왕국. <br />
        <br />
        대축제가 열리는 날이라, 시장 사람들은 모두 분주히 움직였다. <br />
        오늘따라 유난히 많은 인파가 몰려있는 곳은 로랄성의 공문이 붙어있는
        게시판 앞이였다. <br />
        <br />
        왕국에서 직접 상금을 건 게임을 개최한 것이다.
        <br />
        <br />
        매우 이례적인 일이라, 내용을 확인한 사람들은 모두 들떠있었다.
        <br />
        <br /> 로이드는 게임의 내용을 확인 한 뒤,
        <br /> 근처에 있는 허름한 맥주집으로 들어갔다.
        <br />
      </p>
      <div className="button-container">
        <CustomButton
          className="start-button fade-in-slide-up-delay-3"
          title="Let's start the game"
          onClick={() => {
            router.push("/start");
          }}
        />
      </div>
    </div>
  );
}
