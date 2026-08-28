import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticle } from '../hooks/useArticle';
import { formatDate } from '../utils/constants';

function ArticleNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <svg className="w-16 h-16 mx-auto text-plum/20 mb-5" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <h1 className="text-2xl font-serif text-plum-deep mb-3">Article Not Found</h1>
        <p className="text-[15px] opacity-70 mb-6">
          The article you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-plum text-paper rounded font-mono font-semibold text-[13px] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-plum/25"
        >
          ← Back to Articles
        </Link>
      </div>
    </div>
  );
}

function ArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 animate-pulse" role="status" aria-label="Loading article">
      <div className="h-4 bg-plum/10 rounded w-24 mb-6" />
      <div className="h-8 bg-plum/12 rounded w-3/4 mb-4" />
      <div className="h-4 bg-plum/8 rounded w-48 mb-10" />
      <div className="h-64 bg-plum/8 rounded-md mb-10" />
      <div className="space-y-3">
        <div className="h-4 bg-plum/8 rounded w-full" />
        <div className="h-4 bg-plum/8 rounded w-5/6" />
        <div className="h-4 bg-plum/8 rounded w-full" />
        <div className="h-4 bg-plum/8 rounded w-4/6" />
      </div>
      <p className="sr-only">Loading article…</p>
    </div>
  );
}

export default function ArticleDetail() {
  const { id } = useParams();
  const { article, loading, error } = useArticle(id);
  const [imgError, setImgError] = useState(false);

  if (loading) return <ArticleLoading />;

  if (error === 'not_found') return <ArticleNotFound />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-serif text-plum-deep mb-3">Something went wrong</h1>
          <p className="text-[15px] opacity-70 mb-6">{error}</p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-plum text-paper rounded font-mono font-semibold text-[13px] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-plum/25"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  if (!article) return <ArticleNotFound />;

  const hasImage = article.image_url && !imgError;

  return (
    <article className="pb-20">
      {/* Back navigation */}
      <div className="border-b border-line">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-4">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-plum no-underline opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Article header */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-10 md:pt-14">
        <span className="inline-block bg-plum-deep text-paper font-mono text-[11.5px] tracking-wider uppercase px-3 py-1.5 rounded-sm mb-5">
          {article.category}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-tight mb-5">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 font-mono text-[13px] opacity-60 mb-10">
          <span>{article.author_name}</span>
          <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
        </div>
      </div>

      {/* Cover image */}
      {hasImage && (
        <div className="max-w-4xl mx-auto px-6 md:px-8 mb-10 md:mb-14">
          <div className="rounded-md overflow-hidden border border-line">
            <img
              src={article.image_url}
              alt={`Cover image for: ${article.title}`}
              className="w-full h-auto max-h-[500px] object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      )}

      {/* Article content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="article-prose max-w-[65ch]">
          {article.content.split('\n').map((paragraph, i) =>
            paragraph.trim() ? <p key={i}>{paragraph}</p> : null
          )}
        </div>

        {/* Footer divider */}
        <div className="mt-14 pt-8 border-t border-line">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-mono text-[12px] tracking-wider uppercase opacity-50 mb-1">Author</p>
              <p className="font-serif text-lg">{article.author_name}</p>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-[1.5px] border-ink text-ink rounded font-semibold text-[14px] no-underline transition-all duration-200 hover:-translate-y-0.5"
            >
              ← More Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
