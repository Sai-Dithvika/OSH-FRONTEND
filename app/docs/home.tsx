import React from "react";

const Footer = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white rounded-2xl"
      style={{
        backgroundImage: "url('/footer.jpg')", // Ensure footer.jpg is in the public folder
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        borderRadius: "1rem",
      }}
    >
      <div className="text-center max-w-3xl px-4 ">
        <h1 className="text-4xl font-bold md:text-5xl">
          Start your Open-Source journey
        </h1>
        <p className="text-2xl font-serif italic mt-2 md:text-5xl">
          with Lazywin
        </p>

        <button
          onClick={() => (window.location.href = "/interest")}
          className="mt-8 px-6 py-3 font-semibold text-black bg-white rounded-full shadow-lg hover:bg-gray-200"
        >
          Get started now →
        </button>
      </div>

      {/* Footer section */}
      <br />
      <br />

      <footer className="mt-24 mb-6 w-full max-w-5xl px-4 ">
        <div className="flex flex-wrap justify-center gap-20 text-sm font-light mt-14">
          <div className="space-y-2 text-center md:text-left md:space-y-4">
            <h3 className="font-bold text-lg">Product</h3>
            <br />

            <ul className="flex flex-col space-y-1">
              <li>Editor</li>
              <br />
              <li>Collaboration</li>
              <br />

              <li>Content AI</li>
              <br />

              <li>Documents</li>
              <br />

              <li>Pricing</li>
            </ul>
          </div>
          <div className="space-y-2 text-center md:text-left md:space-y-4">
            <h3 className="font-bold text-lg">Company</h3>
            <br />

            <ul className="space-y-1">
              <li>Blog</li>
              <br />

              <li>About</li>
              <br />

              <li>Contact us</li>
            </ul>
          </div>
          <div className="space-y-2 text-center md:text-left md:space-y-4">
            <h3 className="font-bold lg">Docs</h3>
            <br />

            <ul className="space-y-1">
              <li>Editor</li>
              <br />

              <li>Hocuspocus</li>
              <br />

              <li>Extensions</li>

              <br />
              <li>Examples</li>
            </ul>
          </div>
          <div className="space-y-2 text-center md:text-left md:space-y-4">
            <h3 className="font-bold text-lg">Resources</h3>
            <br />

            <ul className="space-y-1">
              <li>Release notes</li>

              <br />
              <li>Experiments</li>

              <br />
              <li>MIT license</li>

              <br />
              <li>Security</li>

              <br />
              <li>Pro license</li>
            </ul>
          </div>
          <div className="space-y-2 text-center md:text-left md:space-y-4">
            <h3 className="font-bold text-lg">Connect</h3>
            <br />

            <ul className="space-y-1">
              <li>GitHub</li>

              <br />
              <li>Discord</li>

              <br />
              <li>LinkedIn</li>

              <br />
              <li>X</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          © 2024 Tiptap &nbsp;&nbsp; System status &nbsp;&nbsp; Privacy policy
          &nbsp;&nbsp; Terms &nbsp;&nbsp; Legal notice
        </div>
      </footer>
    </div>
  );
};

export default Footer;
