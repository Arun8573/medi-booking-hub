
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Upload, File } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (document: any) => void;
}

const DocumentUpload = ({ onUpload }: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Set default document name from file name if empty
      if (!documentName) {
        const fileName = selectedFile.name.split('.')[0];
        setDocumentName(fileName);
      }
    }
  };
  
  const handleUpload = () => {
    if (!file || !documentName) return;
    
    setIsUploading(true);
    
    // In a real app, you would upload to a server here
    // For now, we'll simulate by creating a local URL and metadata
    
    // Create a URL for the file (this is temporary and will be lost on page refresh)
    const fileUrl = URL.createObjectURL(file);
    
    // Create document object
    const document = {
      name: documentName,
      type: documentType || 'Other',
      url: fileUrl,
      date: new Date().toISOString(),
      size: file.size,
      fileName: file.name,
    };
    
    // Simulate network delay
    setTimeout(() => {
      onUpload(document);
      setIsUploading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-4 py-4">
      <div 
        className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        {file ? (
          <div className="flex flex-col items-center">
            <File className="h-10 w-10 text-primary mb-2" />
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Click to upload a document</p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports PDF, JPG, PNG (up to 10MB)
            </p>
          </>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="documentName">Document Name</Label>
        <Input 
          id="documentName" 
          value={documentName} 
          onChange={(e) => setDocumentName(e.target.value)}
          placeholder="e.g., Blood Test Results"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="documentType">Document Type (Optional)</Label>
        <Input 
          id="documentType" 
          value={documentType} 
          onChange={(e) => setDocumentType(e.target.value)}
          placeholder="e.g., Lab Report, Prescription, X-Ray"
        />
      </div>
      
      <DialogFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!file || !documentName || isUploading}
          className="w-full"
        >
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DocumentUpload;
