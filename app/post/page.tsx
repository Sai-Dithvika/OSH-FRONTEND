import RenderPost from "./post";

// app/post/page.tsx
const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <main className="flex-1 w-full flex justify-center px-4 ">
        <div className="w-full max-w-2xl">
          <RenderPost />
        </div>
      </main>
    </div>
  );
};

export default page;
