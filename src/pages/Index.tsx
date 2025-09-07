import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { SeedButton } from "@/components/SeedButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Campus Event Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline event organization and student participation across your campus
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Link to="/admin">
              <Button size="lg" className="px-8">
                Admin Portal
              </Button>
            </Link>
            <Link to="/student">
              <Button size="lg" variant="outline" className="px-8">
                Student Portal
              </Button>
            </Link>
          </div>
          <SeedButton />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-card border-0">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Create, schedule, and manage campus events with ease
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <CardTitle>Student Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Simple registration process for students to join events
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0">
            <CardHeader className="text-center">
              <Award className="h-12 w-12 text-success mx-auto mb-4" />
              <CardTitle>Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Monitor attendance and participation with QR codes
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-warning mx-auto mb-4" />
              <CardTitle>Analytics & Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Comprehensive insights and reporting capabilities
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;