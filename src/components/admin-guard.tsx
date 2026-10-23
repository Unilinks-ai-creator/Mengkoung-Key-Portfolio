"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { ADMIN_EMAIL, auth } from "@/lib/firebase";

export function AdminGuard({
  children,
}: {
  children: (user: User) => React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const authorized = !!user && user.email === ADMIN_EMAIL;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setSignInError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      setSignInError(
        code === "auth/invalid-credential" || code === "auth/wrong-password"
          ? "Wrong email or password."
          : code === "auth/too-many-requests"
            ? "Too many attempts. Try again in a minute."
            : err instanceof Error
              ? err.message
              : "Sign-in failed.",
      );
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <main className="container-wide py-24">
        <p className="text-muted text-sm">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container-wide py-24 max-w-md">
        <p className="text-[12px] uppercase tracking-[0.22em] text-muted">
          Admin
        </p>
        <h1 className="text-h2 mt-3">Sign in</h1>

        <form onSubmit={handleSignIn} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[13px] uppercase tracking-[0.18em] text-muted">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-[15px] text-fg outline-none focus:border-fg"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] uppercase tracking-[0.18em] text-muted">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-[15px] text-fg outline-none focus:border-fg"
            />
          </label>

          {signInError && (
            <p className="text-[13px] text-red-500">{signInError}</p>
          )}

          <button
            type="submit"
            disabled={signingIn}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-fg px-5 py-3 text-[14px] font-medium text-bg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {signingIn ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="container-wide py-24">
        <h1 className="text-h2">Not authorized</h1>
        <p className="mt-3 text-muted">
          Signed in as <span className="text-fg">{user.email}</span>. This
          account isn&apos;t on the admin whitelist.
        </p>
        <button
          type="button"
          onClick={() => signOut(auth)}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[14px] font-medium text-fg hover:bg-fg hover:text-bg transition-colors"
        >
          Sign out
        </button>
      </main>
    );
  }

  return <>{children(user)}</>;
}
