import { useState, useEffect, useCallback } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
}


const useBooks = (options: { limit?: number } = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = options.limit 
        ? `/api/books?limit=${options.limit}`
        : `/api/books`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch books');
      
      const data = await response.json();
      setBooks(data.books || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  },[options.limit]); // Include options.limit as dependency

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]); // Now fetchBooks is stable

  return { 
    books, 
    loading, 
    error, 
    refetch: fetchBooks
  };
};

export default useBooks;