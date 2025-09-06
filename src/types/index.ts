export interface College {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  college_id: string;
  name: string;
  email: string;
  roll_no?: string;
  created_at: string;
}

export interface Event {
  id: string;
  college_id: string;
  name: string;
  type: 'Workshop' | 'Fest' | 'Seminar' | 'Hackathon' | 'Sports' | 'Cultural';
  description: string;
  location: string;
  capacity?: number;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'cancelled' | 'completed';
  created_at: string;
  registration_count?: number;
  attendance_count?: number;
}

export interface Registration {
  id: string;
  event_id: string;
  student_id: string;
  registered_at: string;
  status: 'registered' | 'cancelled';
  source: 'app' | 'web';
}

export interface Attendance {
  id: string;
  registration_id: string;
  event_id: string;
  student_id: string;
  checkin_time: string;
  checkin_method: 'QR' | 'Manual';
  checked_in_by: string;
}

export interface Feedback {
  id: string;
  event_id: string;
  student_id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comments?: string;
  submitted_at: string;
}

export interface EventReport {
  event: Event;
  registrations: number;
  attendance: number;
  attendance_percentage: number;
  average_rating?: number;
  feedback_count: number;
}

export interface StudentReport {
  student: Student;
  total_registered: number;
  total_attended: number;
  attendance_rate: number;
  events: Event[];
}