import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy } from 'lucide-react';
import type { SharedBrew } from '../types/sharedBrew';
import type { BrewingEntry } from '../types/brewing';
import { BrewingDetail } from '../components/brewing/BrewingDetail';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/Dialog';

export function SharedBrewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sharedBrew, setSharedBrew] = useState<SharedBrew | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [duplicateOpen, setDuplicateOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function fetchBrew() {
      try {
        const res = await fetch(`/api/brews/${id}`);

        // Detect non-JSON responses (e.g. HTML from deployment protection or
        // a cross-origin auth redirect that fetch followed automatically).
        const contentType = res.headers.get('content-type') ?? '';
        if (!contentType.includes('application/json')) {
          if (!cancelled) {
            setError(
              res.status === 401 || res.redirected
                ? 'Authentication required. Please reload the page or open the link in a regular browser window.'
                : 'Unexpected response from server. The API may be unavailable.'
            );
          }
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({})) as { error?: string };
          if (!cancelled) {
            setError(res.status === 404 ? 'This shared brew was not found.' : (data.error ?? 'Failed to load this brew.'));
          }
          return;
        }
        const data = await res.json().catch(() => null) as SharedBrew | null;
        if (!data) {
          if (!cancelled) setError('Invalid response from server.');
          return;
        }
        if (!cancelled) {
          setSharedBrew(data);
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load this brew.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchBrew();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Loading brew…</p>
        </div>
      </Layout>
    );
  }

  if (error || !sharedBrew) {
    return (
      <Layout>
        <div className="text-center py-16 space-y-4">
          <p className="text-muted-foreground">{error ?? 'Brew not found.'}</p>
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Adapt SharedBrew to the BrewingEntry shape expected by BrewingDetail.
  // Normalize coffeeVariety: legacy blobs may have it stored as a plain string.
  const rawVariety = sharedBrew.brew.coffeeVariety;
  const normalizedVariety = typeof rawVariety === 'string'
    ? (rawVariety ? [rawVariety] : undefined)
    : rawVariety;
  const entry: BrewingEntry = {
    ...sharedBrew.brew,
    coffeeVariety: normalizedVariety,
    id: sharedBrew.shareId,
    createdAt: sharedBrew.sharedAt,
    updatedAt: sharedBrew.sharedAt,
  };

  const handleDuplicate = () => {
    navigate('/new', { state: { duplicateFrom: entry } });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/" aria-label="Back to home">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">Shared Brew</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setDuplicateOpen(true)}>
            <Copy className="h-4 w-4 mr-1" aria-hidden="true" />
            Duplicate
          </Button>
        </div>

        {/* Duplicate confirmation dialog */}
        <Dialog open={duplicateOpen} onOpenChange={setDuplicateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Duplicate Brew</DialogTitle>
              <DialogDescription>
                Duplicate <strong>{entry.coffeeProducer}</strong>? All brew details will be
                copied and you will be taken to the rating step.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDuplicateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-1" aria-hidden="true" />
                Duplicate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <BrewingDetail entry={entry} />
      </div>
    </Layout>
  );
}
