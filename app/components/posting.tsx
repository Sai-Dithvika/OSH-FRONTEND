// components/Post.tsx
"use client";
import { useRef, useState } from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import PostVoteClient from "./postClient";

import { dummyPosts } from "../components/dummy";

const Post = () => {
  return (
    <div>
      {dummyPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

// PostItem component should be client-rendered
interface Post {
  id: string;
  subredditName: string;
  author: string;
  title: string;
  shortDescription: string;
  upvotes: number;
  commentsCount: number;
}

const PostItem = ({ post }: { post: Post }) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [votesAmt, setVotesAmt] = useState(post.upvotes);

  return (
    <div className="rounded-md bg-white shadow mt-14">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={votesAmt}
          setVotesAmt={setVotesAmt}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            <Link
              href={`/r/${post.subredditName}`}
              className="underline text-zinc-900 text-sm underline-offset-2"
            >
              r/{post.subredditName}
            </Link>
            <span className="px-1">•</span>
            <span>Posted by u/{post.author}</span>
          </div>
          <Link href={`/r/${post.subredditName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </Link>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <p>{post.shortDescription}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/r/${post.subredditName}/post/${post.id}/comments`}
          className="w-fit flex items-center gap-2 text-blue-500"
        >
          <MessageSquare className="h-4 w-4" /> {post.commentsCount} comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
