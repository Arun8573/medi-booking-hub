
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle, Heart, Lightbulb, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Framer Motion variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Dr. Michael Reynolds',
    role: 'Founder & Chief Medical Officer',
    image: 'https://i.pravatar.cc/300?img=11',
    bio: 'Dr. Reynolds founded HelpCare Booking with the vision of making healthcare more accessible through technology. With over 20 years of medical experience, he oversees our clinical standards and healthcare provider network.',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Chief Executive Officer',
    image: 'https://i.pravatar.cc/300?img=5',
    bio: 'Sarah brings extensive experience in healthcare management and digital transformation. She leads our company\'s strategy and operations, focusing on improving patient experiences and healthcare outcomes.',
  },
  {
    id: 3,
    name: 'James Wilson',
    role: 'Chief Technology Officer',
    image: 'https://i.pravatar.cc/300?img=12',
    bio: 'James oversees our technology infrastructure and development. His expertise in healthcare IT and data security ensures our platform remains cutting-edge, secure, and user-friendly.',
  },
  {
    id: 4,
    name: 'Dr. Emily Rodriguez',
    role: 'Medical Director',
    image: 'https://i.pravatar.cc/300?img=25',
    bio: 'Dr. Rodriguez coordinates with our network of healthcare providers to maintain high-quality care standards. She develops clinical protocols and ensures our platform meets the needs of both patients and providers.',
  },
];

// Values data
const companyValues = [
  {
    id: 1,
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'We prioritize the needs and preferences of patients in all aspects of our service, focusing on improving healthcare experiences and outcomes.',
  },
  {
    id: 2,
    icon: Shield,
    title: 'Trust & Privacy',
    description: 'We maintain the highest standards of data security and privacy protection, ensuring that patient information remains confidential and secure.',
  },
  {
    id: 3,
    icon: CheckCircle,
    title: 'Quality & Excellence',
    description: 'We are committed to providing high-quality services and continually improving our platform based on feedback and healthcare best practices.',
  },
  {
    id: 4,
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace innovative technologies and approaches to solve healthcare challenges and enhance the accessibility and efficiency of healthcare services.',
  },
];

// Milestones data
const milestones = [
  {
    year: 2018,
    title: 'Foundation',
    description: 'HelpCare Booking was founded with the mission to revolutionize healthcare appointment scheduling.',
  },
  {
    year: 2019,
    title: 'Initial Launch',
    description: 'Launched our platform in select cities, partnering with 50+ healthcare providers.',
  },
  {
    year: 2020,
    title: 'Telemedicine Integration',
    description: 'Added virtual consultation capabilities in response to global healthcare challenges.',
  },
  {
    year: 2021,
    title: 'National Expansion',
    description: 'Expanded services nationwide with over 500 healthcare providers on our platform.',
  },
  {
    year: 2022,
    title: 'Mobile App Launch',
    description: 'Released our mobile application, making healthcare scheduling even more accessible.',
  },
  {
    year: 2023,
    title: 'AI-Enhanced Features',
    description: 'Introduced AI-powered recommendations and personalized healthcare insights.',
  },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">About HelpCare Booking</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to simplify healthcare access by connecting patients with 
              the right healthcare providers through our innovative scheduling platform.
            </p>
          </motion.div>
          
          {/* Our Story */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  HelpCare Booking was founded in 2018 with a simple yet powerful vision: to make healthcare
                  access easier, faster, and more efficient for everyone. What started as a solution to the
                  frustrating process of booking medical appointments has grown into a comprehensive platform
                  connecting thousands of patients with healthcare providers every day.
                </p>
                <p>
                  Our founder, Dr. Michael Reynolds, experienced firsthand the inefficiencies in traditional
                  healthcare scheduling systems. Patients were facing long wait times, double-bookings, and
                  difficulty finding the right specialists for their needs. Together with a team of healthcare
                  professionals and technology experts, he created HelpCare Booking to address these challenges.
                </p>
                <p>
                  Today, our platform serves patients and healthcare providers nationwide, continually evolving
                  to incorporate new technologies and improve the healthcare experience for all stakeholders.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-primary/10 rounded-lg overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Healthcare professionals" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-secondary rounded-lg z-10 flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">Years of Service</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Our Values */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                These core principles guide our decisions and shape the way we build our platform.
              </p>
            </div>
            
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {companyValues.map((value) => (
                <motion.div key={value.id} variants={itemVariant}>
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="p-3 w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 flex items-center justify-center">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Milestones */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Key milestones in our evolution as a healthcare scheduling platform.
              </p>
            </div>
            
            <div className="relative">
              {/* Milestone Timeline */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:w-1/2"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium relative z-10">
                        <Calendar className="h-5 w-5" />
                      </div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex-1 md:w-1/2 bg-card rounded-lg p-6 shadow-sm ml-12 md:ml-0 md:mx-8"
                    >
                      <div className="text-xl font-semibold text-primary mb-1">{milestone.year}</div>
                      <h3 className="text-lg font-medium mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Leadership Team */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Leadership Team</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Meet the experts behind HelpCare Booking's vision and innovation.
              </p>
            </div>
            
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {teamMembers.map((member) => (
                <motion.div key={member.id} variants={itemVariant}>
                  <Card className="h-full overflow-hidden">
                    <div className="aspect-square relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-primary/5 rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Join Our Healthcare Network</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Whether you're a healthcare provider looking to grow your practice or a patient seeking quality care,
              HelpCare Booking is here to connect you with the right people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/doctors')}>
                Browse Our Doctors
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>
                Partner With Us
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage;
