import { useState, useEffect, useCallback } from 'react';
import type { SharedBrew } from '../types/sharedBrew';

interface UseSharedBrewsResult {
  brews: SharedBrew[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSharedBrews(): UseSharedBrewsResult {
  const [brews, setBrews] = useState<SharedBrew[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => {
    setFetchKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchBrews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/brews/shared');
        if (!res.ok) {
          throw new Error('Failed to fetch shared brews');
        }
        const data = await res.json() as { brews: SharedBrew[] };
        if (!cancelled) {
          setBrews(data.brews ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load shared brews');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchBrews();
    return () => {
      cancelled = true;
    };
  }, [fetchKey]);

  return { brews, loading, error, refetch };
}
