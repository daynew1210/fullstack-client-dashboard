import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Client = {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  status: string | null;
};

export default async function ClientsPage() {
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name, email, company, status")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="mt-1 text-gray-600">
              View and manage your client list.
            </p>
          </div>

          <Link
            href="/clients/new"
            className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
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
              </tr>
            </thead>

            <tbody>
              {error ? (
                <tr>
                  <td className="px-6 py-4 text-red-600" colSpan={4}>
                    Failed to load clients.
                  </td>
                </tr>
              ) : clients && clients.length > 0 ? (
                clients.map((client: Client) => (
                  <tr key={client.id} className="border-b last:border-b-0">
                    <td className="px-6 py-4 text-gray-900">{client.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {client.email || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {client.company || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">
                        {client.status || "—"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-gray-600" colSpan={4}>
                    No clients yet. Add your first client.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}