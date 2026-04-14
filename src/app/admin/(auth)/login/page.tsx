"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A1628] px-4">
      <div className="w-full max-w-md">
        {/* Logos */}
        <div className="mb-8 flex items-center justify-center gap-6">
          <Image
            src="/logos/aba-logo.png"
            alt="ABA Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div className="h-12 w-px bg-white/20" />
          <Image
            src="/logos/bml-logo-simple.png"
            alt="BML Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-white/10 bg-[#1a1a1a]/80 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
            <p className="mt-1 text-sm text-white/50">
              42nd ABA General Meeting &amp; Conference
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white/70">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@aba2026.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-md border border-white/15 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C5A55A] focus:outline-none focus:ring-1 focus:ring-[#C5A55A]/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white/70">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-white/15 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C5A55A] focus:outline-none focus:ring-1 focus:ring-[#C5A55A]/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#C5A55A] px-4 py-3 text-sm font-semibold text-[#0A1628] hover:bg-[#D4B86A] disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogIn className="size-4" />
              )}
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/25">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
