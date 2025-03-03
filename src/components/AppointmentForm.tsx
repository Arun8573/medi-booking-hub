
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { AppointmentSpecialty } from './appointment/AppointmentSpecialty';
import { AppointmentType } from './appointment/AppointmentType';
import { DateSelector } from './appointment/DateSelector';
import { TimeSlotSelector } from './appointment/TimeSlotSelector';
import { PatientInfoFields } from './appointment/PatientInfoFields';

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
  
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <AppointmentSpecialty 
        specialty={specialty} 
        setSpecialty={setSpecialty} 
      />

      <AppointmentType 
        appointmentType={appointmentType} 
        setAppointmentType={setAppointmentType} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateSelector 
          date={date} 
          onDateChange={handleDateChange} 
        />

        <TimeSlotSelector 
          timeSlot={timeSlot} 
          setTimeSlot={setTimeSlot} 
        />
      </div>

      <PatientInfoFields />

      <Button type="submit" className="w-full">
        Schedule Appointment
      </Button>
    </form>
  );
};

export default AppointmentForm;
