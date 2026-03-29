import { describe, it, expect, beforeEach } from 'vitest';
import { getEntries, saveEntry, updateEntry, deleteEntry, deleteEntries } from '../lib/storage';
import { makeEntry } from '../test/fixtures';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getEntries', () => {
    it('returns an empty array when localStorage is empty', () => {
      expect(getEntries()).toEqual([]);
    });

    it('returns an empty array when localStorage contains invalid JSON', () => {
      localStorage.setItem('coffee-brewing-entries', 'not-json{{{');
      expect(getEntries()).toEqual([]);
    });

    it('returns stored entries', () => {
      const entry = makeEntry();
      localStorage.setItem('coffee-brewing-entries', JSON.stringify([entry]));
      expect(getEntries()).toEqual([entry]);
    });
  });

  describe('saveEntry', () => {
    it('saves an entry', () => {
      const entry = makeEntry();
      saveEntry(entry);
      expect(getEntries()).toEqual([entry]);
    });

    it('appends to existing entries', () => {
      const first = makeEntry({ id: 'a' });
      const second = makeEntry({ id: 'b' });
      saveEntry(first);
      saveEntry(second);
      expect(getEntries()).toHaveLength(2);
    });
  });

  describe('updateEntry', () => {
    it('updates a matching entry', () => {
      const entry = makeEntry();
      saveEntry(entry);
      const updated = { ...entry, coffeeProducer: 'Updated Roaster' };
      updateEntry(updated);
      expect(getEntries()[0].coffeeProducer).toBe('Updated Roaster');
    });

    it('does nothing when id does not exist', () => {
      const entry = makeEntry({ id: 'existing' });
      saveEntry(entry);
      const ghost = makeEntry({ id: 'ghost', coffeeProducer: 'Ghost' });
      updateEntry(ghost);
      expect(getEntries()).toHaveLength(1);
      expect(getEntries()[0].id).toBe('existing');
    });
  });

  describe('deleteEntry', () => {
    it('removes the entry with the given id', () => {
      const entry = makeEntry();
      saveEntry(entry);
      deleteEntry(entry.id);
      expect(getEntries()).toEqual([]);
    });

    it('leaves other entries intact', () => {
      const a = makeEntry({ id: 'a' });
      const b = makeEntry({ id: 'b' });
      saveEntry(a);
      saveEntry(b);
      deleteEntry('a');
      expect(getEntries()).toHaveLength(1);
      expect(getEntries()[0].id).toBe('b');
    });

    it('does nothing when id does not exist', () => {
      const entry = makeEntry();
      saveEntry(entry);
      deleteEntry('nonexistent');
      expect(getEntries()).toHaveLength(1);
    });
  });

  describe('deleteEntries', () => {
    it('removes multiple entries by id', () => {
      const a = makeEntry({ id: 'a' });
      const b = makeEntry({ id: 'b' });
      const c = makeEntry({ id: 'c' });
      saveEntry(a);
      saveEntry(b);
      saveEntry(c);
      deleteEntries(['a', 'c']);
      expect(getEntries()).toHaveLength(1);
      expect(getEntries()[0].id).toBe('b');
    });

    it('removes all entries when all ids are given', () => {
      const a = makeEntry({ id: 'a' });
      const b = makeEntry({ id: 'b' });
      saveEntry(a);
      saveEntry(b);
      deleteEntries(['a', 'b']);
      expect(getEntries()).toEqual([]);
    });

    it('ignores ids that do not exist', () => {
      const a = makeEntry({ id: 'a' });
      saveEntry(a);
      deleteEntries(['nonexistent']);
      expect(getEntries()).toHaveLength(1);
    });

    it('does nothing with an empty ids array', () => {
      const a = makeEntry({ id: 'a' });
      saveEntry(a);
      deleteEntries([]);
      expect(getEntries()).toHaveLength(1);
    });
  });
});
