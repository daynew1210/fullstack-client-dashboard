"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
};

function getStatusClasses(status: string | null) {
  switch (status) {
    case "Lead":
      return "bg-yellow-100 text-yellow-800";
    case "Active":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

export default function ClientDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchClient() {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setClient(data);
      setLoading(false);
    }

    if (id) {
      fetchClient();
    }
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/clients" className="text-sm text-gray-600 hover:text-black">
            ← Back to Clients
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-600">Loading client...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-red-600">{errorMessage}</p>
          </div>
        ) : client ? (
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {client.name}
                </h1>
                <p className="mt-2 text-gray-600">
                  Client profile and project details.
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/clients/${client.id}/edit`}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-gray-900">{client.email || "—"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1 text-gray-900">{client.phone || "—"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p className="mt-1 text-gray-900">{client.company || "—"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <div className="mt-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getStatusClasses(
                      client.status
                    )}`}
                  >
                    {client.status || "—"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p className="mt-2 whitespace-pre-wrap text-gray-900">
                {client.notes || "No notes added yet."}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}