import Cta from "@/components/cta";
import CtaButton from "@/components/ctaButton";
import MainButton from "@/components/mainButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
      <Cta />
      <CtaButton />
      <MainButton />
    </main>
  )
}
