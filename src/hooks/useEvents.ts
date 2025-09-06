import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from '@/types';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return response.json() as Promise<Event[]>;
    }
  });
};

export const useRegisterEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ eventId, studentId }: { eventId: string; studentId: string }) => {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, studentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to register for event');
      }
      return response.json();
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
      const response = await fetch(`/api/students/${studentId}/registrations`);
      if (!response.ok) {
        throw new Error('Failed to fetch student registrations');
      }
      return response.json() as Promise<string[]>;
    },
    enabled: !!studentId
  });
};
