"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

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

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchClients() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setClients(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this client?");
    if (!confirmed) return;

    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setClients((prev) => prev.filter((client) => client.id !== id));
  }

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2">
              <Link href="/" className="text-sm text-gray-600 hover:text-black">
                ← Back to Dashboard
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="mt-1 text-gray-600">
              View, edit, and manage your client list.
            </p>
          </div>

          <Link
            href="/clients/new"
            className="rounded-xl bg-black px-4 py-2 text-center text-white hover:opacity-90"
          >
            Add Client
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <table className="min-w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="px-6 py-4 text-gray-600" colSpan={5}>
                    Loading clients...
                  </td>
                </tr>
              ) : errorMessage ? (
                <tr>
                  <td className="px-6 py-4 text-red-600" colSpan={5}>
                    {errorMessage}
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-gray-600" colSpan={5}>
                    No clients yet. Add your first client.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="border-b last:border-b-0">
                    <td className="px-6 py-4 text-gray-900">{client.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {client.email || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {client.company || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${getStatusClasses(
                          client.status
                        )}`}
                      >
                        {client.status || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/clients/${client.id}/edit`}
                          className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(client.id)}
                          className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:opacity-90"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}