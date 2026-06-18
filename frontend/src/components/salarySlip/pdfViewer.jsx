

export default function PdfViewer({ pdfUrl }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden min-h-[750px] shadow-sm">

      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          title="Salary Slip"
          className="w-full h-[750px]"
        />
      ) : (
        <div className="h-[750px] flex items-center justify-center text-slate-400">
          Salary slip preview will appear here
        </div>
      )}

    </div>
  );
}

