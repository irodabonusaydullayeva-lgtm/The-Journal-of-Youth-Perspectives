import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ArticleGrid from '../components/ArticleGrid';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { useArticles } from '../hooks/useArticles';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CATEGORIES } from '../utils/constants';

export default function Home() {
  const { articles, loading, error, refetch } = useArticles({ limit: 6 });
  const containerRef = useScrollReveal();

  // Re-run reveal when articles load
  useEffect(() => {
    if (!loading && articles.length > 0) {
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll('.reveal:not(.in)');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, articles]);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <Hero />

      {/* Mission Section */}
      <div className="bg-plum-deep text-paper">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <blockquote className="reveal font-serif italic font-medium text-2xl sm:text-3xl lg:text-4xl leading-snug max-w-[900px]">
            We believe that{' '}
            <span className="text-gold not-italic">young voices</span> carry the
            clarity and courage the world needs. Through research, dialogue, and
            cross-border collaboration, we turn perspectives into{' '}
            <span className="text-gold not-italic">impact</span>.
            <cite className="block mt-6 font-mono not-italic text-[13px] tracking-widest uppercase opacity-70">
              The Journal of Youth Perspectives — Mission
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[640px] mb-12 reveal">
            <div className="eyebrow">Focus Areas</div>
            <h2 className="text-3xl sm:text-4xl mt-3.5">
              Explore our categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20 md:py-24 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[640px] mb-12 reveal">
            <div className="eyebrow">Latest Publications</div>
            <h2 className="text-3xl sm:text-4xl mt-3.5">
              Recent articles
            </h2>
          </div>

          {loading && <LoadingState count={3} />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {!loading && !error && articles.length === 0 && (
            <EmptyState
              title="No articles yet"
              message="Be the first to contribute! Submit an article and share your perspective with the world."
            />
          )}
          {!loading && !error && articles.length > 0 && (
            <div className="reveal">
              <ArticleGrid articles={articles} />
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 text-center reveal">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-plum text-paper rounded font-semibold text-[15px] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-plum/25"
            >
              View All Articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-plum text-paper py-16 md:py-20">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-paper mb-4">
            Have something to say?
          </h2>
          <p className="text-lg opacity-80 max-w-lg mx-auto mb-8">
            We welcome articles from young thinkers across the globe. Share your
            research, opinions, and stories.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-plum-deep rounded font-mono font-semibold text-[15px] tracking-wide no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
          >
            Submit an Article →
          </Link>
        </div>
      </section>
    </div>
  );
}
