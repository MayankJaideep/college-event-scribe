import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/dateUtils';

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  isRegistered?: boolean;
  showRegistration?: boolean;
}

const getEventVariant = (type: Event['type']) => {
  const variants = {
    Workshop: 'workshop',
    Fest: 'fest',
    Seminar: 'seminar',
    Hackathon: 'hackathon',
    Sports: 'sports',
    Cultural: 'cultural',
  } as const;
  return variants[type] || 'default';
};

export function EventCard({ event, onRegister, isRegistered, showRegistration = true }: EventCardProps) {
  const startDate = new Date(event.start_time);
  const endDate = new Date(event.end_time);
  const isUpcoming = startDate > new Date();
  const capacityPercentage = event.capacity ? (event.registration_count || 0) / event.capacity * 100 : 0;

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge variant={getEventVariant(event.type)} className="text-xs font-medium">
            {event.type}
          </Badge>
          <Badge variant="status" className="text-xs">
            {event.status}
          </Badge>
        </div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {event.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{formatTime(startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {event.registration_count || 0}
              {event.capacity && `/${event.capacity}`}
            </span>
          </div>
        </div>

        {event.capacity && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Capacity</span>
              <span>{Math.round(capacityPercentage)}% filled</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>

      {showRegistration && (
        <CardFooter>
          {isRegistered ? (
            <Badge variant="success" className="w-full justify-center py-2">
              ✓ Registered
            </Badge>
          ) : (
            <Button 
              onClick={() => onRegister?.(event.id)}
              disabled={!isUpcoming || event.status !== 'scheduled' || (event.capacity && (event.registration_count || 0) >= event.capacity)}
              className="w-full"
              variant={isUpcoming ? 'default' : 'outline'}
            >
              {!isUpcoming ? 'Event Passed' : 
               event.status !== 'scheduled' ? 'Event Cancelled' :
               (event.capacity && (event.registration_count || 0) >= event.capacity) ? 'Event Full' :
               'Register Now'}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}