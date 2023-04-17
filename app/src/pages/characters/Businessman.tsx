import CharacterBox from "@/components/characters/CharacterBox";
import Chat from "@/components/characters/Chat";

export default function Businessman() {
  const characters = [
    {
      title: "Businessman",
      description: "A businessman seeking old school traditions in business",
      cta: "Chat with them",
      photoHref: "/Businessman.jpeg",
      photoAlt: "The face of a corrupt, traditional businessman",
      characterAddress: "0x8a1abaf2ba96cd557a606aa9b403770edcd9f1b4",
      characterHref: "/characters/Businessman",
    },
  ];
  return (
    <section className="bg-white dark:bg-gray-900">
      {characters.map((character) => (
        <div
          key={character.title}
          className="w-full flex flex-row gap-6 p-12 h-screen"
        >
          <CharacterBox
            title={character.title}
            description={character.description}
            cta={character.cta}
            photoHref={character.photoHref}
            photoAlt={character.photoAlt}
            characterHref={character.characterHref}
          />
          <Chat address={character.characterAddress} title={character.title} />
        </div>
      ))}
    </section>
  );
}
