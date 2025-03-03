
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AppointmentTypeProps {
  appointmentType: string;
  setAppointmentType: (value: string) => void;
}

export const AppointmentType = ({ appointmentType, setAppointmentType }: AppointmentTypeProps) => {
  return (
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
  );
};
