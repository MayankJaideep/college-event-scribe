import { useState } from 'react';
import { StudentDashboard } from '@/components/StudentDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BarChart3, UserCheck } from 'lucide-react';

const Index = () => {
  const [viewMode, setViewMode] = useState<'demo' | 'student' | 'admin'>('demo');

  if (viewMode === 'student') {
    return <StudentDashboard />;
  }

  if (viewMode === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border shadow-soft">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Campus Event Management Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Transform Your Campus Events
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Streamline event registration, attendance tracking, and feedback collection with our comprehensive platform designed for educational institutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                className="text-lg px-8 py-6 h-auto"
                onClick={() => setViewMode('student')}
              >
                <Users className="h-5 w-5 mr-2" />
                Student Portal
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 h-auto border-2"
                onClick={() => setViewMode('admin')}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Complete Event Management Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to organize, track, and analyze campus events efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group bg-gradient-card border-0 hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Event Creation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Create and manage events with detailed information, capacity limits, and scheduling
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-card border-0 hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Registration System</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Seamless student registration with capacity management and waitlist functionality
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-card border-0 hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                QR code-based check-in system with real-time attendance monitoring and analytics
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-card border-0 hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-warning rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Analytics & Reports</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Comprehensive reporting on event performance, attendance rates, and feedback analysis
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-card/50 backdrop-blur-sm border-t">
        <div className="container mx-auto px-6 py-16 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Choose your portal to explore the full capabilities of our event management platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => setViewMode('student')}
            >
              Explore Student Features
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setViewMode('admin')}
            >
              View Admin Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
