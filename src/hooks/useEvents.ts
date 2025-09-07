import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event, Registration } from '@/types';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          registrations!inner(count)
        `)
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      
      // Add registration count to each event
      return data.map(event => ({
        ...event,
        registration_count: event.registrations?.[0]?.count || 0
      }));
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
          status: 'registered',
          source: 'web'
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
        .select('*')
        .eq('student_id', studentId)
        .eq('status', 'registered');
      
      if (error) throw error;
      return data as Registration[];
    },
    enabled: !!studentId
  });
};
