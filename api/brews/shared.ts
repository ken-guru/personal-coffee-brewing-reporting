import { list } from '@vercel/blob';
import type { IncomingMessage, ServerResponse } from 'http';

type VReq = IncomingMessage & { body?: unknown; query?: Record<string, string | string[]> };
type VRes = ServerResponse & {
  status: (code: number) => VRes;
  json: (data: unknown) => void;
};

export default async function handler(_req: VReq, res: VRes) {
  // When Vercel Blob is not configured (e.g. local dev), return an empty list
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(200).json({ brews: [] });
    return;
  }

  try {
    const { blobs } = await list({ prefix: 'brew-', limit: 50 });

    // Fetch the content of each blob in parallel to get brew summaries
    const results = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const fetchRes = await fetch(blob.url);
          if (!fetchRes.ok) return null;
          const data = await fetchRes.json() as unknown;
          return data;
        } catch {
          return null;
        }
      }),
    );

    const brews = results.filter(Boolean);

    res.status(200).json({ brews });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error listing shared brews:', message);
    res.status(500).json({ error: 'Failed to list shared brews' });
  }
}
