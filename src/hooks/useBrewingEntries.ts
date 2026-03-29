import { useState, useCallback } from 'react';
import { BrewingEntry } from '../types/brewing';
import { getEntries, saveEntry, updateEntry, deleteEntry, deleteEntries } from '../lib/storage';

export function useBrewingEntries() {
  const [entries, setEntries] = useState<BrewingEntry[]>(() =>
    getEntries().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );

  const refresh = useCallback(() => {
    setEntries(getEntries().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const addEntry = useCallback((entry: BrewingEntry) => {
    saveEntry(entry);
    refresh();
  }, [refresh]);

  const editEntry = useCallback((entry: BrewingEntry) => {
    updateEntry(entry);
    refresh();
  }, [refresh]);

  const removeEntry = useCallback((id: string) => {
    deleteEntry(id);
    refresh();
  }, [refresh]);

  const removeEntries = useCallback((ids: string[]) => {
    deleteEntries(ids);
    refresh();
  }, [refresh]);

  return { entries, addEntry, editEntry, removeEntry, removeEntries };
}
