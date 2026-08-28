import { Link } from 'react-router-dom';
import { formatDate, truncateText } from '../utils/constants';
import { useState } from 'react';

/**
 * Fallback placeholder when no image is available or image fails to load.
 */
function ImageFallback({ category }) {
  return (
    <div className="w-full h-full bg-plum-deep/10 flex items-center justify-center">
      <div className="text-center p-4">
        <svg className="w-10 h-10 mx-auto text-plum/30 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
        <span className="font-mono text-[11px] text-plum/40 uppercase tracking-wider">
          {category || 'Article'}
        </span>
      </div>
    </div>
  );
}

export default function ArticleCard({ article }) {
  const [imgError, setImgError] = useState(false);

  const hasImage = article.image_url && !imgError;

  return (
    <article className="bg-white border border-line rounded-md overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-plum/8">
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <img
            src={article.image_url}
            alt={`Cover image for: ${article.title}`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <ImageFallback category={article.category} />
        )}
        {/* Category tag */}
        <span className="absolute top-3 left-3 bg-plum-deep text-paper font-mono text-[11.5px] tracking-wider uppercase px-3 py-1.5 rounded-sm">
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl leading-snug mb-2.5 font-serif">
          {article.title}
        </h3>

        <p className="text-[14.5px] opacity-80 leading-relaxed flex-1 mb-4">
          {truncateText(article.content, 140)}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-line">
          <span className="font-mono text-xs opacity-55">
            {article.author_name} · {formatDate(article.created_at)}
          </span>
          <Link
            to={`/article/${article.id}`}
            className="font-mono text-[13px] font-semibold text-rose no-underline border-b-[1.5px] border-rose pb-0.5 transition-opacity hover:opacity-70"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
