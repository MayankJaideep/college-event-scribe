import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          registrations!inner(count),
          attendance(count)
        `)
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      
      return data?.map(event => ({
        ...event,
        registration_count: event.registrations?.length || 0,
        attendance_count: event.attendance?.length || 0
      })) as Event[];
    }
  });
};

export const useRegisterEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ eventId, studentId }: { eventId: string; studentId: string }) => {
      const { data, error } = await supabase
        .from('registrations')
        .insert({
          event_id: eventId,
          student_id: studentId,
          source: 'app'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
    }
  });
};

export const useStudentRegistrations = (studentId: string) => {
  return useQuery({
    queryKey: ['registrations', studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('event_id')
        .eq('student_id', studentId)
        .eq('status', 'registered');
      
      if (error) throw error;
      return data?.map(reg => reg.event_id) || [];
    },
    enabled: !!studentId
  });
};