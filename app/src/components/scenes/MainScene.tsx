export default function MainScene() {
  return (
    <section className="bg-white dark:bg-gray-900 flex m-6">
      <figure className="max-w-xl">
        <h2 className="text-2xl text-center mb-2 font-bold dark:text-white">
          The game is based on a post-industrial city on the verge of decline
          and transformation
        </h2>
        <img
          className="h-auto max-w-xl rounded-lg"
          src="/CityScene.jpeg"
          alt="A near-declining, post-industrial city with abandoned buildings and a
          beautiful park."
        />
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          A near-declining, post-industrial city with abandoned buildings and a
          beautiful park. It has the potential to thrive.
        </figcaption>
      </figure>
    </section>
  );
}
