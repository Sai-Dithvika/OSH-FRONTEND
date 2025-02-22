// PostComment.tsx
"use client";

import { FC, useState } from "react";
import { UserAvatar } from "@/components/ui/userAvatar";
import { Button } from "@/components/ui/button";
import CommentVotes from "./commentVotes";
import CreateComment from "./createComment";
import { formatTimeToNow } from "@/lib/utils";

interface PostCommentProps {
  comment: any; // Adjust according to your comment type
  votesAmt: number;
  currentVote?: any; // Adjust according to your vote type
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}) => {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar user={comment.author} className="h-6 w-6" />
        <div className="ml-2 flex flex-col">
          <p className="text-sm font-medium">{comment.author.username}</p>
          <p className="text-xs text-gray-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
          <p className="text-sm text-gray-800">{comment.text}</p>
        </div>
      </div>

      <div className="flex items-center">
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />
        <Button
          onClick={() => setIsReplying(!isReplying)}
          variant="ghost"
          size="xs"
        >
          Reply
        </Button>
      </div>

      {isReplying && <CreateComment postId={postId} replyToId={comment.id} />}
    </div>
  );
};

export default PostComment;
