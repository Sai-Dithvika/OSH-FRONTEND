"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const [selectedOption, setSelectedOption] = useState("User Settings");

  // Sidebar navigation items
  const menuItems = [
    "User Settings",
    "Post Analysis",
    "Profile Settings",
    "Notifications",
    "Security",
    "Billing",
  ];

  return (
    <div className="flex min-h-screen bg-aliceblue ">
      {/* Sidebar */}
      <div className="w-64 p-4  shadow-lg">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => setSelectedOption(item)}
              className={cn(
                "cursor-pointer rounded-md p-2 hover:bg-gray-200",
                selectedOption === item
                  ? "bg-black/10 text-black/75 font-semibold"
                  : ""
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <Card className="max-w-3xl mx-auto p-4">
          <h3 className="text-2xl font-bold mb-6">{selectedOption}</h3>

          {/* Conditionally render content based on the selected option */}
          {selectedOption === "User Settings" && <UserSettingsForm />}
          {selectedOption === "Post Analysis" && (
            <div className="text-center text-gray-600">
              <p>Charts and analysis will be displayed here.</p>
            </div>
          )}
          {selectedOption === "Profile Settings" && (
            <div className="text-center text-gray-600">
              <p>Profile settings form will be added here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// User Settings form component
const UserSettingsForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" placeholder="Enter your username" />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email address" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter a new password"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="Enter your phone number" />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" type="text" placeholder="Enter your address" />
      </div>

      <Button type="submit" className="w-full mt-4">
        Save Changes
      </Button>
    </form>
  );
};
