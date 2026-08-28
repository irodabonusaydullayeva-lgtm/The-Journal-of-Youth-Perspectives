export default function LoadingState({ count = 3, message = 'Loading articles…' }) {
  return (
    <div role="status" aria-label={message}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-line rounded-md overflow-hidden animate-pulse"
          >
            {/* Image skeleton */}
            <div className="h-48 bg-plum/8" />

            {/* Content skeleton */}
            <div className="p-5 md:p-6">
              <div className="h-3 bg-plum/10 rounded w-20 mb-4" />
              <div className="h-5 bg-plum/12 rounded w-4/5 mb-3" />
              <div className="h-3 bg-plum/8 rounded w-full mb-2" />
              <div className="h-3 bg-plum/8 rounded w-3/4 mb-6" />
              <div className="flex justify-between items-center pt-3 border-t border-line">
                <div className="h-3 bg-plum/8 rounded w-28" />
                <div className="h-3 bg-rose/20 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only">{message}</p>
    </div>
  );
}
