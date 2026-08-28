export default function ErrorState({
  message = 'Something went wrong. Please try again later.',
  onRetry,
}) {
  return (
    <div className="text-center py-16 px-4">
      <svg className="w-16 h-16 mx-auto text-rose/40 mb-5" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>

      <h3 className="text-xl font-serif text-plum-deep mb-2">Something went wrong</h3>
      <p className="text-[15px] opacity-70 mb-6 max-w-md mx-auto">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-plum text-paper rounded font-mono font-semibold text-[13px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-plum/25"
        >
          Try again
        </button>
      )}
    </div>
  );
}
