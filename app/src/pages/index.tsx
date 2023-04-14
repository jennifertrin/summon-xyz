import CharacterSection from "@/components/characters/CharacterSection";
import Cta from "@/components/cta";
import CtaButton from "@/components/ctaButton";
import MainScene from "@/components/scenes/MainScene";
import { useDynamicContext } from "@dynamic-labs/sdk-react";

export default function Home() {
  const { primaryWallet } = useDynamicContext();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
      <Cta />
      {primaryWallet ? (
        <div className="mx-auto w-full items-center">
          <CtaButton />
          <div className="flex flex-col mx-auto items-center gap-4">
            <h2 className="flex text-2xl text-center mb-2 font-bold dark:text-white">
              The game is based on a post-industrial city on the verge of
              decline and transformation
            </h2>
            <div className="flex flex-row gap-6">
              <MainScene />
              <CharacterSection />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
