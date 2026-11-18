"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emailAddress, signIn } from "@/lib/account";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("ready") === "1") {
      setNotice("Your account is ready. Sign in to continue.");
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const result = await signIn(email, password);

    if (result === "missing") {
      const sent = await emailAddress(email, "no-account");
      setNotice(
        sent
          ? `There is no JIDO account for ${email.trim()}. We sent a message to that address.`
          : `There is no JIDO account for ${email.trim()}. Outgoing mail is not connected, so the message was not delivered.`
      );
      return;
    }

    if (result === "invalid") {
      setNotice("Those details do not match this account.");
      return;
    }

    router.push("/");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#353A3D] px-4 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000')",
        }}
      />
      <div className="absolute inset-0 bg-[#252A2D]/65" />

      <section className="relative z-10 w-full max-w-[430px] rounded-2xl border border-white/15 bg-[#353A3D]/95 px-6 py-8 shadow-2xl sm:px-9 sm:py-9">
        <div className="mb-6 flex justify-center">
          <Link href="/" aria-label="JIDO homepage">
            <img
              src="/images/jido-nav.png"
              alt="JIDO"
              className="h-14 w-auto"
            />
          </Link>
        </div>

        <div className="mb-7 grid grid-cols-2 border-b border-white/15">
          <div className="border-b-2 border-[#A58D70] pb-3 text-center font-medium text-[#FAF9F6]">
            Sign In
          </div>
          <Link
            href="/Auth/register"
            className="pb-3 text-center text-white/55 transition-colors hover:text-[#FAF9F6]"
          >
            Sign Up
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="mb-2 font-serif text-2xl text-[#FAF9F6]">
            Welcome back
          </h1>
          <p className="text-sm text-[#E7E6E2]/65">
            Sign in to your JIDO account.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4"
        >
          <div>
            <label htmlFor="signin-email" className="mb-2 block text-sm text-[#FAF9F6]">
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[#FAF9F6] outline-none transition placeholder:text-white/35 focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="signin-password" className="text-sm text-[#FAF9F6]">
                Password
              </label>
              <Link
                href="/Auth/forgot"
                className="text-xs text-[#D7C4A7] transition hover:text-white"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 pr-16 text-sm text-[#FAF9F6] outline-none transition placeholder:text-white/35 focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#D7C4A7] hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {notice && (
            <p className="text-xs leading-relaxed text-[#D7C4A7]">{notice}</p>
          )}

          <label className="flex cursor-pointer items-center gap-2.5 pt-1 text-xs text-[#E7E6E2]/65">
            <input type="checkbox" className="accent-[#A58D70]" />
            Keep me signed in
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#FAF9F6] py-3.5 text-sm font-semibold text-[#353A3D] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D7C4A7]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#E7E6E2]/65">
          New to JIDO?{" "}
          <Link
            href="/Auth/register"
            className="font-medium text-[#D7C4A7] transition hover:text-white"
          >
            Create an account
          </Link>
        </p>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-white/40 transition hover:text-[#FAF9F6]"
          >
            ← Back to JIDO
          </Link>
        </div>
      </section>
    </main>
  );
}
