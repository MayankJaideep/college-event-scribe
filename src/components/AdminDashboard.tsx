import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, TrendingUp, Star, Plus, Download, UserCheck, FileText, Activity, BarChart3 } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { formatDate } from '@/lib/dateUtils';

export function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('last30days');
  const { data: events = [], isLoading } = useEvents();
  
  // Calculate key metrics
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + (event.registration_count || 0), 0);
  const totalAttendance = events.reduce((sum, event) => sum + (event.attendance_count || 0), 0);
  
  // Calculate attendance rate
  const attendanceRate = totalRegistrations > 0 
    ? (totalAttendance / totalRegistrations) * 100 
    : 0;
  
  // Prepare data for charts
  const eventPopularity = events.map(event => ({
    name: event.name.length > 20 ? event.name.substring(0, 20) + '...' : event.name,
    registrations: event.registration_count || 0,
    attendance: event.attendance_count || 0,
    feedback: 0 // This would come from feedback table join
  })).sort((a, b) => b.registrations - a.registrations).slice(0, 5);
  
  // Separate upcoming and completed events
  const upcomingEvents = events.filter(event => 
    new Date(event.start_time) > new Date() && event.status === 'scheduled'
  );
  
  const completedEvents = events.filter(event => 
    event.status === 'completed'
  );

  if (isLoading) {
    return (
      <Layout currentPage="dashboard" userType="admin">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-muted-foreground">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }

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
            <Plus className="h-4 w-4 mr-2" />
            Create New Event
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex justify-end">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last3months">Last 3 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
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
              <div className="text-2xl font-bold">{attendanceRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {totalAttendance} out of {totalRegistrations} registered
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">
                No feedback yet
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
              <CardDescription>Most popular events by registration count</CardDescription>
            </CardHeader>
            <CardContent>
              {eventPopularity.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={eventPopularity}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="registrations" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No events to display
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-secondary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.length > 0 ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Event management system initialized</p>
                        <p className="text-xs text-muted-foreground">System ready for registrations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Database connected successfully</p>
                        <p className="text-xs text-muted-foreground">Ready to track events and registrations</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="mx-auto h-8 w-8 mb-2" />
                    <p>No recent activity</p>
                  </div>
                )}
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
                <Plus className="h-6 w-6" />
                <span>Create Event</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <UserCheck className="h-6 w-6" />
                <span>Bulk Check-in</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Download className="h-6 w-6" />
                <span>Export Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}