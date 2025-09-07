import { CreateEventForm } from "@/components/CreateEventForm";
import { EventList } from "@/components/EventList";
import { DashboardStats } from "@/components/DashboardStats";
import { SeedButton } from "@/components/SeedButton";
import { Layout } from "@/components/Layout";

export function AdminDashboard() {
  return (
    <Layout currentPage="dashboard" userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <SeedButton />
            <CreateEventForm />
          </div>
        </div>
        <DashboardStats />
        <EventList />
      </div>
    </Layout>
  );
}
