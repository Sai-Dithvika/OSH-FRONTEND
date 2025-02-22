"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useEffect, FC } from "react";
import axios from "axios";
import { ArrowBigDown, ArrowBigUp, MessageCircle, Send, User } from "lucide-react";

interface ExtendedComment {
  comment_id: number;
  post_id: number;
  user_id: string;
  content: string;
  parent_comment: number | null;
  created_at: string;
  likes: number;
  dislikes: number;
}

const Example: FC<{ postId: string }> = () => {
  const [comments, setComments] = useState<ExtendedComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { data: session } = useSession();
  const params = useParams();
  const post_id = params.id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6969/users/comments/${post_id}`
        );
        const result = response.data.data;
        if (response.data.statusCode === 200 && Array.isArray(result)) {
          setComments(result);
        } else if (result.data.statusCode == 403) {
          setComments([]);
        } else {
          console.error("Unexpected response structure:", result);
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    fetchComments();
  }, [post_id]);

  const createComment = async () => {
    if (newComment.trim() === "") return;

    if (!session?.user?.name) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch("http://localhost:6969/users/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: post_id,
          content: newComment,
          user_id: session.user.name,
          parent_id: null,
          user_email: session?.user?.email
        }),
      });

      if (!response.ok) throw new Error("Failed to create comment");

      const result = await response.json();
      setComments((prevComments) => [...prevComments, result.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Comments ({comments.length})
              </h2>
            </div>
          </div>

          <div className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={session?.user ? "Write a comment..." : "Please sign in to comment"}
                  disabled={!session?.user}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50 placeholder-gray-500 text-gray-900"
                  rows={3}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={createComment}
                    disabled={!session?.user || newComment.trim() === ""}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-b-xl shadow-sm border-x border-b border-gray-200">
          {comments.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No comments yet</p>
              <p className="text-gray-400 text-sm mt-1">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <div key={comment.comment_id} className="p-4 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {comment.user_id.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.user_id}</span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200">
                            <ArrowBigUp className="w-5 h-5 text-gray-500 hover:text-blue-600" />
                          </button>
                          <span className="text-sm font-medium text-gray-700">{comment.likes}</span>
                          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200">
                            <ArrowBigDown className="w-5 h-5 text-gray-500 hover:text-red-600" />
                          </button>
                          <span className="text-sm font-medium text-gray-700">{comment.dislikes}</span>
                        </div>
                        <button className="text-sm text-gray-500 hover:text-gray-700">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Example;