export type Session = {
  name: string;
  email: string;
};

type Account = Session & {
  phone: string;
  passwordHash: string;
};

const ACCOUNTS_KEY = "jido-accounts";
const SESSION_KEY = "jido-session";

function readAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(ACCOUNTS_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: Account[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

async function hashPassword(email: string, password: string) {
  const data = new TextEncoder().encode(`${email.toLowerCase()}::${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function findAccount(email: string) {
  const normalized = email.trim().toLowerCase();
  return readAccounts().find((account) => account.email === normalized) ?? null;
}

export async function createAccount(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();
  if (findAccount(email)) return "exists" as const;

  const accounts = readAccounts();
  accounts.push({
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
    passwordHash: await hashPassword(email, input.password),
  });
  writeAccounts(accounts);
  return "created" as const;
}

export async function signIn(email: string, password: string) {
  const account = findAccount(email);
  if (!account) return "missing" as const;
  const passwordHash = await hashPassword(account.email, password);
  if (passwordHash !== account.passwordHash) return "invalid" as const;

  const session: Session = { name: account.name, email: account.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed.email !== "string" || typeof parsed.name !== "string") {
      return null;
    }
    return { name: parsed.name, email: parsed.email };
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function emailAddress(email: string, kind: "no-account" | "reset") {
  const response = await fetch("/api/account-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, kind }),
  });
  const data = (await response.json()) as { sent?: boolean };
  return Boolean(data.sent);
}
