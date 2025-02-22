"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/docs"); // Navigates to the /docs folder
  }, [router]);

  return null; // No UI is needed since it's just redirecting
}
