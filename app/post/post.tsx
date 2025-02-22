"use client";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import PostVoteClient from "../components/postClient";
import { error } from "console";

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

const RenderPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetPost = async () => {
    try {
      const response = await fetch("http://localhost:6969/users/all/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get posts");
      }

      const data = await response.json();
      const mappedPosts = data.post.map((post: any) => ({
        id: post.post_id,
        author: post.user_id,
        title: post.title || "Untitled",
        content: post.content || "",
        upvotes: post.upvotes || 0,
        downvotes: post.downvotes || 0,
        room_id: post.room_id || 0,
      }));

      setPosts(mappedPosts);
      setLoading(false);

      console.log("Posts fetched successfully", mappedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPost();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostItem post={post} />
          </Link>
        ))
      )}
    </div>
  );
};

const PostItem = ({ post }: { post: Post }) => {
  const [votesAmt, setVotesAmt] = useState(post.upvotes);

  const trimContent = (content: string, wordLimit: number = 10) => {
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    return plainText.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      <div className="rounded-md bg-white shadow-md mt-14">
        <div className="px-6 py-4 flex justify-between">
          <PostVoteClient
            postId={post.id}
            initialVotesAmt={votesAmt}
            setVotesAmt={setVotesAmt}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
          <div className="w-0 flex-1">
            <div className="max-h-40 mt-1 text-xs text-gray-500">
              <span className="underline text-zinc-900 text-sm font-bold underline-offset-2">
                open/{post.title}
              </span>
              <span className="px-1">•</span>
              <span>Posted by u/{post.author}</span>
            </div>
            <Link href={`/post/${post.id}`}>
              <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                To know more about {post.title}, visit the detailed page
              </h1>
            </Link>
            <div className="relative text-sm max-h-40 w-full overflow-clip">
              <p>{trimContent(post.content)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
          <Link
            href={`/post/${post.id}/comment`}
            className="w-fit flex items-center gap-2 text-blue-500"
          >
            <MessageSquare className="h-4 w-4 " />0 comments
          </Link>
          <Link
            href={`/post/${post.id}`}
            className="w-fit flex items-center gap-2 text-blue-500"
          >
            View full post
          </Link>
        </div>
      </div>
    </>
  );
};

export default RenderPost;
