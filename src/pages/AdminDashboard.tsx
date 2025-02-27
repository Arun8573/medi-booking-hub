
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Calendar, Clock, FileText, LogOut, MoreHorizontal, RefreshCw, 
  Search, Settings, UserPlus, Users, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock data for pending appointments
const pendingAppointments = [
  {
    id: '1',
    patient: 'Emma Wilson',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: new Date(2023, 5, 15, 10, 0),
    status: 'pending',
    type: 'in-person',
  },
  {
    id: '2',
    patient: 'Michael Thompson',
    doctor: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: new Date(2023, 5, 22, 14, 30),
    status: 'pending',
    type: 'video',
  },
  {
    id: '3',
    patient: 'David Brown',
    doctor: 'Dr. Lisa Wang',
    specialty: 'Neurology',
    date: new Date(2023, 5, 18, 11, 0),
    status: 'pending',
    type: 'in-person',
  },
];

// Mock data for users
const users = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    appointments: 3,
    lastActive: new Date(2023, 5, 10),
    avatar: null,
  },
  {
    id: '2',
    name: 'Michael Thompson',
    email: 'michael.t@example.com',
    appointments: 1,
    lastActive: new Date(2023, 5, 15),
    avatar: null,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    appointments: 5,
    lastActive: new Date(2023, 5, 12),
    avatar: null,
  },
  {
    id: '4',
    name: 'James Rodriguez',
    email: 'james.r@example.com',
    appointments: 2,
    lastActive: new Date(2023, 5, 8),
    avatar: null,
  },
];

// Mock data for doctors
const doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    patients: 45,
    availability: 'Mon, Wed, Fri',
    avatar: null,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    patients: 38,
    availability: 'Tue, Thu',
    avatar: null,
  },
  {
    id: '3',
    name: 'Dr. Lisa Wang',
    specialty: 'Neurology',
    patients: 27,
    availability: 'Mon, Tue, Wed',
    avatar: null,
  },
  {
    id: '4',
    name: 'Dr. James Brown',
    specialty: 'Orthopedics',
    patients: 31,
    availability: 'Wed, Thu, Fri',
    avatar: null,
  },
];

// Admin stats
const adminStats = [
  { title: 'Total Users', value: 1253, change: '+12%', icon: Users },
  { title: 'Total Appointments', value: 856, change: '+5%', icon: Calendar },
  { title: 'Pending Approvals', value: 23, change: '-2%', icon: Clock },
  { title: 'New Messages', value: 15, change: '+8%', icon: Bell },
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is admin
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        if (!userInfo.isAdmin) {
          // If not admin, redirect to user dashboard
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access the admin dashboard.",
          });
          navigate('/dashboard');
        }
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
        navigate('/login');
      }
    } else {
      // If no user info, redirect to login
      navigate('/login');
    }
  }, [navigate, toast]);
  
  const handleApproveAppointment = (id: string) => {
    toast({
      title: "Appointment Approved",
      description: "The appointment has been approved successfully.",
    });
  };
  
  const handleRejectAppointment = (id: string) => {
    toast({
      title: "Appointment Rejected",
      description: "The appointment has been rejected.",
    });
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
  
  // Filter functions for search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b sticky top-0 z-30 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout} 
              className="ml-2"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <span className={`text-xs font-medium ${
                      stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pending Appointments */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Pending Appointments</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
            </div>
            <CardDescription>
              Approve or reject appointment requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>
                      {format(appointment.date, 'MMM d, yyyy')} at {format(appointment.date, 'h:mm a')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={appointment.type === 'video' ? 'outline' : 'default'}>
                        {appointment.type === 'video' ? 'Video Call' : 'In-Person'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleApproveAppointment(appointment.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRejectAppointment(appointment.id)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Users & Doctors Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Appointments</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {user.avatar ? (
                            <AvatarImage src={user.avatar} alt={user.name} />
                          ) : (
                            <AvatarFallback className="text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.appointments}</TableCell>
                    <TableCell>{format(user.lastActive, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>View Appointments</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Delete User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="doctors" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Doctor
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {doctor.avatar ? (
                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          ) : (
                            <AvatarFallback className="text-xs">
                              {getInitials(doctor.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="font-medium">{doctor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.patients}</TableCell>
                    <TableCell>{doctor.availability}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                          <DropdownMenuItem>View Patients</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Remove Doctor</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
