import { supabase } from '@/integrations/supabase/client';

export const seedDatabase = async () => {
  try {
    // Create a sample college
    const { data: college, error: collegeError } = await supabase
      .from('colleges')
      .insert({ name: 'Tech University' })
      .select()
      .single();
    
    if (collegeError) throw collegeError;

    // Create sample students
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .insert([
        {
          name: 'John Doe',
          email: 'john@tech.edu',
          roll_no: 'TU001',
          college_id: college.id
        },
        {
          name: 'Jane Smith',
          email: 'jane@tech.edu',
          roll_no: 'TU002',
          college_id: college.id
        }
      ])
      .select();
    
    if (studentsError) throw studentsError;

    // Create sample events
    const now = new Date();
    const futureDate1 = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now
    const futureDate2 = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days from now
    const pastDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // 5 days ago

    const { data: events, error: eventsError } = await supabase
      .from('events')
      .insert([
        {
          name: 'AI & Machine Learning Workshop',
          type: 'Workshop',
          description: 'Learn the fundamentals of AI and ML with hands-on projects',
          location: 'Tech Lab A',
          capacity: 50,
          start_time: futureDate1.toISOString(),
          end_time: new Date(futureDate1.getTime() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours later
          college_id: college.id
        },
        {
          name: 'Annual Tech Fest 2024',
          type: 'Fest',
          description: 'The biggest technology festival of the year with competitions and exhibitions',
          location: 'Main Campus',
          capacity: 500,
          start_time: futureDate2.toISOString(),
          end_time: new Date(futureDate2.getTime() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours later
          college_id: college.id
        },
        {
          name: 'Startup Pitch Competition',
          type: 'Hackathon',
          description: '48-hour hackathon followed by startup pitch presentations',
          location: 'Innovation Hub',
          capacity: 100,
          start_time: pastDate.toISOString(),
          end_time: new Date(pastDate.getTime() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours later
          status: 'completed',
          college_id: college.id
        }
      ])
      .select();
    
    if (eventsError) throw eventsError;

    console.log('Database seeded successfully!');
    return { college, students, events };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};