
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, HeartPulse, MapPin, Phone, Shield, Star, User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import AppointmentForm from '@/components/AppointmentForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const featuresData = [
  {
    icon: CalendarDays,
    title: 'Easy Scheduling',
    description: 'Book appointments with just a few clicks, 24/7 at your convenience.',
    delay: 100,
  },
  {
    icon: User,
    title: 'Find Specialists',
    description: 'Access a network of qualified healthcare professionals across multiple specialties.',
    delay: 200,
  },
  {
    icon: Video,
    title: 'Virtual Consultations',
    description: 'Connect with doctors remotely through secure video appointments.',
    delay: 300,
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your health information is protected with industry-leading security measures.',
    delay: 400,
  },
  {
    icon: Clock,
    title: 'Appointment Reminders',
    description: 'Receive timely notifications so you never miss an important appointment.',
    delay: 500,
  },
  {
    icon: HeartPulse,
    title: 'Health Records',
    description: 'Keep all your medical records organized and accessible in one place.',
    delay: 600,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    image: 'https://i.pravatar.cc/150?img=32',
    content: 'MediBooking has completely transformed how I manage my healthcare. The interface is intuitive, and I love being able to book appointments instantly without phone calls.',
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    image: 'https://i.pravatar.cc/150?img=11',
    content: 'As a doctor, I appreciate how this platform has streamlined my schedule and reduced no-shows with its automated reminder system.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Patient',
    image: 'https://i.pravatar.cc/150?img=5',
    content: 'The video consultation feature has been a lifesaver for my busy schedule. Highly recommended for anyone who values their time!',
    rating: 4,
  },
];

const doctorSpecialties = [
  { name: 'Cardiology', count: 24 },
  { name: 'Dermatology', count: 18 },
  { name: 'Neurology', count: 15 },
  { name: 'Pediatrics', count: 22 },
  { name: 'Orthopedics', count: 17 },
  { name: 'Ophthalmology', count: 12 },
  { name: 'Gynecology', count: 19 },
  { name: 'Psychiatry', count: 14 },
];

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

const Index = () => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl -z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full filter blur-3xl -z-10" />
          
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-6">
                  Modern Healthcare <br />
                  <span className="text-primary">Simplified</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                  Book appointments with trusted doctors, manage your healthcare, and access medical records all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="px-8">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/doctors">Find Doctors</Link>
                  </Button>
                </div>
                
                <div className="mt-12 flex items-center space-x-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((img) => (
                      <div 
                        key={img} 
                        className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                        style={{ zIndex: 5 - img }}
                      >
                        <img 
                          src={`https://i.pravatar.cc/40?img=${20 + img}`} 
                          alt="User avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Trusted by 10,000+ patients</div>
                    <div className="text-muted-foreground flex items-center">
                      <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                      4.9/5 rating
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 bg-white dark:bg-card rounded-xl shadow-xl p-6 border border-border">
                  <h3 className="text-xl font-medium mb-4">Book Your Appointment</h3>
                  <AppointmentForm />
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-xl -z-10" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Features Designed for You</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a seamless healthcare management experience with these powerful features.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuresData.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={feature.delay}
                />
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Specialties Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Explore Medical Specialties</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find the right specialist for your healthcare needs from our extensive network of qualified physicians.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {doctorSpecialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="relative group"
                >
                  <div className="bg-white dark:bg-card h-full rounded-xl p-6 border border-border flex flex-col items-center text-center hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-medium mb-1">{specialty.name}</h3>
                    <p className="text-sm text-muted-foreground">{specialty.count} Specialists</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="link" size="sm" asChild>
                        <Link to="/doctors">
                          View Doctors →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">What Our Users Say</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied patients and healthcare providers who trust our platform.
              </p>
            </motion.div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <motion.div
                  key={activeTestimonialIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-card rounded-xl p-8 shadow-sm border border-border">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonials[activeTestimonialIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg mb-6">"{testimonials[activeTestimonialIndex].content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonials[activeTestimonialIndex].image} 
                          alt={testimonials[activeTestimonialIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{testimonials[activeTestimonialIndex].name}</div>
                        <div className="text-sm text-muted-foreground">{testimonials[activeTestimonialIndex].role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeTestimonialIndex === index 
                        ? 'bg-primary' 
                        : 'bg-primary/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/20 -z-10" />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="container mx-auto max-w-7xl px-4 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Ready to Take Control of Your Healthcare?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of patients who have simplified their healthcare experience with MediBooking.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/signup">Create Free Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
            
            <div className="mt-12 inline-flex items-center px-6 py-3 rounded-full bg-white dark:bg-card border border-border shadow-sm">
              <Phone className="h-5 w-5 text-primary mr-3" />
              <span className="font-medium">Need assistance? Call us at (800) 123-4567</span>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
