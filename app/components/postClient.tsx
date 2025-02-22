"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  setVotesAmt: React.Dispatch<React.SetStateAction<number>>;
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  initialVotesAmt,
  setVotesAmt,
}) => {
  const [currentVote, setCurrentVote] = useState<"UP" | "DOWN" | null>(null);
  const [totalLikes, setTotalLikes] = useState<number>(initialVotesAmt);

  useEffect(() => {
    const fetchTotalLikes = async () => {
      try {
        const response = await fetch(
          `http://localhost:6969/users/totalikes/${postId}`
        );
        if (response.ok) {
          const data = await response.json();
          setTotalLikes(data.totalLikes);
        }
      } catch (error) {
        console.error("Error fetching total likes:", error);
      }
    };
    fetchTotalLikes();
  }, [postId]);

  useEffect(() => {
    const savedVote = localStorage.getItem(`vote_${postId}`);
    if (savedVote === "UP" || savedVote === "DOWN") {
      setCurrentVote(savedVote as "UP" | "DOWN");
      setVotesAmt((prev) => prev + (savedVote === "UP" ? 1 : -1));
    }
  }, [postId, setVotesAmt]);

  const handleVote = async (type: "UP" | "DOWN") => {
    const isUpvote = type === "UP";
    if (currentVote === type) {
      setVotesAmt((prev) => prev - (isUpvote ? 1 : -1));
      setCurrentVote(null);
      localStorage.removeItem(`vote_${postId}`);
      await submitVote(null);
      return;
    }
    setVotesAmt((prev) => prev + (isUpvote ? 1 : -1) * (currentVote ? 2 : 1));
    setCurrentVote(type);
    localStorage.setItem(`vote_${postId}`, type);
    await submitVote(isUpvote);
  };

  const submitVote = async (isUpvote: boolean | null) => {
    try {
      const response = await fetch("http://localhost:6969/users/i-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId, isL: isUpvote }),
      });
      if (!response.ok) throw new Error("Failed to record vote");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        onClick={() => handleVote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={`h-5 w-5 ${
            currentVote === "UP" ? "text-emerald-500" : "text-zinc-700"
          }`}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {totalLikes}
      </p>
      <Button
        onClick={() => handleVote("DOWN")}
        size="sm"
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={`h-5 w-5 ${
            currentVote === "DOWN" ? "text-red-500" : "text-zinc-700"
          }`}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;
