
import { useState } from 'react';
import { CalendarIcon, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const specialties = [
  { id: 'general', name: 'General Medicine' },
  { id: 'cardiology', name: 'Cardiology' },
  { id: 'dermatology', name: 'Dermatology' },
  { id: 'neurology', name: 'Neurology' },
  { id: 'pediatrics', name: 'Pediatrics' },
  { id: 'orthopedics', name: 'Orthopedics' },
  { id: 'psychiatry', name: 'Psychiatry' },
  { id: 'gynecology', name: 'Gynecology' },
  { id: 'ophthalmology', name: 'Ophthalmology' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const AppointmentForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [specialty, setSpecialty] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !specialty) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields.",
      });
      return;
    }
    
    try {
      const userInfo = localStorage.getItem('userInfo');
      let email = '';
      let phone = '';
      
      if (userInfo) {
        const { email: userEmail, phone: userPhone } = JSON.parse(userInfo);
        email = userEmail;
        phone = userPhone;
      }
      
      console.log(`Sending email notification to: ${email}`);
      if (phone) {
        console.log(`Sending SMS notification to: ${phone}`);
      }
      
      toast({
        title: "Appointment Scheduled",
        description: `Your appointment has been booked for ${format(date, 'MMMM dd, yyyy')} at ${timeSlot}. A confirmation has been sent to your email${phone ? ' and phone' : ''}.`,
      });
      
      setTimeout(() => {
        setDate(new Date());
        setTimeSlot(null);
        setAppointmentType("in-person");
        setSpecialty("");
      }, 500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "Failed to schedule appointment. Please try again.",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-1.5">
        <Label htmlFor="specialty">Medical Specialty</Label>
        <Select 
          value={specialty} 
          onValueChange={setSpecialty}
        >
          <SelectTrigger id="specialty">
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((spec) => (
              <SelectItem key={spec.id} value={spec.id}>
                {spec.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Appointment Type</Label>
        <RadioGroup 
          value={appointmentType} 
          onValueChange={setAppointmentType}
          className="flex flex-col sm:flex-row gap-4 pt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in-person" id="in-person" />
            <Label htmlFor="in-person" className="cursor-pointer">In-Person Visit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video" className="cursor-pointer">Video Consultation</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label>Appointment Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) setDate(newDate);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1.5">
          <Label>Appointment Time</Label>
          <Select 
            value={timeSlot || ""} 
            onValueChange={setTimeSlot}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {timeSlot || "Select time"}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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

      <Button type="submit" className="w-full">
        Schedule Appointment
      </Button>
    </form>
  );
};

export default AppointmentForm;
