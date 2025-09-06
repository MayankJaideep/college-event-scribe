import { College, Student, Event, Registration, Attendance, Feedback } from '@/types';

export const colleges: College[] = [
  { id: '1', name: 'Tech University' },
  { id: '2', name: 'Arts & Sciences College' },
  { id: '3', name: 'Engineering Institute' }
];

export const students: Student[] = [
  {
    id: '1',
    college_id: '1',
    name: 'Alice Johnson',
    email: 'alice@techuni.edu',
    roll_no: 'TU2023001',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    college_id: '1',
    name: 'Bob Smith',
    email: 'bob@techuni.edu',
    roll_no: 'TU2023002',
    created_at: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    college_id: '2',
    name: 'Carol Wilson',
    email: 'carol@arts.edu',
    roll_no: 'AS2023001',
    created_at: '2024-01-17T10:00:00Z'
  }
];

export const events: Event[] = [
  {
    id: '1',
    college_id: '1',
    name: 'AI & Machine Learning Workshop',
    type: 'Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on projects',
    location: 'Tech Lab A',
    capacity: 50,
    start_time: '2024-12-15T10:00:00Z',
    end_time: '2024-12-15T16:00:00Z',
    status: 'scheduled',
    created_at: '2024-11-20T10:00:00Z',
    registration_count: 35,
    attendance_count: 28
  },
  {
    id: '2',
    college_id: '1',
    name: 'Annual Tech Fest 2024',
    type: 'Fest',
    description: 'The biggest technology festival of the year with competitions and exhibitions',
    location: 'Main Campus',
    capacity: 500,
    start_time: '2024-12-20T09:00:00Z',
    end_time: '2024-12-22T18:00:00Z',
    status: 'scheduled',
    created_at: '2024-11-01T10:00:00Z',
    registration_count: 423,
    attendance_count: 0
  },
  {
    id: '3',
    college_id: '2',
    name: 'Digital Art Seminar',
    type: 'Seminar',
    description: 'Exploring modern digital art techniques and tools',
    location: 'Arts Building Hall 1',
    capacity: 80,
    start_time: '2024-12-18T14:00:00Z',
    end_time: '2024-12-18T17:00:00Z',
    status: 'scheduled',
    created_at: '2024-11-25T10:00:00Z',
    registration_count: 62,
    attendance_count: 0
  },
  {
    id: '4',
    college_id: '1',
    name: 'Startup Pitch Competition',
    type: 'Hackathon',
    description: '48-hour hackathon followed by startup pitch presentations',
    location: 'Innovation Hub',
    capacity: 100,
    start_time: '2024-12-10T09:00:00Z',
    end_time: '2024-12-12T17:00:00Z',
    status: 'completed',
    created_at: '2024-10-15T10:00:00Z',
    registration_count: 95,
    attendance_count: 87
  }
];

export const registrations: Registration[] = [
  {
    id: '1',
    event_id: '1',
    student_id: '1',
    registered_at: '2024-11-25T10:00:00Z',
    status: 'registered',
    source: 'app'
  },
  {
    id: '2',
    event_id: '2',
    student_id: '1',
    registered_at: '2024-11-26T14:30:00Z',
    status: 'registered',
    source: 'web'
  },
  {
    id: '3',
    event_id: '4',
    student_id: '2',
    registered_at: '2024-10-20T09:15:00Z',
    status: 'registered',
    source: 'app'
  }
];

export const attendance: Attendance[] = [
  {
    id: '1',
    registration_id: '3',
    event_id: '4',
    student_id: '2',
    checkin_time: '2024-12-10T09:15:00Z',
    checkin_method: 'QR',
    checked_in_by: 'admin1'
  }
];

export const feedback: Feedback[] = [
  {
    id: '1',
    event_id: '4',
    student_id: '2',
    rating: 5,
    comments: 'Excellent event! Learned a lot and made great connections.',
    submitted_at: '2024-12-12T20:00:00Z'
  }
];