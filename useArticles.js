import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook to fetch articles with optional search and category filter.
 * Uses Supabase server-side filtering for efficiency.
 *
 * @param {Object} options
 * @param {string} [options.search] - Search query for title
 * @param {string} [options.category] - Category filter (empty or 'All' = no filter)
 * @param {number} [options.limit] - Max articles to fetch
 * @returns {{ articles, loading, error, refetch }}
 */
export function useArticles({ search = '', category = '', limit } = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      // Server-side search by title
      if (search.trim()) {
        query = query.ilike('title', `%${search.trim()}%`);
      }

      // Server-side category filter
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      // Limit results if specified
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        throw supabaseError;
      }

      setArticles(data || []);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Unable to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [search, category, limit]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: fetchArticles };
}
