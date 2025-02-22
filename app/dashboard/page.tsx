"use client";

import React, { useState } from "react";
import { Dashboard } from "./dash";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar"; // Import avatar component if using a UI library
// import { cn } from "@/lib/utils";
const Page = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      {session?.user ? (
        <div className="min-h-screen bg-gray-100">
          {/* Header with welcome message and avatar */}
          <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <h1 className="text-3xl font-bold text-center flex-1">
              Welcome, {session.user.name || "User"}!
            </h1>
            <div className="relative">
              {/* Avatar Image */}
              <Avatar
                src={session.user.image || "/placeholder-avatar.png"}
                alt="User Avatar"
                className="cursor-pointer w-10 h-10 rounded-full"
                onClick={toggleDropdown}
              />
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Feedback
                    </li>
                    <hr className="my-2" />
                    <li
                      className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Dashboard component */}
          <Dashboard />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen gap-4">
          <h1 className="text-xl">YOU MUST BE LOGGED IN TO ACCESS THIS PAGE</h1>
          <Button
            className="bg-red-600 hover:bg-red-400"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
};

export default Page;
