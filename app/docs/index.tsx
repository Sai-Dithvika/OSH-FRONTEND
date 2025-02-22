import React from "react";
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gradient-start via-white to-gradient-end">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-5xl font-bold leading-snug md:text-6xl">
          The Open-hub suite to build products with
        </h1>
        <span className="text-5xl font-serif italic text-black md:text-6xl">
          real World Projects
        </span>
        <p className="mt-6 text-lg text-gray-600">
          Open-hub is community platform which focus open source core.
          contribute and collaborate with open-source projcts you want.
        </p>
        <div className="mt-8 flex space-x-4 items-center justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 font-semibold text-white bg-black rounded-full hover:bg-gray-800"
          >
            Sign up free
          </button>

          <button
            onClick={() => (window.location.href = "/tutorial")}
            className="px-6 py-2 font-semibold border rounded-full hover:bg-gray-100"
          >
            Know More..
          </button>
        </div>
      </div>
    </div>
  );
}
