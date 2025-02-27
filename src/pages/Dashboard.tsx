
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Edit2, FilePlus, FileText, LogOut, Plus, Trash2, User } from 'lucide-react';
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

// Mock data for upcoming appointments
const upcomingAppointments = [
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
  },
  {
    id: '2',
    title: 'Blood Test Results',
    date: new Date(2023, 2, 15),
    doctor: 'Dr. Sarah Johnson',
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

const Dashboard = () => {
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load user profile from localStorage if available
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        setProfile(userInfo);
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
      }
    }
  }, []);
  
  const handleCancelAppointment = (id: string) => {
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been successfully cancelled.",
    });
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save updated profile to localStorage
    localStorage.setItem('userInfo', JSON.stringify(profile));
    
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
                  <Avatar className="h-24 w-24 mb-4">
                    {profile.profileImage ? (
                      <AvatarImage src={profile.profileImage} alt={profile.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
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
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View Medical Records
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Upload Documents
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
                  <div className="text-3xl font-bold">{medicalRecords.length}</div>
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
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Record
                </Button>
              </div>
              
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
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
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
            
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input 
                id="profileImage" 
                value={profile.profileImage || ''} 
                onChange={(e) => handleProfileFieldChange('profileImage', e.target.value)}
                placeholder="https://example.com/your-image.jpg"
              />
              <p className="text-xs text-muted-foreground">Enter a URL to your profile image</p>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
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
