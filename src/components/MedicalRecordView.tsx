
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

interface MedicalRecord {
  id: string;
  title: string;
  date: Date;
  doctor: string;
  content: string;
}

interface MedicalRecordViewProps {
  record: MedicalRecord;
}

const MedicalRecordView = ({ record }: MedicalRecordViewProps) => {
  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{record.title}</DialogTitle>
        <div className="flex flex-col text-sm text-muted-foreground mt-1">
          <span>Date: {format(new Date(record.date), 'MMMM d, yyyy')}</span>
          <span>Doctor: {record.doctor}</span>
        </div>
      </DialogHeader>
      
      <div className="border-t pt-4">
        <div 
          className="prose max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: record.content }}
        />
      </div>
    </div>
  );
};

export default MedicalRecordView;
