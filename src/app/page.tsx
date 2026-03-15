/**
 * @ai Wrote Code
 * @aidetails Initialized a clean landing page for Astro Teller with parent-friendly UI.
 *
 * This is the main entry point for the application. It uses Tailwind CSS 
 * to provide a high-contrast, large-font welcome message.
 *
 * @returns {JSX.Element} The rendered welcome page component.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Astro Teller
        </h1>
        <p className="text-2xl text-gray-800">
          爸爸妈妈，这是我为你们开发的算命软件！
        </p>
        <p className="mt-4 text-lg text-gray-500">
          正在建设中，敬请期待...
        </p>
      </div>
    </main>
  );
}