import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook to fetch a single article by ID.
 *
 * @param {string} id - Article UUID
 * @returns {{ article, loading, error }}
 */
export function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('No article ID provided.');
      return;
    }

    let cancelled = false;

    async function fetchArticle() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single();

        if (cancelled) return;

        if (supabaseError) {
          if (supabaseError.code === 'PGRST116') {
            // No rows returned — article not found
            setError('not_found');
          } else {
            throw supabaseError;
          }
        } else {
          setArticle(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error fetching article:', err);
          setError('Unable to load this article. Please try again later.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchArticle();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { article, loading, error };
}
