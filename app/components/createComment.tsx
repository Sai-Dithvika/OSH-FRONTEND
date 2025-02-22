"use client";
import React, { FC, useState } from "react";

interface CreateCommentProps {
  onSubmit: (text: string) => void;
}

const CreateComment: FC<CreateCommentProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <div className="w-full">
      <textarea
        className="border rounded-md p-2 w-full"
        rows={2}
        placeholder="What are your thoughts?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={!input.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreateComment;
