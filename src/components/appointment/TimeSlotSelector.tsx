
import { Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeSlotSelectorProps {
  timeSlot: string | null;
  setTimeSlot: (value: string) => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export const TimeSlotSelector = ({ timeSlot, setTimeSlot }: TimeSlotSelectorProps) => {
  return (
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
  );
};
