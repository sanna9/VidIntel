"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 shadow-md">
          <img
            src={session.user?.image ?? ""}
            alt="profile"
            width={64}
            height={64}
            className="rounded-full border border-gray-200"
          />
          <p className="text-lg font-medium text-gray-800">
            Signed in as {session.user?.email}
          </p>
          <button
            onClick={() => signOut()}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-10 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">VidIntel</h1>
        <p className="text-gray-500 cursor-pointer">Not signed in</p>
        <button
          onClick={() => signIn("google")}
          className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}