"use client";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import PostVoteClient from "../components/postClient";

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

const RenderPost = () => {
  const [posts, setPosts] = useState([]);
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
    <div className="flex flex-col gap-4">
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        posts.map((post) => (
          <PostItem key={post.id} post={post} />
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
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="px-6 py-4">
        <div className="mb-2">
          <Link href={`/open/${post.title}`} className="text-lg font-semibold hover:underline">
            {post.title}
          </Link>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-sm text-gray-500">Posted by u/{post.author}</span>
        </div>
        
        <p className="text-sm text-gray-600">
          To know more about {post.title}, visit the detailed page
        </p>
        
        <p className="mt-2 text-gray-800">
          {trimContent(post.content)}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-2">
        <div className="flex items-center space-x-4">
          <PostVoteClient
            postId={post.id}
            initialVotesAmt={votesAmt}
            initialVote={0}
          />
          
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm text-gray-500">0 comments</span>
          </div>
        </div>
        
        <Link 
          href={`/post/${post.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View full post
        </Link>
      </div>
    </div>
  );
};

export default RenderPost;