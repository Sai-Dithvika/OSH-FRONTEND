"use client";
import React, { FC, useState, useRef } from "react";
import { MessageSquare, ArrowBigUp, ArrowBigDown } from "lucide-react";
// import UserAvatar from '../assest/image'
import Image from "next/image";
// Define the comment type
type ExtendedComment = {
  id: string;
  text: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    name: string;
    image: string | null;
    email: string;
  };
  votes: { userId: string; voteType: "up" | "down" }[];
};

const mockComments: ExtendedComment[] = [
  {
    id: "1",
    text: "This is the first comment.",
    createdAt: new Date().toISOString(),
    author: {
      id: "user1",
      username: "user1",
      name: "User One",
      image: null,
      email: "user1@example.com",
    },
    votes: [{ userId: "user1", voteType: "up" }],
  },
  {
    id: "2",
    text: "This is another comment.",
    createdAt: new Date().toISOString(),
    author: {
      id: "user2",
      username: "user2",
      name: "User Two",
      image: null,
      email: "user2@example.com",
    },
    votes: [{ userId: "user2", voteType: "down" }],
  },
];

// CommentVotes component with up/down vote tracking
const CommentVotes: FC<{
  commentId: string;
  initialVotes: number;
  votes: { userId: string; voteType: "up" | "down" }[];
}> = ({ commentId, initialVotes, votes }) => {
  const [currentVote, setCurrentVote] = useState<"up" | "down" | null>(null);
  const [voteCount, setVoteCount] = useState<number>(initialVotes);

  const handleVote = (voteType: "up" | "down") => {
    if (currentVote === voteType) {
      // Undo the vote if the same button is clicked twice
      setVoteCount((prev) => (voteType === "up" ? prev - 1 : prev + 1));
      setCurrentVote(null);
    } else {
      // Adjust the vote count by +1 or -1 based on the vote type and previous vote state
      setVoteCount(
        (prev) => prev + (voteType === "up" ? 1 : -1) * (currentVote ? 2 : 1)
      );
      setCurrentVote(voteType);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote("up")}
        className={`text-xs ${
          currentVote === "up" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <ArrowBigUp className="h-4 w-4" />
      </button>
      <span className="text-sm">{voteCount}</span>
      <button
        onClick={() => handleVote("down")}
        className={`text-xs ${
          currentVote === "down" ? "text-red-500" : "text-gray-500"
        }`}
      >
        <ArrowBigDown className="h-4 w-4" />
      </button>
    </div>
  );
};

interface PostCommentProps {
  comment: ExtendedComment;
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({ comment, postId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [input, setInput] = useState(`@${comment.author.username} `);
  const commentRef = useRef<HTMLDivElement>(null);
  const [replies, setReplies] = useState<ExtendedComment[]>([]);

  const handleReply = () => {
    if (!input) return;

    const newReply: ExtendedComment = {
      id: `${Date.now()}`,
      text: input,
      createdAt: new Date().toISOString(),
      author: {
        id: "replyUser",
        username: "replyUser",
        name: "Reply User",
        image: null,
        email: "replyUser@example.com",
      },
      votes: [],
    };

    setReplies((prev) => [...prev, newReply]);
    setIsReplying(false);
    setInput(`@${comment.author.username} `);
  };

  // Calculate initial votes from the votes array
  const initialVotes = comment.votes.reduce(
    (total, vote) => total + (vote.voteType === "up" ? 1 : -1),
    0
  );

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <Image
          src="/pfp.png"
          alt="User Avatar"
          className="h-6 w-6 rounded-full"
          width={24}
          height={24}
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.username}
          </p>
          <p className="text-xs text-zinc-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>

      <div className="flex gap-2 items-center">
        <CommentVotes
          commentId={comment.id}
          initialVotes={initialVotes}
          votes={comment.votes}
        />
        <button
          onClick={() => setIsReplying(true)}
          className="text-xs text-blue-500 flex items-center"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Reply
        </button>
      </div>

      {isReplying && (
        <div className="grid w-full gap-1.5 mt-2">
          <label
            htmlFor="comment"
            className="text-sm font-medium text-gray-700"
          >
            Your comment
          </label>
          <textarea
            id="comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            placeholder="What are your thoughts?"
            className="border p-2 rounded-md"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsReplying(false)}
              className="text-gray-600"
            >
              Cancel
            </button>
            <button onClick={handleReply} className="text-blue-500">
              Post
            </button>
          </div>
        </div>
      )}

      <div className="ml-4 mt-4">
        {replies.map((reply) => (
          <div key={reply.id} className="border-l-2 border-black pl-4">
            <PostComment comment={reply} postId={postId} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentsSection: FC = () => {
  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-xl font-semibold">Comments</h2>
      {mockComments.map((comment) => (
        <PostComment key={comment.id} comment={comment} postId="dummyPostId" />
      ))}
    </div>
  );
};

export default CommentsSection;
