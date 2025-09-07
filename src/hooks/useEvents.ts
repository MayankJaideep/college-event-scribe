import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event, Registration } from '@/types';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      // First get all events
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });
      
      if (eventsError) throw eventsError;
      
      // Then get registration counts for each event
      const eventsWithCounts = await Promise.all(
        events.map(async (event) => {
          const { count, error: countError } = await supabase
            .from('registrations')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', event.id)
            .eq('status', 'registered');
          
          if (countError) throw countError;
          
          return {
            ...event,
            registration_count: count || 0
          };
        })
      );
      
      return eventsWithCounts;
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
