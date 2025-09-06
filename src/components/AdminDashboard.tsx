import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  TrendingUp, 
  Eye,
  UserCheck,
  Star,
  Award,
  Activity
} from 'lucide-react';
import { events, registrations, attendance, feedback } from '@/lib/mockData';
import { formatDate } from '@/lib/dateUtils';

export function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

  // Calculate analytics
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const totalAttendance = attendance.length;
  const totalFeedback = feedback.length;
  const averageRating = feedback.length > 0 
    ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
    : '0';

  // Event popularity (most registered events)
  const eventRegistrationCounts = events.map(event => ({
    ...event,
    registrationCount: registrations.filter(r => r.event_id === event.id).length,
    attendanceCount: attendance.filter(a => a.event_id === event.id).length,
    feedbackCount: feedback.filter(f => f.event_id === event.id).length,
    averageFeedback: (() => {
      const eventFeedback = feedback.filter(f => f.event_id === event.id);
      return eventFeedback.length > 0 
        ? (eventFeedback.reduce((sum, f) => sum + f.rating, 0) / eventFeedback.length).toFixed(1)
        : 'N/A';
    })()
  })).sort((a, b) => b.registrationCount - a.registrationCount);

  const upcomingEvents = events.filter(e => new Date(e.start_time) > new Date());
  const completedEvents = events.filter(e => e.status === 'completed');

  return (
    <Layout currentPage="dashboard" userType="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Campus Event Management Overview</p>
          </div>
          <Button variant="hero" className="shadow-glow">
            <Calendar className="h-4 w-4 mr-2" />
            Create New Event
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                {upcomingEvents.length} upcoming
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                Across all events
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
              <UserCheck className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRegistrations > 0 ? Math.round((totalAttendance / totalRegistrations) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {totalAttendance} attended
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating}/5</div>
              <p className="text-xs text-muted-foreground">
                From {totalFeedback} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Performance */}
          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Event Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventRegistrationCounts.slice(0, 5).map((event, index) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={index === 0 ? 'success' : 'default'} className="text-xs">
                          #{index + 1}
                        </Badge>
                        <h4 className="font-medium text-sm truncate">{event.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(new Date(event.start_time))}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{event.registrationCount} registered</div>
                      <div className="text-xs text-muted-foreground">
                        {event.attendanceCount} attended
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-secondary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New registration for AI Workshop</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Feedback received for Startup Competition</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Event capacity reached: Tech Fest 2024</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Bulk check-in completed for Digital Art Seminar</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Create Event</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Bulk Check-in</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Export Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}