"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export function SubmitButton({ text }: { text: string }) {
  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    setPending(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPending(false);
  };

  return (
    <Button onClick={handleSubmit} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export function SaveButton() {
  const [pending, setPending] = useState(false);

  const handleSave = async () => {
    setPending(true);
    // Simulate save action
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPending(false);
  };

  return (
    <Button
      onClick={handleSave}
      className="mt-2 w-full"
      disabled={pending}
      size="sm"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          Please wait
        </>
      ) : (
        "Save"
      )}
    </Button>
  );
}

export function UpVote() {
  const [pending, setPending] = useState(false);

  const handleUpVote = async () => {
    setPending(true);
    // Simulate upvote action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPending(false);
  };

  return (
    <Button
      onClick={handleUpVote}
      variant="outline"
      size="sm"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ArrowUp className="h-4 w-4" />
      )}
    </Button>
  );
}

export function DownVote() {
  const [pending, setPending] = useState(false);

  const handleDownVote = async () => {
    setPending(true);
    // Simulate downvote action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPending(false);
  };

  return (
    <Button
      onClick={handleDownVote}
      variant="outline"
      size="sm"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ArrowDown className="h-4 w-4" />
      )}
    </Button>
  );
}

export default function LoadingBtn({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {/* {loading && <Loader2 size={16} className="animate-spin" />} */}
        {loading}
        {children}
      </span>
    </Button>
  );
}
