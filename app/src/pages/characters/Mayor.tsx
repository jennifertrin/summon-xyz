import CharacterBox from "@/components/characters/CharacterBox";
import Chat from "@/components/characters/Chat";

export default function Mayor() {
  const characters = [
    {
      title: "Mayor",
      description: "A government official determined to transform the city",
      cta: "Chat with them",
      photoHref: "/Mayor.jpeg",
      photoAlt: "The face of a modern-day mayor with a determined look",
      characterAddress: "0x5cf264fb15e275b14fba764e3d4d3e723b67b573",
      characterHref: "/characters/Mayor",
    },
  ];
  return (
    <section className="bg-white dark:bg-gray-900">
      {characters.map((character) => (
        <div key={character.title} className="w-full flex flex-row gap-6 p-12 h-screen">
          <CharacterBox
            title={character.title}
            description={character.description}
            cta={character.cta}
            photoHref={character.photoHref}
            photoAlt={character.photoAlt}
            characterAddress={character.characterAddress}
            characterHref={character.characterHref}
          />
          <Chat address={character.characterAddress} />
        </div>
      ))}
    </section>
  );
}
