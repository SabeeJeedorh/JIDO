
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createAccount } from "@/lib/account";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notice, setNotice] = useState("");

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("password_confirmation") ?? "");

    if (password !== confirmation) {
      setNotice("The passwords do not match.");
      return;
    }

    const result = await createAccount({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      password,
    });

    if (result === "exists") {
      setNotice("An account already uses this email. Sign in instead.");
      return;
    }

    router.push("/Auth/login?ready=1");
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-[#353A3D]">

      {/* Architectural background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#252A2D]/65" />

      {/* Auth Card */}
      <section className="relative z-10 w-full max-w-[430px] rounded-2xl border border-white/15 bg-[#353A3D]/95 px-6 py-8 shadow-2xl sm:px-9 sm:py-9">

        {/* JIDO Logo */}
        <div className="mb-6 flex justify-center">
          <Link href="/" aria-label="JIDO homepage">
            <img
              src="/images/jido-nav.png"
              alt="JIDO"
              className="h-14 w-auto"
            />
          </Link>
        </div>

        {/* Authentication Tabs */}
        <div className="grid grid-cols-2 border-b border-white/15 mb-7">

          <Link
            href="/Auth/login"
            className="text-center pb-3 text-white/55 hover:text-[#FAF9F6] transition-colors"
          >
            Sign In
          </Link>

          <div className="text-center pb-3 border-b-2 border-[#A58D70] text-[#FAF9F6] font-medium">
            Sign Up
          </div>

        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl text-[#FAF9F6] mb-2">
            Create an account
          </h1>

          <p className="text-sm text-[#E7E6E2]/65">
            Find your place. Build your future.
          </p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={register}
          className="space-y-4"
        >

          {/* Full Name */}
          <div>
            <label className="block text-sm text-[#FAF9F6] mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[#FAF9F6] placeholder:text-white/35 outline-none transition focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-[#FAF9F6] mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[#FAF9F6] placeholder:text-white/35 outline-none transition focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-[#FAF9F6] mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="+234 800 000 0000"
              autoComplete="tel"
              required
              className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-[#FAF9F6] placeholder:text-white/35 outline-none transition focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-[#FAF9F6] mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 pr-16 text-sm text-[#FAF9F6] placeholder:text-white/35 outline-none transition focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#D7C4A7] hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-[#FAF9F6] mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 pr-16 text-sm text-[#FAF9F6] placeholder:text-white/35 outline-none transition focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#D7C4A7] hover:text-white"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[#E7E6E2]/65 cursor-pointer pt-1">
            <input
              type="checkbox"
              required
              className="mt-0.5 accent-[#A58D70]"
            />

            <span>
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-[#D7C4A7] underline underline-offset-2"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#D7C4A7] underline underline-offset-2"
              >
                Privacy Policy
              </Link>.
            </span>
          </label>

          {notice && (
            <p className="text-xs leading-relaxed text-[#D7C4A7]">{notice}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#FAF9F6] py-3.5 text-sm font-semibold text-[#353A3D] transition-all duration-300 hover:bg-[#D7C4A7] hover:-translate-y-0.5"
          >
            Create Account
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-xs text-white/45">
            or continue with
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        {/* Social Registration */}
        <div className="space-y-3">

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/15 py-3 text-sm text-[#FAF9F6] transition hover:bg-white/10"
          >
            <span className="font-bold text-base">G</span>
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/15 py-3 text-sm text-[#FAF9F6] transition hover:bg-white/10"
          >
            <span className="text-lg">●</span>
            Continue with Apple
          </button>

        </div>

        {/* Sign In */}
        <p className="mt-7 text-center text-sm text-[#E7E6E2]/65">
          Already have an account?{" "}
          <Link
            href="/Auth/login"
            className="font-medium text-[#D7C4A7] hover:text-white transition"
          >
            Sign in
          </Link>
        </p>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-[#FAF9F6] transition"
          >
            ← Back to JIDO
          </Link>
        </div>

      </section>
    </main>
  );
}
