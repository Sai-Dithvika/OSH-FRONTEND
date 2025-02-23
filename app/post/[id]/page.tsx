"use client";

import { MessageSquare, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import PostVoteClient from "@/app/components/postClient";

interface PostData {
  title: string;
  content: string;
  created_at: string;
  post_id: number;
  tags: string[];
  total_comments: number;
  user_id: string;
  imageurl: string;
  room_id: string;
  upvotes: number;
}

interface PostPageProps {
  params: { id: string };
}

const PostPage = ({ params }: PostPageProps) => {
  const handleRoomClick = () => {
    console.log("Room clicked");
    redirect("/chat");
  };
  
  const { id } = params;
  const [post, setPost] = useState<PostData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [votesAmt, setVotesAmt] = useState<number>(0);
  // const router = useRouter();

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
        setVotesAmt(result.data[0].upvotes || 0);
        localStorage.setItem("room_id", result.data[0].room_id);
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
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            <p className="font-medium text-center">{error}</p>
          </div>
        ) : post ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Header with title and join button */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">
                  {post.title}
                </h1>
                <button
                  onClick={handleRoomClick}
                  className="px-4 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700"
                >
                  Join community
                </button>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{post.user_id}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Post content */}
              {post.imageurl && (
                <div className="mb-6">
                  <Image
                    src={post.imageurl}
                    alt="Post image"
                    width={800}
                    height={450}
                    className="rounded-lg w-full"
                  />
                </div>
              )}
              
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Bottom actions */}
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <PostVoteClient
                  postId={post.post_id.toString()}
                  initialVotesAmt={votesAmt}
                  setVotesAmt={setVotesAmt}
                />
                <Link
                  href={`/post/${post.post_id}/comment`}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.total_comments || 0} comments</span>
                </Link>
              </div>
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                <PlusCircle className="w-4 h-4" />
                <Link href ='/post/create' className="hover:underline">Create Your post</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;