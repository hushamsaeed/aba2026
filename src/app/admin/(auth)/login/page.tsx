"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <div className="flex min-h-screen items-center justify-center bg-deep-blue px-4">
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

        <Card className="border-deep-blue-light/30 bg-deep-blue-light/20 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4 text-center">
            <h1 className="font-heading text-xl font-semibold text-white">
              Admin Portal
            </h1>
            <p className="text-sm text-white/60">
              42nd ABA General Meeting &amp; Conference
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md border border-bml-red/30 bg-bml-red/10 px-3 py-2 text-sm text-bml-red-light">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@aba.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-aba-gold focus:ring-aba-gold/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-aba-gold focus:ring-aba-gold/30"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-aba-gold text-white hover:bg-aba-gold-light"
                size="lg"
              >
                {loading ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 size-4" />
                )}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-white/30">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
