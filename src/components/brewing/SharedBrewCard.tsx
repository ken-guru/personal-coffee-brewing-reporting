import { Link } from 'react-router-dom';
import { Clock, Users, Droplets, Coffee, Settings, Copy } from 'lucide-react';
import type { SharedBrew } from '../../types/sharedBrew';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { formatTime, formatBrewingMethod, formatWaterSource } from '../../lib/utils';

interface SharedBrewCardProps {
  shared: SharedBrew;
  onDuplicate?: () => void;
}

export function SharedBrewCard({ shared, onDuplicate }: SharedBrewCardProps) {
  const { brew, shareId, sharedAt } = shared;
  const date = new Date(sharedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const ratio = (brew.millilitersOfWater / brew.gramsOfCoffee).toFixed(1);

  // Normalize coffeeVariety: legacy blobs may have it stored as a plain string.
  const varietyArray: string[] = typeof brew.coffeeVariety === 'string'
    ? (brew.coffeeVariety ? [brew.coffeeVariety] : [])
    : (brew.coffeeVariety ?? []);

  return (
    <div className="relative">
      <Link
        to={`/shared/${shareId}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        aria-label={`View shared ${brew.coffeeProducer} brew`}
      >
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-card-foreground truncate">
                    {brew.coffeeProducer}
                  </h3>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {brew.countryOfOrigin}
                  </Badge>
                  {varietyArray.map((v) => (
                    <Badge key={v} variant="outline" className="text-xs shrink-0 italic font-normal">
                      {v}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Coffee className="h-3 w-3 text-primary shrink-0" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    {brew.brewingMethod === 'other' && brew.brewingMethodCustom
                      ? brew.brewingMethodCustom
                      : formatBrewingMethod(brew.brewingMethod)}
                  </span>
                </div>
                {brew.grindEquipment && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Settings className="h-3 w-3 text-muted-foreground shrink-0" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{brew.grindEquipment}</span>
                  </div>
                )}
              </div>
              <div className="shrink-0">
                <StarRating value={brew.rating} readOnly size="sm" />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {brew.brewTimeSeconds !== null && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {formatTime(brew.brewTimeSeconds)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Droplets className="h-3 w-3" aria-hidden="true" />
                {brew.gramsOfCoffee}g · {brew.millilitersOfWater}ml ({formatWaterSource(brew.waterSource)}) · 1:{ratio}
              </span>
              {brew.numberOfPeople > 1 && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" aria-hidden="true" />
                  {brew.numberOfPeople} people
                </span>
              )}
              {brew.guestRatings.length > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" aria-hidden="true" />
                  {brew.guestRatings.length} guest rating{brew.guestRatings.length !== 1 ? 's' : ''}
                </span>
              )}
              <span className={onDuplicate ? 'mr-8' : 'ml-auto'}>{date}</span>
            </div>

            {brew.comment && (
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2 italic">
                "{brew.comment}"
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
      {onDuplicate && (
        <button
          type="button"
          onClick={onDuplicate}
          className="absolute bottom-3 right-3 z-10 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label={`Duplicate ${brew.coffeeProducer} brew`}
        >
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
