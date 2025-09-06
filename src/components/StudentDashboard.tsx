import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Calendar, Trophy, Users } from 'lucide-react';
import { events, registrations } from '@/lib/mockData';
import { Event } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'browse' | 'my-events'>('browse');
  const { toast } = useToast();

  // Mock student registrations
  const studentRegistrations = registrations.filter(reg => reg.student_id === '1');
  const registeredEventIds = new Set(studentRegistrations.map(reg => reg.event_id));

  const filteredEvents = useMemo(() => {
    let filtered = events;
    
    if (currentView === 'my-events') {
      filtered = events.filter(event => registeredEventIds.has(event.id));
    }
    
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }
    
    return filtered;
  }, [searchQuery, selectedType, selectedStatus, currentView, registeredEventIds]);

  const handleRegister = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: "Registration Successful!",
        description: `You've been registered for "${event.name}". Check your email for confirmation.`,
      });
      // Here you would typically make an API call
    }
  };

  const stats = {
    totalEvents: events.length,
    registeredEvents: studentRegistrations.length,
    upcomingEvents: events.filter(e => new Date(e.start_time) > new Date()).length,
  };

  return (
    <Layout currentPage={currentView === 'browse' ? 'events' : 'registrations'} userType="student">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">Available this semester</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                My Registrations
              </CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.registeredEvents}</div>
              <p className="text-xs text-muted-foreground">Events registered</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Events
              </CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">Don't miss out!</p>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <Button 
            variant={currentView === 'browse' ? 'default' : 'outline'}
            onClick={() => setCurrentView('browse')}
          >
            Browse Events
          </Button>
          <Button 
            variant={currentView === 'my-events' ? 'default' : 'outline'}
            onClick={() => setCurrentView('my-events')}
          >
            My Events ({stats.registeredEvents})
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Fest">Fest</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                  <SelectItem value="Hackathon">Hackathon</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                isRegistered={registeredEventIds.has(event.id)}
                showRegistration={currentView === 'browse'}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {currentView === 'my-events' ? 'No Registered Events' : 'No Events Found'}
              </h3>
              <p className="text-muted-foreground">
                {currentView === 'my-events' 
                  ? 'You haven\'t registered for any events yet. Browse available events to get started!'
                  : 'Try adjusting your filters to find events that match your interests.'
                }
              </p>
              {currentView === 'my-events' && (
                <Button 
                  className="mt-4" 
                  onClick={() => setCurrentView('browse')}
                >
                  Browse Events
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}