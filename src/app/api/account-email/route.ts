import { NextResponse } from "next/server";

function messageFor(kind: string, email: string, origin: string) {
  if (kind === "reset") {
    return {
      subject: "Reset your JIDO password",
      text: `A password reset was requested for ${email}. Return to JIDO and sign in at ${origin}/Auth/login.`,
    };
  }

  return {
    subject: "Create your JIDO account",
    text: `There is no JIDO account for ${email}. Create one to explore properties and save favourites: ${origin}/Auth/register`,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const kind = body?.kind === "reset" ? "reset" : "no-account";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ sent: false }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) {
    return NextResponse.json({ sent: false, reason: "unconfigured" });
  }

  const origin = new URL(request.url).origin;
  const message = messageFor(kind, email, origin);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: message.subject,
      text: message.text,
    }),
  });

  return NextResponse.json({ sent: response.ok });
}
