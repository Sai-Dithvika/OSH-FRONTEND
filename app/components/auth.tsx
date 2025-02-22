"use client";

import * as React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

// Updated list of Open Source Hub features
const features: { title: string; href: string; description: string }[] = [
  {
    title: "Project Showcase",
    href: "/docs/features/project-showcase",
    description:
      "Display and promote open-source projects to a community of contributors.",
  },
  {
    title: "Issue Management",
    href: "/docs/features/issue-management",
    description:
      "Efficiently track, assign, and resolve issues with collaboration tools.",
  },
  {
    title: "Real-time Chat",
    href: "/docs/features/chat",
    description:
      "Engage in real-time conversations with project contributors and users.",
  },
  {
    title: "Donation Support",
    href: "/docs/features/donations",
    description:
      "Enable supporters to contribute to projects financially through donations.",
  },
  {
    title: "Personalized Recommendations",
    href: "/docs/features/recommendations",
    description:
      "Get tailored project and contributor recommendations based on your interests.",
  },
  {
    title: "Community Metrics",
    href: "/docs/features/community-metrics",
    description:
      "Track engagement metrics to measure project impact and community growth.",
  },
];

export function NavigationMenuDemo() {
  const { data: session } = useSession();

  return (
    <div className="fixed h-16 top-0 left-0 w-full bg-gradient-to-b from-muted to-muted shadow-md">

    <div className="flex items-center justify-between w-full px-4 py-2">
      
    <Image
        src="/team.png"
        width={170}
        height={170}
        alt="pfp"
        className="object-cover p-2"
      />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Image
                        src="/team.png"
                        className="h-8 w-8"
                        width={50}
                        height={50}
                        alt="Open Source Hub logo"
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Open Source Hub
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        A community-driven platform connecting open-source
                        enthusiasts with tools for collaboration, project
                        management, and contribution tracking.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Discover what Open Source Hub offers and how it can enhance
                  open-source collaboration.
                </ListItem>
                <ListItem href="/docs/installation" title="Getting Set Up">
                  Learn how to set up your environment and start contributing.
                </ListItem>
                <ListItem href="/docs/features" title="Key Features">
                  Explore the main features of the Open Source Hub platform.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* "Features" section with updated content */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {features.map((feature) => (
                  <ListItem
                    key={feature.title}
                    title={feature.title}
                    href={feature.href}
                  >
                    {feature.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Additional Links */}
          <NavigationMenuItem>
            <Link href="/tutorial" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Conditional Avatar/User Menu */}
      {session?.user?.email ? (
        <UserMenu />
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}

    </div>
 </div> 
  );
}

// User Menu Component
const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src="/github-mark.png"
            alt="User Avatar"
            className="absolute rounded-full object-cover w-10 h-10"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 mt-2 p-2 bg-white rounded-md shadow-lg"
      >
        <DropdownMenuItem>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/feedback">Feedback</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

