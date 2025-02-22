import React from "react";

export default function CommunityCard(): JSX.Element {
  return (
    <div className="w-[100%] p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        About r/react
      </h2>
      <div className="text-sm text-gray-500">
        <div className="flex justify-between">
          <span>Created</span>
          <span>June 11, 2023</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Members</span>
          <span>2</span>
        </div>
      </div>
      <button className="w-full mt-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700">
        Leave community
      </button>
      <button className="w-full mt-2 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
        Create Post
      </button>
    </div>
  );
}
