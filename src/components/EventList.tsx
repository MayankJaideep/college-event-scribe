import { useEvents } from '@/hooks/useEvents';
import { EventCard } from './EventCard';
import { Loader2 } from 'lucide-react';

export function EventList() {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading events: {error.message}</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No events found. Create your first event!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid gap-4">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            showRegistration={false}
          />
        ))}
      </div>
    </div>
  );
}
