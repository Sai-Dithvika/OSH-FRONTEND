// CommentVotes.tsx
"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

interface CommentVotesProps {
  commentId: string;
  votesAmt: number;
  currentVote?: { type: "UP" | "DOWN" };import { ArrowBigDown, ArrowBigUp } from "lucide-react";

}

const CommentVotes: FC<CommentVotesProps> = ({
  commentId,
  votesAmt,
  currentVote,
}) => {
  const [votes, setVotes] = useState(votesAmt);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: "UP" | "DOWN") => {
      const payload = { voteType: type, commentId };
      await axios.patch("/api/comments/vote", payload);
    },
    onMutate: (type) => {
      if (currentVote?.type === type) {
        setVotes((prev) => prev - (type === "UP" ? 1 : -1));
      } else {
        setVotes((prev) => prev + (type === "UP" ? 1 : -1));
      }
    },
    onError: () => {
      // Handle error
    },
  });

  return (
    <div className="flex gap-2">
      <Button onClick={() => vote("UP")} variant="ghost">
        <ArrowBigUp
          className={currentVote?.type === "UP" ? "text-blue-500" : ""}
        />
      </Button>
      <span>{votes}</span>
      <Button onClick={() => vote("DOWN")} variant="ghost">
        <ArrowBigDown
          className={currentVote?.type === "DOWN" ? "text-red-500" : ""}
        />
      </Button>
    </div>
  );
};

export default CommentVotes;
