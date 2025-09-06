import { CreateEventForm } from "@/components/CreateEventForm";
import { EventList } from "@/components/EventList";
import { DashboardStats } from "@/components/DashboardStats";

export function AdminDashboard() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <CreateEventForm />
      </div>
      <DashboardStats />
      <div className="mt-8">
        <EventList />
      </div>
    </div>
  );
}
