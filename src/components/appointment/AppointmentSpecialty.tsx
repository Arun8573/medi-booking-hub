
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AppointmentSpecialtyProps {
  specialty: string;
  setSpecialty: (value: string) => void;
}

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

export const AppointmentSpecialty = ({ specialty, setSpecialty }: AppointmentSpecialtyProps) => {
  return (
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
  );
};
