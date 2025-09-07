import { useMemo } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useStudents } from '@/hooks/useStudents';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, TrendingUp, Award } from 'lucide-react';

export function DashboardStats() {
  const { data: events } = useEvents();
  const { data: students } = useStudents();

  const stats = useMemo(() => {
    const totalEvents = events?.length || 0;
    const totalStudents = students?.length || 0;
    
    // Calculate total registrations across all events
    const totalRegistrations = events?.reduce((sum, event) => 
      sum + (event.registration_count || 0), 0
    ) || 0;
    
    // Calculate upcoming events
    const now = new Date();
    const upcomingEvents = events?.filter(event => 
      new Date(event.start_time) > now
    ).length || 0;

    return {
      totalEvents,
      totalStudents,
      totalRegistrations,
      upcomingEvents
    };
  }, [events, students]);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEvents}</div>
          <p className="text-xs text-muted-foreground">
            {stats.upcomingEvents} upcoming
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
          <p className="text-xs text-muted-foreground">
            Registered in system
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
          <p className="text-xs text-muted-foreground">
            Across all events
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
          <p className="text-xs text-muted-foreground">
            Events scheduled
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
