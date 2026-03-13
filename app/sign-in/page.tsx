"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Client = {
  id: string;
  status: string | null;
};

export default function HomePage() {
  const [totalClients, setTotalClients] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [leads, setLeads] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from("clients")
        .select("id, status");

      if (!error && data) {
        const clients = data as Client[];

        setTotalClients(clients.length);

        setActiveProjects(
          clients.filter((client) => client.status === "Active").length
        );

        setLeads(
          clients.filter((client) => client.status === "Lead").length
        );
      }

      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900">Client Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Manage leads, active clients, and completed projects in one place.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/clients"
            className="inline-block rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
          >
            View Clients
          </Link>

          <Link
            href="/sign-in"
            className="inline-block rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>

        {/* Dashboard Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">Total Clients</h2>
            <p className="mt-2 text-3xl font-bold">
              {loading ? "..." : totalClients}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">Active Projects</h2>
            <p className="mt-2 text-3xl font-bold">
              {loading ? "..." : activeProjects}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">Leads</h2>
            <p className="mt-2 text-3xl font-bold">
              {loading ? "..." : leads}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}