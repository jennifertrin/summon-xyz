import CharacterBox from "./CharacterBox";

export default function CharacterSection() {
  const characters = [
    {
      title: "Mayor",
      description: "A government official determined to transform the city",
      cta: "Chat with them",
      photoHref: "/Mayor.jpeg",
      photoAlt: "The face of a modern-day mayor with a determined look"
    },
    {
        title: "Businessman",
        description: "A businessman seeking old school traditions in business",
        cta: "Chat with them",
        photoHref: "/Businessman.jpeg",
        photoAlt: "The face of a corrupt, traditional businessman"
      },
  ];
  return (
    <section className="bg-white dark:bg-gray-900 flex flex-row gap-6">
        {characters.map((character) => (
            <CharacterBox title={character.title} description={character.description} cta={character.cta} photoHref={character.photoHref} photoAlt={character.photoAlt} />
        ))}
    </section>
  );
}
