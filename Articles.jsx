import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ArticleGrid from '../components/ArticleGrid';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { useArticles } from '../hooks/useArticles';

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || '';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { articles, loading, error, refetch } = useArticles({
    search: debouncedSearch,
    category,
  });

  // Update URL params when category changes
  useEffect(() => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  }, [category, setSearchParams]);

  function handleReset() {
    setSearch('');
    setCategory('');
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-line bg-plum-deep text-paper">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-20">
          <div className="eyebrow !text-gold">
            <span className="before:bg-gold">Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl mt-4 text-paper">Articles</h1>
          <p className="mt-4 text-lg opacity-75 max-w-lg">
            Explore perspectives from young thinkers around the world on human
            rights, ecology, gender equality, and more.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-line bg-paper">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter selected={category} onChange={setCategory} />
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-12 md:py-16">
        {loading && <LoadingState count={6} />}
        {error && <ErrorState message={error} onRetry={refetch} />}
        {!loading && !error && articles.length === 0 && (
          <EmptyState
            title="No articles found"
            message={
              search || category
                ? 'No articles match your current search and filter criteria.'
                : 'No articles have been published yet. Be the first to contribute!'
            }
            onReset={search || category ? handleReset : undefined}
          />
        )}
        {!loading && !error && articles.length > 0 && (
          <ArticleGrid articles={articles} />
        )}
      </div>
    </div>
  );
}
