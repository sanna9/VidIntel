"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-2 bg-gray-50 px-4">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to VidIntel</h1>
      {status === "authenticated" && (
        <p className="text-gray-500">Good to see you, {session?.user?.name}</p>
      )}
      {status === "unauthenticated" && (
        <p className="text-gray-500">Sign in above to get started</p>
      )}
    </div>
  );
}