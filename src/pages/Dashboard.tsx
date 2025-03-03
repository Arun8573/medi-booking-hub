
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Edit2, FilePlus, FileText, LogOut, Plus, Trash2, User, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AppointmentForm from '@/components/AppointmentForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MedicalRecordView from '@/components/MedicalRecordView';
import DocumentUpload from '@/components/DocumentUpload';
import FeedbackForm from '@/components/FeedbackForm';

// Mock data for upcoming appointments
const initialUpcomingAppointments = [
  {
    id: '1',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: new Date(2023, 5, 15, 10, 0),
    status: 'confirmed',
    type: 'in-person',
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: new Date(2023, 5, 22, 14, 30),
    status: 'confirmed',
    type: 'video',
  },
];

// Mock data for past appointments
const pastAppointments = [
  {
    id: '3',
    doctor: 'Dr. Emma Wilson',
    specialty: 'General Medicine',
    date: new Date(2023, 4, 10, 11, 0),
    status: 'completed',
    type: 'in-person',
  },
  {
    id: '4',
    doctor: 'Dr. James Brown',
    specialty: 'Orthopedics',
    date: new Date(2023, 3, 28, 9, 0),
    status: 'completed',
    type: 'in-person',
  },
  {
    id: '5',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: new Date(2023, 2, 15, 15, 30),
    status: 'completed',
    type: 'video',
  },
];

// Mock data for medical reports
const medicalRecords = [
  {
    id: '1',
    title: 'Annual Checkup Results',
    date: new Date(2023, 4, 10),
    doctor: 'Dr. Emma Wilson',
    content: `
      <h2>Annual Health Checkup - Summary</h2>
      <p><strong>Date:</strong> May 10, 2023</p>
      <p><strong>Doctor:</strong> Dr. Emma Wilson</p>
      
      <h3>Vital Signs</h3>
      <ul>
        <li>Blood Pressure: 120/80 mmHg (Normal)</li>
        <li>Heart Rate: 72 BPM (Normal)</li>
        <li>Temperature: 98.6°F (Normal)</li>
        <li>Respiratory Rate: 16 breaths/min (Normal)</li>
        <li>Weight: 70 kg</li>
        <li>Height: 175 cm</li>
        <li>BMI: 22.9 (Normal range)</li>
      </ul>
      
      <h3>Laboratory Tests</h3>
      <table border="1" cellpadding="5">
        <tr>
          <th>Test</th>
          <th>Result</th>
          <th>Reference Range</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Hemoglobin</td>
          <td>14.5 g/dL</td>
          <td>13.5-17.5 g/dL</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Total Cholesterol</td>
          <td>185 mg/dL</td>
          <td>&lt;200 mg/dL</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>HDL Cholesterol</td>
          <td>55 mg/dL</td>
          <td>&gt;40 mg/dL</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>LDL Cholesterol</td>
          <td>110 mg/dL</td>
          <td>&lt;130 mg/dL</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Triglycerides</td>
          <td>120 mg/dL</td>
          <td>&lt;150 mg/dL</td>
          <td>Normal</td>
        </tr>
      </table>
      
      <h3>Assessment</h3>
      <p>Overall health status is good. No significant findings during physical examination.</p>
      
      <h3>Recommendations</h3>
      <ul>
        <li>Continue with regular exercise (at least 150 minutes/week)</li>
        <li>Maintain a balanced diet</li>
        <li>Schedule next annual checkup in 12 months</li>
      </ul>
    `
  },
  {
    id: '2',
    title: 'Blood Test Results',
    date: new Date(2023, 2, 15),
    doctor: 'Dr. Sarah Johnson',
    content: `
      <h2>Complete Blood Count (CBC) Report</h2>
      <p><strong>Date:</strong> March 15, 2023</p>
      <p><strong>Doctor:</strong> Dr. Sarah Johnson</p>
      <p><strong>Lab:</strong> CityCare Medical Laboratory</p>
      
      <h3>Blood Cell Counts</h3>
      <table border="1" cellpadding="5">
        <tr>
          <th>Test</th>
          <th>Result</th>
          <th>Reference Range</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>White Blood Cell (WBC)</td>
          <td>7.5 × 10^9/L</td>
          <td>4.5-11.0 × 10^9/L</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Red Blood Cell (RBC)</td>
          <td>5.1 × 10^12/L</td>
          <td>4.5-5.9 × 10^12/L</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Hemoglobin (Hgb)</td>
          <td>14.5 g/dL</td>
          <td>13.5-17.5 g/dL</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Hematocrit (Hct)</td>
          <td>42%</td>
          <td>41-50%</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Platelet Count</td>
          <td>250 × 10^9/L</td>
          <td>150-450 × 10^9/L</td>
          <td>Normal</td>
        </tr>
      </table>
      
      <h3>Differential WBC Count</h3>
      <table border="1" cellpadding="5">
        <tr>
          <th>Cell Type</th>
          <th>Percentage</th>
          <th>Reference Range</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Neutrophils</td>
          <td>60%</td>
          <td>50-70%</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Lymphocytes</td>
          <td>30%</td>
          <td>25-40%</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Monocytes</td>
          <td>6%</td>
          <td>2-8%</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Eosinophils</td>
          <td>3%</td>
          <td>1-4%</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Basophils</td>
          <td>1%</td>
          <td>0-1%</td>
          <td>Normal</td>
        </tr>
      </table>
      
      <h3>Additional Tests</h3>
      <table border="1" cellpadding="5">
        <tr>
          <th>Test</th>
          <th>Result</th>
          <th>Reference Range</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Mean Corpuscular Volume (MCV)</td>
          <td>88 fL</td>
          <td>80-96 fL</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Mean Corpuscular Hemoglobin (MCH)</td>
          <td>29 pg</td>
          <td>27-33 pg</td>
          <td>Normal</td>
        </tr>
        <tr>
          <td>Red Cell Distribution Width (RDW)</td>
          <td>13.1%</td>
          <td>11.5-14.5%</td>
          <td>Normal</td>
        </tr>
      </table>
      
      <h3>Assessment</h3>
      <p>All blood parameters are within normal ranges. No abnormalities detected.</p>
      
      <h3>Recommendations</h3>
      <p>Continue with current health maintenance. Follow up with cardiologist as scheduled.</p>
    `
  },
];

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string | null;
  isAdmin: boolean;
}

const defaultProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "",
  address: "",
  profileImage: null,
  isAdmin: false
};

interface FeedbackItem {
  id: string;
  date: Date;
  rating: number;
  comment: string;
  response?: string;
}

const Dashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState(initialUpcomingAppointments);
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showMedicalRecord, setShowMedicalRecord] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load user profile from localStorage if available
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        setProfile(userInfo);
        if (userInfo.profileImage) {
          setPreviewUrl(userInfo.profileImage);
        }
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
      }
    }
    
    // Load user documents from localStorage if available
    const storedDocuments = localStorage.getItem('userDocuments');
    if (storedDocuments) {
      try {
        setDocuments(JSON.parse(storedDocuments));
      } catch (e) {
        console.error("Failed to parse user documents from localStorage", e);
      }
    }
    
    // Load user feedback from localStorage if available
    const storedFeedback = localStorage.getItem('userFeedback');
    if (storedFeedback) {
      try {
        setFeedback(JSON.parse(storedFeedback));
      } catch (e) {
        console.error("Failed to parse user feedback from localStorage", e);
      }
    }
  }, []);
  
  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create a preview URL for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleCancelAppointment = (id: string) => {
    // Remove the appointment from the upcomingAppointments array
    const updatedAppointments = upcomingAppointments.filter(appointment => appointment.id !== id);
    setUpcomingAppointments(updatedAppointments);
    
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been successfully cancelled and removed from your schedule.",
    });
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update profile with the new image URL if available
    const updatedProfile = { ...profile };
    if (previewUrl) {
      updatedProfile.profileImage = previewUrl;
    }
    
    // Save updated profile to localStorage
    localStorage.setItem('userInfo', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setShowProfileForm(false);
  };
  
  const handleProfileFieldChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('userInfo');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const handleDocumentUpload = (document: any) => {
    const newDocuments = [...documents, document];
    setDocuments(newDocuments);
    localStorage.setItem('userDocuments', JSON.stringify(newDocuments));
    
    toast({
      title: "Document Uploaded",
      description: "Your document has been successfully uploaded.",
    });
    
    setShowUploadForm(false);
  };
  
  const handleFeedbackSubmit = (feedbackData: Omit<FeedbackItem, 'id' | 'date'>) => {
    const newFeedback = {
      id: Date.now().toString(),
      date: new Date(),
      ...feedbackData
    };
    
    const updatedFeedback = [...feedback, newFeedback];
    setFeedback(updatedFeedback);
    localStorage.setItem('userFeedback', JSON.stringify(updatedFeedback));
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It helps us improve our services.",
    });
    
    setShowFeedbackForm(false);
  };
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24 mb-4 cursor-pointer" onClick={handleProfileImageClick}>
                      {profile.profileImage || previewUrl ? (
                        <AvatarImage src={previewUrl || profile.profileImage || ''} alt={profile.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                          {getInitials(profile.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute bottom-4 right-0 bg-primary text-white rounded-full p-1 cursor-pointer" onClick={handleProfileImageClick}>
                      <Camera className="h-4 w-4" />
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </div>
                  <h2 className="text-xl font-medium">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowProfileForm(true)}
                    >
                      Edit Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowNewAppointmentForm(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowMedicalRecord(medicalRecords[0].id)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Medical Records
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowUploadForm(true)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowFeedbackForm(true)}
                >
                  <FilePlus className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{upcomingAppointments.length}</div>
                  <p className="text-primary-foreground/80">Appointments</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Past</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pastAppointments.length}</div>
                  <p className="text-muted-foreground">Appointments</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Medical</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{medicalRecords.length + documents.length}</div>
                  <p className="text-muted-foreground">Records</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Appointments Tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
                <TabsTrigger value="past">Past Appointments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-6 space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setShowNewAppointmentForm(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Book New Appointment
                    </Button>
                  </div>
                ) : (
                  upcomingAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                      onCancel={() => handleCancelAppointment(appointment.id)}
                    />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="past" className="mt-6 space-y-4">
                {pastAppointments.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No past appointments.</p>
                  </div>
                ) : (
                  pastAppointments.map((appointment) => (
                    <AppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                      isPast
                    />
                  ))
                )}
              </TabsContent>
            </Tabs>
            
            {/* Medical Records */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Medical Records</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowUploadForm(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Record
                </Button>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Clinical Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medicalRecords.map((record) => (
                    <Card key={record.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{record.title}</CardTitle>
                        <CardDescription>
                          {format(record.date, 'MMMM d, yyyy')}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setShowMedicalRecord(record.id)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Report
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {documents.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mt-8">Uploaded Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((doc, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-2">
                            <CardTitle>{doc.name}</CardTitle>
                            <CardDescription>
                              {format(new Date(doc.date), 'MMMM d, yyyy')}
                            </CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => window.open(doc.url, '_blank')}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Document
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Feedback History */}
            {feedback.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">My Feedback</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Feedback
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead>Response</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedback.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{format(new Date(item.date), 'PP')}</TableCell>
                        <TableCell>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={i < item.rating ? "currentColor" : "none"}
                                stroke={i < item.rating ? "none" : "currentColor"}
                                className={`w-4 h-4 ${i < item.rating ? "text-yellow-500" : "text-gray-300"}`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{item.comment}</TableCell>
                        <TableCell>{item.response || "Awaiting response"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* New Appointment Dialog */}
      <Dialog open={showNewAppointmentForm} onOpenChange={setShowNewAppointmentForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book New Appointment</DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule your appointment.
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm />
        </DialogContent>
      </Dialog>
      
      {/* Edit Profile Dialog */}
      <Dialog open={showProfileForm} onOpenChange={setShowProfileForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleProfileUpdate} className="space-y-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24 cursor-pointer" onClick={handleProfileImageClick}>
                  {previewUrl ? (
                    <AvatarImage src={previewUrl} alt={profile.name} />
                  ) : profile.profileImage ? (
                    <AvatarImage src={profile.profileImage} alt={profile.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer" onClick={handleProfileImageClick}>
                  <Camera className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={profile.name} 
                onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={profile.email} 
                onChange={(e) => handleProfileFieldChange('email', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={profile.phone} 
                onChange={(e) => handleProfileFieldChange('phone', e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                value={profile.address} 
                onChange={(e) => handleProfileFieldChange('address', e.target.value)}
                placeholder="Your address"
                rows={3}
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Medical Record View Dialog */}
      <Dialog open={!!showMedicalRecord} onOpenChange={(open) => !open && setShowMedicalRecord(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          {showMedicalRecord && (
            <MedicalRecordView 
              record={medicalRecords.find(r => r.id === showMedicalRecord)!}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Document Upload Dialog */}
      <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload medical documents, prescriptions, or test results.
            </DialogDescription>
          </DialogHeader>
          <DocumentUpload onUpload={handleDocumentUpload} />
        </DialogContent>
      </Dialog>
      
      {/* Feedback Form Dialog */}
      <Dialog open={showFeedbackForm} onOpenChange={setShowFeedbackForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Feedback</DialogTitle>
            <DialogDescription>
              Share your experience with our healthcare services.
            </DialogDescription>
          </DialogHeader>
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Appointment Card Component
interface AppointmentCardProps {
  appointment: {
    id: string;
    doctor: string;
    specialty: string;
    date: Date;
    status: string;
    type: string;
  };
  isPast?: boolean;
  onCancel?: () => void;
}

const AppointmentCard = ({ appointment, isPast = false, onCancel }: AppointmentCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="border-l-4 border-primary h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{appointment.doctor}</CardTitle>
              <CardDescription>{appointment.specialty}</CardDescription>
            </div>
            <Badge variant={appointment.type === 'video' ? 'outline' : 'default'}>
              {appointment.type === 'video' ? 'Video Call' : 'In-Person'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center text-muted-foreground mb-1">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{format(appointment.date, 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{format(appointment.date, 'h:mm a')}</span>
          </div>
        </CardContent>
        {!isPast && (
          <CardFooter className="flex justify-between pt-0">
            <Button variant="outline" size="sm">
              <Edit2 className="mr-2 h-3 w-3" />
              Reschedule
            </Button>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <Trash2 className="mr-2 h-3 w-3" />
              Cancel
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
};

export default Dashboard;
