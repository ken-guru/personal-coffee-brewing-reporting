import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SharedBrewCard } from './SharedBrewCard';
import type { SharedBrew } from '../../types/sharedBrew';

function makeSharedBrew(overrides: Partial<SharedBrew> = {}): SharedBrew {
  return {
    shareId: 'shared-1',
    sharedAt: '2024-03-15T10:00:00.000Z',
    brew: {
      coffeeProducer: 'Community Roaster',
      countryOfOrigin: 'Colombia',
      grindCoarseness: 'medium',
      grindEquipment: 'Baratza Encore',
      brewingMethod: 'pour-over',
      gramsOfCoffee: 15,
      millilitersOfWater: 250,
      waterSource: 'filtered-tap',
      numberOfPeople: 1,
      brewTimeSeconds: 180,
      rating: 4,
      guestRatings: [],
    },
    ...overrides,
  };
}

function renderCard(shared: SharedBrew, onDuplicate?: () => void) {
  render(
    <MemoryRouter>
      <SharedBrewCard shared={shared} onDuplicate={onDuplicate} />
    </MemoryRouter>
  );
}

describe('SharedBrewCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays the coffee producer name', () => {
    renderCard(makeSharedBrew());
    expect(screen.getByText('Community Roaster')).toBeInTheDocument();
  });

  it('renders a link to the shared brew page', () => {
    renderCard(makeSharedBrew({ shareId: 'test-id' }));
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/shared/test-id');
  });

  it('does not show a duplicate button when onDuplicate is not provided', () => {
    renderCard(makeSharedBrew());
    expect(screen.queryByRole('button', { name: /duplicate/i })).not.toBeInTheDocument();
  });

  it('shows a duplicate button when onDuplicate is provided', () => {
    renderCard(makeSharedBrew(), () => {});
    expect(screen.getByRole('button', { name: /duplicate community roaster brew/i })).toBeInTheDocument();
  });

  it('calls onDuplicate when the duplicate button is clicked', () => {
    const onDuplicate = vi.fn();
    renderCard(makeSharedBrew(), onDuplicate);
    fireEvent.click(screen.getByRole('button', { name: /duplicate/i }));
    expect(onDuplicate).toHaveBeenCalledOnce();
  });

  it('renders coffeeVariety string[] as individual badges', () => {
    renderCard(makeSharedBrew({
      brew: { ...makeSharedBrew().brew, coffeeVariety: ['Heirloom', 'Bourbon'] },
    }));
    expect(screen.getByText('Heirloom')).toBeInTheDocument();
    expect(screen.getByText('Bourbon')).toBeInTheDocument();
  });

  it('renders a legacy string coffeeVariety without crashing', () => {
    const shared = makeSharedBrew({
      brew: {
        ...makeSharedBrew().brew,
        coffeeVariety: 'Heirloom' as unknown as string[],
      },
    });
    renderCard(shared);
    expect(screen.getByText('Heirloom')).toBeInTheDocument();
  });
});
