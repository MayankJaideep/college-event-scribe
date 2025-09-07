import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { seedDatabase } from '@/lib/seed';

export function SeedButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      toast({
        title: "Database seeded successfully!",
        description: "Sample data has been added to your database.",
      });
    } catch (error) {
      console.error('Seeding error:', error);
      toast({
        title: "Error seeding database",
        description: "There was an error adding sample data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      onClick={handleSeed} 
      disabled={isSeeding}
      variant="outline"
    >
      {isSeeding ? 'Seeding...' : 'Seed Database'}
    </Button>
  );
}