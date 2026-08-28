export default function EmptyState({
  title = 'No articles found',
  message = 'No articles match your current criteria.',
  onReset,
}) {
  return (
    <div className="text-center py-16 px-4">
      <svg className="w-16 h-16 mx-auto text-plum/25 mb-5" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>

      <h3 className="text-xl font-serif text-plum-deep mb-2">{title}</h3>
      <p className="text-[15px] opacity-70 mb-6 max-w-md mx-auto">{message}</p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[13px] font-semibold text-rose border-b-[1.5px] border-rose pb-0.5 cursor-pointer bg-transparent transition-opacity hover:opacity-70"
        >
          Reset filters →
        </button>
      )}
    </div>
  );
}
