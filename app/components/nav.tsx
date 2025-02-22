import { useState } from "react";
import { ArrowBigDown, ArrowBigUp, GitCommit, Share } from "lucide-react";

export default function ActionButtons({ initialVotes = 0 }) {
  const [voteCount, setVoteCount] = useState<number>(initialVotes); // Ensure initialVotes is a number
  const [userVote, setUserVote] = useState<null | 1 | -1>(null); // null = no vote, 1 = upvoted, -1 = downvoted

  const handleUpVote = () => {
    if (userVote === 1) return; // prevent double upvote

    setVoteCount(voteCount + (userVote === -1 ? 2 : 1)); // adjust if downvoted previously
    setUserVote(1);
  };

  const handleDownVote = () => {
    if (userVote === -1) return; // prevent double downvote

    setVoteCount(voteCount - (userVote === 1 ? 2 : 1)); // adjust if upvoted previously
    setUserVote(-1);
  };

  return (
    <div className="flex space-x-4 p-4">
      {/* Upvote/Downvote */}
      <div className="flex items-center space-x-1 bg-gray-100 p-2 rounded-full">
        <button onClick={handleUpVote}>
          <ArrowBigUp
            className={`w-5 h-5 ${
              userVote === 1 ? "text-blue-500" : "text-gray-600"
            }`}
          />
        </button>
        <span className="text-sm font-medium">{voteCount}</span>
        <button onClick={handleDownVote}>
          <ArrowBigDown
            className={`w-5 h-5 ${
              userVote === -1 ? "text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Comments */}
      <div className="flex items-center space-x-1 bg-gray-100 p-2 rounded-full">
        <GitCommit className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium">810</span>
      </div>

      {/* Share */}
      <div className="flex items-center space-x-1 bg-gray-100 p-2 rounded-full">
        <Share className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium">Share</span>
      </div>
    </div>
  );
}
