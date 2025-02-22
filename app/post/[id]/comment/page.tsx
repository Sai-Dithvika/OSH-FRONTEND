"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useEffect, FC } from "react";
import axios from "axios";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { toast } from "react-hot-toast";

// Define the expected structure of a comment
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
          toast.error("Inappropriate content detected");
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
          user_email : session?.user?.email
        }),
      });

      if (!response.ok) throw new Error("Failed to create comment");

      const result = await response.json();
      setComments((prevComments) => [...prevComments, result.data]);
      setNewComment(""); // Clear the input field
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <div className="w-full max-w-2xl bg-gray-50 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Comments
        </h2>

        {/* Input to add a new comment */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
          rows={4}
        />
        <button
          onClick={createComment}
          className="w-full py-3 mb-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
        >
          Post Comment
        </button>

        {/* Displaying comments */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map(
              (comment) =>
                comment && (
                  <div
                    key={comment.comment_id}
                    className="bg-white p-5 rounded-xl shadow-md flex space-x-4"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <ArrowBigUp
                        className="text-gray-500 cursor-pointer hover:text-blue-600"
                        size={24}
                      />
                      <span className="text-gray-700 font-medium">
                        {comment.likes}
                      </span>
                      <ArrowBigDown
                        className="text-gray-500 cursor-pointer hover:text-red-600"
                        size={24}
                      />
                      <span className="text-gray-700 font-medium">
                        {comment.dislikes}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700">
                        {comment.user_id}
                        <span className="ml-2 text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </p>
                      <p className="mt-2 text-gray-900">
                        {comment.content || "No content available"}
                      </p>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Example;
