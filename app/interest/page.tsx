"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RenderPost from "../post/post";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const completedSelection = localStorage.getItem("interestCompleted");
    if (!completedSelection) {
      router.push("/");
    }
  }, [router]);

  const handleCreateUser = async () => {
    if (session?.user?.name) {
      try {
        const response = await fetch("http://localhost:6969/users/inituser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            github_id: session.user.name,
            user_email: session.user.email,
            avatar_url: session.user.image,
            tags_of_interest: "{}",
          }),
        });

        if (!response.ok) throw new Error("Failed to initialize post");

        localStorage.setItem(session.user.name, "initialized");
        router.push("/post/create"); // Add redirect after successful initialization
      } catch (error) {
        console.error("Error initializing post:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <main className="flex-1 w-full flex justify-center px-4 mt-4">
          <div className="w-full max-w-2xl">
            <RenderPost />
          </div>
        </main>
        
        <button
          onClick={() => router.push('/post/create')}
          className="fixed bottom-8 right-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          Initialize Post
        </button>
      </div>
    </>


  );
}