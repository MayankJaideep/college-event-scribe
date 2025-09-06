import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Home,
  PlusCircle,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  currentPage?: string;
  userType?: 'student' | 'admin';
}

const studentNavItems = [
  { id: 'events', label: 'Browse Events', icon: Calendar },
  { id: 'registrations', label: 'My Events', icon: Users },
  { id: 'profile', label: 'Profile', icon: Settings },
];

const adminNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'events', label: 'Manage Events', icon: Calendar },
  { id: 'checkin', label: 'Check-in', icon: UserCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'create', label: 'Create Event', icon: PlusCircle },
];

export function Layout({ children, currentPage = 'events', userType = 'student' }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navItems = userType === 'admin' ? adminNavItems : studentNavItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Campus Events</h1>
                  <p className="text-xs text-muted-foreground capitalize">{userType} Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <li key={item.id}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={cn(
                        "w-full justify-start gap-3 h-11",
                        isActive && "bg-gradient-primary shadow-glow"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {userType === 'admin' ? 'AD' : 'ST'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {userType === 'admin' ? 'Admin User' : 'John Doe'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userType === 'admin' ? 'Administrator' : 'Computer Science'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold capitalize">
              {navItems.find(item => item.id === currentPage)?.label || 'Events'}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              {userType === 'admin' ? 'Switch to Student' : 'Need Help?'}
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}