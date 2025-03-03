
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const PatientInfoFields = () => {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Enter your full name" required />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="(123) 456-7890" required />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reason">Reason for Visit</Label>
        <Textarea 
          id="reason" 
          placeholder="Briefly describe your symptoms or reason for the appointment" 
          className="resize-none"
          rows={3}
        />
      </div>
    </>
  );
};
