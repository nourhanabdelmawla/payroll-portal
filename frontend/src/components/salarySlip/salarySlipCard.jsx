export default function SalarySlipCard({
  slip,
  onView,
  onDownload,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
          Employee Portal
        </h2>

        <p className="text-slate-600 text-sm mt-1">
          Helwan Factory for Developed Industries
        </p>

      </div>

      {/* INFO BOX */}
      <div className="bg-slate-100 rounded-xl p-4 space-y-3 border border-slate-200">

        <div className="flex justify-between">
          <span className="text-slate-600 text-sm">
            Month
          </span>

          <span className="font-medium text-slate-900 text-sm">
            {slip?.month}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600 text-sm">
            Release Date
          </span>

          <span className="font-medium text-slate-900 text-sm">
            {new Date(slip?.uploadedAt)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")}
          </span>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={onView}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition"
        >
          View
        </button>

        <button
          onClick={onDownload}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium transition"
        >
          Download
        </button>

      </div>

    </div>
  );
}