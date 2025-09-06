-- Create colleges table
CREATE TABLE public.colleges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID NOT NULL REFERENCES public.colleges(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  roll_no TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID NOT NULL REFERENCES public.colleges(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Workshop', 'Fest', 'Seminar', 'Hackathon', 'Sports', 'Cultural')),
  description TEXT,
  location TEXT,
  capacity INTEGER,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id),
  student_id UUID NOT NULL REFERENCES public.students(id),
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled')),
  source TEXT NOT NULL DEFAULT 'app' CHECK (source IN ('app', 'web')),
  UNIQUE(event_id, student_id)
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID NOT NULL UNIQUE REFERENCES public.registrations(id),
  event_id UUID NOT NULL REFERENCES public.events(id),
  student_id UUID NOT NULL REFERENCES public.students(id),
  checkin_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  checkin_method TEXT NOT NULL CHECK (checkin_method IN ('QR', 'Manual')),
  checked_in_by TEXT NOT NULL
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id),
  student_id UUID NOT NULL REFERENCES public.students(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (adjust based on your auth requirements)
CREATE POLICY "Allow all operations on colleges" ON public.colleges FOR ALL USING (true);
CREATE POLICY "Allow all operations on students" ON public.students FOR ALL USING (true);
CREATE POLICY "Allow all operations on events" ON public.events FOR ALL USING (true);
CREATE POLICY "Allow all operations on registrations" ON public.registrations FOR ALL USING (true);
CREATE POLICY "Allow all operations on attendance" ON public.attendance FOR ALL USING (true);
CREATE POLICY "Allow all operations on feedback" ON public.feedback FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_students_college_id ON public.students(college_id);
CREATE INDEX idx_events_college_id ON public.events(college_id);
CREATE INDEX idx_events_start_time ON public.events(start_time);
CREATE INDEX idx_registrations_event_id ON public.registrations(event_id);
CREATE INDEX idx_registrations_student_id ON public.registrations(student_id);
CREATE INDEX idx_attendance_event_id ON public.attendance(event_id);
CREATE INDEX idx_attendance_student_id ON public.attendance(student_id);
CREATE INDEX idx_feedback_event_id ON public.feedback(event_id);