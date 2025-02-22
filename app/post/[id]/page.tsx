"use client";

import CommunityCard from "@/app/components/community";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// Google Analytics functions
const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag("config", "G-CEM0FR3VWY", {
      page_path: url,
    });
  }
};

const trackEvent = (category: string, action: string, label: string) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};
interface PostData {
  title: string;
  content: string;
  created_at: string;
  post_id: number;
  tags: string[];
  total_comments: number;
  total_dislikes: number;
  total_likes: number;
  user_id: string;
  imageurl: string;
  room_id: string;
}

interface PostPageProps {
  params: { id: string };
}

const PostPage = ({ params }: PostPageProps) => {
  // const { data: session } = useSession;
  // const router = useRouter();
  const handleRoomClick = () => {
    console.log("Room clicked");
    redirect("/chat");
  };
  const { id } = params;
  const [post, setPost] = useState<PostData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:6969/users/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setPost(result.data[0]);
        const mappedPosts = result.data.map(
          (post: any) => ({
            id: post.post_id,
            room_id: post.room_id,
          }),
          []
        );
        localStorage.setItem("room_id", mappedPosts[0].room_id);
        // console.log("Post fetched successfully", result.data[0]);

        // Track page view with GA once the post data is fetched
        trackPageView(`/post/${id}`);
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError("Failed to load the post. Please try again later.");
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <div className="relative flex justify-center px-4">
      <div className="flex flex-col w-full max-w-screen-lg p-4 md:p-8 items-center">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : post ? (
          <>
            <div className="flex flex-col justify-center gap-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">{post.title}</h2>
              <div className="w-full text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
                <p>
                  Posted by:{" "}
                  <span className="font-semibold">{post.user_id}</span> on{" "}
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </p>
              </div>

              <Image
                src="/quote1.svg"
                alt="Quote Image 1"
                className="w-6 h-6 md:w-8 md:h-8 object-cover mx-auto md:mx-0"
                width={32}
                height={32}
              />
              <p className="text-gray-700 text-xl md:text-2xl font-semibold mt-2 px-2 md:px-0">
                &quot;Your inspirational quote here.&quot;
              </p>
              <div className="flex justify-center md:justify-end w-full mt-2">
                <Image
                  src="/quote2.svg"
                  alt="Quote Image 2"
                  className="w-6 h-6 md:w-8 md:h-8 object-cover"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            <div className="text-left mt-6 md:mt-8 w-full">
              <div
                className="text-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            <Image src={post.imageurl} alt="image" width={800} height={450} />
            <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
              <Link
                href={`/post/${post.post_id}/comment`}
                className="w-fit flex items-center gap-2 text-blue-500"
                onClick={() =>
                  trackEvent(
                    "Post",
                    "Viewed Comments",
                    `Post ID: ${post.post_id}`
                  )
                }
              >
                <MessageSquare className="h-4 w-4 " />0 comments
              </Link>
            </div>
          </>
        ) : (
          <p>Loading post...</p>
        )}
      </div>
      <div className="hidden lg:block fixed right-32 top-20 ">
        <div className="w-[100%] p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            About r/react
          </h2>
          <div className="text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Created</span>
              <span>June 11, 2023</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Members</span>
              <span>2</span>
            </div>
          </div>
          <button
            onClick={handleRoomClick}
            className="w-full mt-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Join community
          </button>
          <button className="w-full mt-2 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
