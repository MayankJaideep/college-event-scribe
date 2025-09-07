import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SubmitFeedbackData {
  event_id: string;
  student_id: string;
  rating: number;
  comments?: string;
}

export const useSubmitFeedback = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (feedbackData: SubmitFeedbackData) => {
      const { data, error } = await supabase
        .from('feedback')
        .insert(feedbackData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    }
  });
};