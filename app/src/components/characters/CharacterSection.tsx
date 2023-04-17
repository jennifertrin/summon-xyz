import CharacterBox from "./CharacterBox";

export default function CharacterSection() {
  const characters = [
    {
      title: "Mayor",
      description: "A government official determined to revitalize the city",
      cta: "Chat with them",
      photoHref: "/Mayor.jpeg",
      photoAlt: "The face of a modern-day mayor with a determined look",
      characterAddress: "0x5cf264fb15e275b14fba764e3d4d3e723b67b573",
      characterHref: "/characters/Mayor",
    },
    {
      title: "Businessman",
      description: "A businessman utilizing the remaining resources of the city",
      cta: "Chat with them",
      photoHref: "/Businessman.jpeg",
      photoAlt: "The face of a corrupt, traditional businessman",
      characterAddress: "0x8a1abaf2ba96cd557a606aa9b403770edcd9f1b4",
      characterHref: "/characters/Businessman",
    },
  ];
  return (
    <section className="bg-white dark:bg-gray-900 flex flex-row gap-6">
      {characters.map((character) => (
        <CharacterBox
          key={character.title}
          title={character.title}
          description={character.description}
          cta={character.cta}
          photoHref={character.photoHref}
          photoAlt={character.photoAlt}
          characterHref={character.characterHref}
        />
      ))}
    </section>
  );
}
