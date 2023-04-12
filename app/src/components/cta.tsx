import "flowbite";
import DynamicContextProvider from "./ContextProvider/DynamicContextProvider";

export default function Cta() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-md text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
            Summon
          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            A tool that enhances web3 games with analytics and community-built
            gaming experiences.
          </p>
          <div className="inline-block mx-auto">
            <DynamicContextProvider />
          </div>
        </div>
      </div>
    </section>
  );
}
