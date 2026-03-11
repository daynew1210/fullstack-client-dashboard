export default function NewClientPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Add New Client</h1>

        <p className="mt-2 text-gray-600">
          Create a new client record for your dashboard.
        </p>

        <form className="mt-8 rounded-2xl bg-white p-6 shadow space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="(555) 123-4567"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              placeholder="Smith Services"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black">
              <option>Lead</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              placeholder="Add any notes here..."
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-black px-5 py-3 text-white hover:opacity-90"
          >
            Save Client
          </button>
        </form>
      </div>
    </main>
  );
}
