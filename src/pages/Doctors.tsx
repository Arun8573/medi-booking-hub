
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Calendar, Filter, Mail, MapPin, Phone, Search, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    rating: 4.8,
    reviews: 124,
    experience: 12,
    education: 'All India Institute of Medical Sciences (AIIMS)',
    hospital: 'Apollo Hospitals',
    address: '23 Gandhi Road, New Delhi, India',
    phone: '(+91) 98765-43210',
    email: 'dr.sharma@helpcare.com',
    bio: 'Dr. Priya Sharma is a board-certified cardiologist with over 12 years of experience. She specializes in non-invasive cardiology, heart failure management, and preventive cardiology. Dr. Sharma is known for her patient-centered approach and excellent diagnostic skills.',
    languages: ['English', 'Hindi', 'Punjabi'],
    availableDays: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: 2,
    name: 'Dr. Vikram Patel',
    specialty: 'Dermatology',
    image: 'https://randomuser.me/api/portraits/men/72.jpg',
    rating: 4.9,
    reviews: 98,
    experience: 8,
    education: 'Christian Medical College, Vellore',
    hospital: 'Manipal Hospitals',
    address: '456 Health Avenue, Mumbai, India',
    phone: '(+91) 87654-32109',
    email: 'dr.patel@helpcare.com',
    bio: 'Dr. Vikram Patel is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. He is passionate about treating skin conditions and helping patients achieve their aesthetic goals. His expertise includes acne treatment, skin cancer screening, and anti-aging procedures.',
    languages: ['English', 'Hindi', 'Gujarati'],
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
  },
  {
    id: 3,
    name: 'Dr. Ananya Reddy',
    specialty: 'Pediatrics',
    image: 'https://randomuser.me/api/portraits/women/59.jpg',
    rating: 4.7,
    reviews: 156,
    experience: 15,
    education: 'Kasturba Medical College, Manipal',
    hospital: 'Rainbow Children\'s Hospital',
    address: '789 Wellness Lane, Bangalore, India',
    phone: '(+91) 76543-21098',
    email: 'dr.reddy@helpcare.com',
    bio: 'Dr. Ananya Reddy is a compassionate pediatrician with 15 years of experience caring for children from newborns to adolescents. She focuses on preventive care, developmental milestones, and supporting families in raising healthy children. Dr. Reddy is known for her gentle approach and ability to connect with young patients.',
    languages: ['English', 'Hindi', 'Telugu', 'Kannada'],
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
  },
  {
    id: 4,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Orthopedics',
    image: 'https://randomuser.me/api/portraits/men/79.jpg',
    rating: 4.6,
    reviews: 112,
    experience: 20,
    education: 'King George\'s Medical University, Lucknow',
    hospital: 'Fortis Hospital',
    address: '321 Joint Street, Chennai, India',
    phone: '(+91) 65432-10987',
    email: 'dr.kumar@helpcare.com',
    bio: 'Dr. Rajesh Kumar is a skilled orthopedic surgeon with two decades of experience treating bone and joint conditions. He specializes in sports medicine, joint replacement, and minimally invasive procedures. Dr. Kumar is committed to helping his patients return to their active lifestyles with reduced pain and improved mobility.',
    languages: ['English', 'Hindi', 'Tamil'],
    availableDays: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: 5,
    name: 'Dr. Neha Gupta',
    specialty: 'Neurology',
    image: 'https://randomuser.me/api/portraits/women/66.jpg',
    rating: 4.9,
    reviews: 87,
    experience: 14,
    education: 'Postgraduate Institute of Medical Education and Research',
    hospital: 'Medanta - The Medicity',
    address: '555 Brain Avenue, Gurgaon, India',
    phone: '(+91) 54321-09876',
    email: 'dr.gupta@helpcare.com',
    bio: 'Dr. Neha Gupta is a board-certified neurologist specializing in the diagnosis and treatment of neurological disorders. Her expertise includes headache management, stroke prevention, and neurodegenerative diseases. Dr. Gupta combines cutting-edge research with compassionate care to help patients with complex neurological conditions.',
    languages: ['English', 'Hindi', 'Bengali'],
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
  },
  {
    id: 6,
    name: 'Dr. Suresh Iyer',
    specialty: 'Psychiatry',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4.8,
    reviews: 75,
    experience: 10,
    education: 'National Institute of Mental Health and Neurosciences',
    hospital: 'Mental Wellness Clinic',
    address: '777 Mind Street, Hyderabad, India',
    phone: '(+91) 43210-98765',
    email: 'dr.iyer@helpcare.com',
    bio: 'Dr. Suresh Iyer is a compassionate psychiatrist dedicated to supporting mental health and well-being. He specializes in mood disorders, anxiety, PTSD, and psychopharmacology. Dr. Iyer creates personalized treatment plans that may include medication management, therapy recommendations, and lifestyle modifications to help patients achieve better mental health.',
    languages: ['English', 'Hindi', 'Tamil', 'Malayalam'],
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: 7,
    name: 'Dr. Meera Joshi',
    specialty: 'Gynecology',
    image: 'https://randomuser.me/api/portraits/women/76.jpg',
    rating: 4.7,
    reviews: 108,
    experience: 16,
    education: 'Seth G.S. Medical College, Mumbai',
    hospital: 'Lilavati Hospital',
    address: '888 Women\'s Care Way, Pune, India',
    phone: '(+91) 32109-87654',
    email: 'dr.joshi@helpcare.com',
    bio: 'Dr. Meera Joshi is a board-certified gynecologist with extensive experience in women\'s health. She provides comprehensive care from routine check-ups to complex gynecological issues. Dr. Joshi is particularly interested in minimally invasive surgery, fertility concerns, and menopause management. She is committed to empowering women through education about their health.',
    languages: ['English', 'Hindi', 'Marathi'],
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
  },
  {
    id: 8,
    name: 'Dr. Arjun Singh',
    specialty: 'Ophthalmology',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    rating: 4.8,
    reviews: 92,
    experience: 18,
    education: 'Dr. Rajendra Prasad Centre for Ophthalmic Sciences, AIIMS',
    hospital: 'Sankara Nethralaya',
    address: '999 Vision Lane, Kolkata, India',
    phone: '(+91) 21098-76543',
    email: 'dr.singh@helpcare.com',
    bio: 'Dr. Arjun Singh is a skilled ophthalmologist with expertise in comprehensive eye care. He specializes in cataract surgery, LASIK procedures, and the treatment of various eye conditions including glaucoma and macular degeneration. Dr. Singh is committed to preserving and improving his patients\' vision using the latest technological advances in the field.',
    languages: ['English', 'Hindi', 'Punjabi', 'Bengali'],
    availableDays: ['Monday', 'Thursday', 'Friday'],
  },
];

const specialties = [
  { value: 'all', label: 'All Specialties' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'gynecology', label: 'Gynecology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
];

const DoctorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const navigate = useNavigate();

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
                             doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    
    return matchesSearch && matchesSpecialty;
  });

  const openDoctorProfile = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsProfileOpen(true);
  };

  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-4">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Find Your Doctor</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Browse our network of experienced healthcare professionals and book an appointment with the right specialist for your needs.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search by name or specialty..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Select 
                value={selectedSpecialty} 
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                variants={itemVariant}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Avatar className="h-16 w-16 border-2 border-primary/10">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Badge className="ml-2">{doctor.specialty}</Badge>
                    </div>
                    <CardTitle className="mt-3">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.hospital}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground text-sm ml-1">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Award className="h-4 w-4 mr-2" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{doctor.address.split(',')[0]}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => openDoctorProfile(doctor)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowAppointmentForm(true);
                      }}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredDoctors.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No doctors match your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {selectedDoctor && (
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Doctor Profile</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedDoctor.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="md:col-span-1 flex flex-col items-center">
                <Avatar className="h-32 w-32 border-2 border-primary/10">
                  <AvatarImage src={selectedDoctor.image} alt={selectedDoctor.name} />
                  <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-medium mt-4">{selectedDoctor.name}</h3>
                <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                
                <div className="flex items-center my-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{selectedDoctor.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">({selectedDoctor.reviews} reviews)</span>
                </div>
                
                <div className="w-full mt-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    <span>{selectedDoctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span>{selectedDoctor.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <span>{selectedDoctor.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span>{selectedDoctor.email}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => {
                      setIsProfileOpen(false);
                      setShowAppointmentForm(true);
                    }}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2">About</h4>
                    <p className="text-muted-foreground">{selectedDoctor.bio}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Education</h4>
                    <p className="text-muted-foreground">{selectedDoctor.education}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.languages.map((language: string) => (
                        <Badge key={language} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Availability</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.availableDays.map((day: string) => (
                        <Badge key={day} variant="secondary">{day}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {selectedDoctor && (
        <Dialog open={showAppointmentForm} onOpenChange={setShowAppointmentForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book Appointment with {selectedDoctor.name}</DialogTitle>
              <DialogDescription>
                Fill in the details below to schedule your appointment.
              </DialogDescription>
            </DialogHeader>
            <AppointmentForm />
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </>
  );
};

export default DoctorsPage;
