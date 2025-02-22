"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import { NavigationMenuDemo } from "./components/auth";
// import CommentsSection from "./components/commentSection";
// import RenderPost from "./post/post";
// import Footer from "../components/footer";
import RenderPost from "../post/post";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const completedSelection = localStorage.getItem("interestCompleted");
    if (!completedSelection) {
      router.push("/"); // Redirect to interest selection if not completed
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

        if (!response.ok) throw new Error("Failed to initiali-ze post");
         localStorage.setItem(session.user.name, "initialized");
        // console.log("Post initialized successfully");
        console.log(session.user.name)
      } catch (error) {
        console.error("Error initializing post:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <>
      <div>{/* <Footer /> */}</div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <main className="flex-1 w-full flex justify-center px-4 mt-4">
          <div className="w-full max-w-2xl">
            <button
              onClick={handleCreateUser}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Initialize Post
            </button>
            <RenderPost />
          </div>
        </main>
      </div>
    </>
  );
}
