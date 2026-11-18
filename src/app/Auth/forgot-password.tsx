"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { emailAddress, findAccount } from "@/lib/account";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [notice, setNotice] = useState("");

  const sendReset = async (event: FormEvent) => {
    event.preventDefault();
    const account = findAccount(email);

    if (account) {
      setNotice("This email already has a JIDO account. Sign in with your password.");
      setSent(false);
      return;
    }

    const delivered = await emailAddress(email, "no-account");
    setNotice(
      delivered
        ? `There is no JIDO account for ${email.trim()}. We sent a message to that address.`
        : `There is no JIDO account for ${email.trim()}. Outgoing mail is not connected, so the message was not delivered.`
    );
    setSent(delivered);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#353A3D] px-4 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000')",
        }}
      />
      <div className="absolute inset-0 bg-[#252A2D]/70" />

      <section className="relative z-10 w-full max-w-[430px] rounded-2xl border border-white/15 bg-[#353A3D]/95 px-6 py-9 shadow-2xl sm:px-10">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="JIDO homepage">
            <img src="/images/jido-nav.png" alt="JIDO" className="h-14 w-auto" />
          </Link>
        </div>

        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A58D70]">
          Account
        </p>
        <h1 className="mb-2 font-serif text-3xl text-[#FAF9F6]">
          Forgot password
        </h1>
        <p className="mb-7 text-sm leading-6 text-[#E7E6E2]/65">
          Enter the email on your JIDO account. We will send instructions to choose a new password.
        </p>

        {sent ? (
          <div className="rounded-xl border border-[#A58D70]/40 bg-white/[0.04] px-5 py-6">
            <p className="font-serif text-xl text-[#FAF9F6]">Check your inbox.</p>
            <p className="mt-3 text-sm leading-6 text-[#E7E6E2]/70">
              {notice}
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-5 text-xs text-[#D7C4A7] transition hover:text-white"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={sendReset} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className="mb-2 block text-sm text-[#FAF9F6]">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#A58D70] focus:ring-1 focus:ring-[#A58D70]"
              />
            </div>

            {notice && (
              <p className="text-xs leading-relaxed text-[#D7C4A7]">{notice}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#FAF9F6] py-3.5 text-sm font-semibold text-[#353A3D] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D7C4A7]"
            >
              Send reset link
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-[#E7E6E2]/65">
          Remembered it?{" "}
          <Link
            href="/Auth/login"
            className="font-semibold text-[#D7C4A7] transition hover:text-white"
          >
            Sign in
          </Link>
        </p>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-white/40 transition hover:text-white"
          >
            ← Back to JIDO
          </Link>
        </div>
      </section>
    </main>
  );
}
