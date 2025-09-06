import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = await getDocs(collection(db, 'events'));
      setEvents(eventsCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid gap-4">
        {events.map(event => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.startTime).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(event.startTime).toLocaleTimeString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
