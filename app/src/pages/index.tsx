import CharacterSection from "@/components/characters/CharacterSection";
import Cta from "@/components/cta";
import CtaButton from "@/components/ctaButton";
import MainScene from "@/components/scenes/MainScene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
      <Cta />
      <CtaButton />
      <MainScene />
      <CharacterSection />
    </main>
  );
}
