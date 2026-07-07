"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <Link href="/" className="text-lg font-bold text-gray-900">
        VidIntel
      </Link>

      <div className="flex items-center gap-4">
        {status === "loading" && (
          <span className="text-sm text-gray-400">Loading...</span>
        )}

        {status === "authenticated" && session.user && (
          <>
            <Link
              href="/upload"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Upload
            </Link>
            <img
              src={session.user.image ?? ""}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full border border-gray-200"
            />
            <span className="text-sm text-gray-700">{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Sign out
            </button>
          </>
        )}

        {status === "unauthenticated" && (
          <button
            onClick={() => signIn("google")}
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}