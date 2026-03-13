"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignInPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  async function handleSendCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage("Code sent. Check your email.");
    setStep("code");
  }

  async function handleVerifyCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setMessage("");

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/clients");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-md">
        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>

          <p className="mt-2 text-gray-600">
            Enter your email and we’ll send you a one-time code.
          </p>

          {step === "email" ? (
            <form onSubmit={handleSendCode} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              {message && (
                <p className="text-sm text-green-600">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-black px-5 py-3 text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="123456"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              {message && (
                <p className="text-sm text-green-600">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-black px-5 py-3 text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setErrorMessage("");
                  setMessage("");
                }}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-50"
              >
                Use a Different Email
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}