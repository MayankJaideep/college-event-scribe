import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStats() {
  const [stats, setStats] = useState({ totalEvents: 0, totalRegistrations: 0, attendanceRate: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const eventsCollection = await getDocs(collection(db, 'events'));
      const registrationsCollection = await getDocs(collection(db, 'registrations'));
      
      const totalEvents = eventsCollection.size;
      const totalRegistrations = registrationsCollection.size;
      
      const attendedRegistrations = registrationsCollection.docs.filter(doc => doc.data().attended).length;
      const attendanceRate = totalRegistrations > 0 ? (attendedRegistrations / totalRegistrations) * 100 : 0;

      setStats({ totalEvents, totalRegistrations, attendanceRate });
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{stats.totalEvents}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{stats.totalRegistrations}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{stats.attendanceRate.toFixed(2)}%</p>
        </CardContent>
      </Card>
    </div>
  );
}
