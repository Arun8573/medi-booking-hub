
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, Clipboard, Heart, Microscope, Stethoscope, Thermometer, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

// Sample services data
const medicalServices = [
  {
    id: 1,
    icon: Stethoscope,
    title: 'Primary Care',
    description: 'Comprehensive healthcare for individuals and families, including preventive care, routine check-ups, and treatment for common illnesses.',
    benefits: [
      'Regular health assessments and screenings',
      'Management of chronic conditions',
      'Preventive healthcare guidance',
      'Referrals to specialists when needed',
    ],
  },
  {
    id: 2,
    icon: Heart,
    title: 'Cardiology',
    description: 'Specialized care for heart conditions, from diagnosis to treatment and long-term management of cardiovascular diseases.',
    benefits: [
      'Heart disease risk assessment',
      'ECG and stress tests',
      'Heart rhythm monitoring',
      'Cholesterol management',
    ],
  },
  {
    id: 3,
    icon: Brain,
    title: 'Neurology',
    description: 'Expert care for disorders of the nervous system, including the brain, spinal cord, and peripheral nerves.',
    benefits: [
      'Diagnosis and treatment of neurological disorders',
      'Headache and migraine management',
      'Memory disorder evaluation',
      'Movement disorder assessment',
    ],
  },
  {
    id: 4,
    icon: Users,
    title: 'Pediatrics',
    description: 'Specialized healthcare for children from birth through adolescence, focusing on growth, development, and well-being.',
    benefits: [
      'Well-child visits and vaccinations',
      'Growth and development monitoring',
      'Behavioral health assessments',
      'School and sports physicals',
    ],
  },
  {
    id: 5,
    icon: Thermometer,
    title: 'Dermatology',
    description: 'Diagnosis and treatment of skin conditions, from common issues like acne to complex disorders and skin cancer screening.',
    benefits: [
      'Skin cancer screenings',
      'Acne and eczema treatment',
      'Mole and lesion evaluation',
      'Cosmetic dermatology procedures',
    ],
  },
  {
    id: 6,
    icon: Clipboard,
    title: 'Mental Health',
    description: 'Compassionate care for mental health disorders, including anxiety, depression, and stress management.',
    benefits: [
      'Psychiatric evaluations',
      'Therapy and counseling',
      'Medication management',
      'Stress reduction techniques',
    ],
  },
];

const specializedPrograms = [
  {
    id: 1,
    title: 'Diabetes Management Program',
    description: 'Comprehensive care for diabetes patients, including regular monitoring, nutrition counseling, and medication management.',
    features: [
      'Personalized treatment plans',
      'Blood sugar monitoring and management',
      'Nutritional guidance from certified dietitians',
      'Regular check-ups and complication prevention',
    ],
  },
  {
    id: 2,
    title: 'Women\'s Health Program',
    description: 'Specialized healthcare services focusing on women\'s unique health needs at every stage of life.',
    features: [
      'Preventive screenings and well-woman exams',
      'Family planning and fertility services',
      'Menopause management',
      'Osteoporosis prevention and treatment',
    ],
  },
  {
    id: 3,
    title: 'Senior Care Program',
    description: 'Tailored healthcare services for older adults, focusing on maintaining independence and quality of life.',
    features: [
      'Chronic disease management',
      'Medication reviews and management',
      'Fall prevention',
      'Memory assessment and cognitive health',
    ],
  },
];

const diagnosticServices = [
  {
    id: 1,
    title: 'Laboratory Testing',
    description: 'Comprehensive blood and urine testing for diagnosis, monitoring, and preventive health screenings.',
    icon: Microscope,
  },
  {
    id: 2,
    title: 'Imaging Services',
    description: 'Advanced imaging including X-rays, ultrasounds, MRIs, and CT scans for accurate diagnosis.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Cardiac Diagnostics',
    description: 'Specialized tests to evaluate heart function, including ECGs, stress tests, and echocardiograms.',
    icon: Heart,
  },
];

const ServicesPage = () => {
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
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">Our Healthcare Services</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer a comprehensive range of medical services to meet your healthcare needs, 
              provided by experienced professionals committed to your well-being.
            </p>
          </motion.div>
          
          {/* Services Tabs */}
          <Tabs defaultValue="medical" className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="medical">Medical Services</TabsTrigger>
              <TabsTrigger value="programs">Specialized Programs</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic Services</TabsTrigger>
            </TabsList>
            
            {/* Medical Services Tab */}
            <TabsContent value="medical">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {medicalServices.map((service) => (
                  <motion.div key={service.id} variants={itemVariant}>
                    <Card className="h-full hover:shadow-md transition-all duration-300">
                      <CardHeader>
                        <div className="p-3 w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 flex items-center justify-center">
                          <service.icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-medium mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="text-muted-foreground text-sm flex items-start">
                              <span className="text-primary mr-2">•</span> {benefit}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => navigate('/doctors')}>
                          Find Specialists <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Specialized Programs Tab */}
            <TabsContent value="programs">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="space-y-8"
              >
                {specializedPrograms.map((program) => (
                  <Card key={program.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                      <div className="md:col-span-1 bg-primary/10 p-6 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-primary mb-2">{program.title}</h3>
                          <Button variant="outline" onClick={() => navigate('/contact')}>
                            Learn More
                          </Button>
                        </div>
                      </div>
                      <div className="md:col-span-2 p-6">
                        <p className="text-muted-foreground mb-4">{program.description}</p>
                        <h4 className="font-medium mb-2">Program Features:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {program.features.map((feature, index) => (
                            <li key={index} className="text-muted-foreground text-sm flex items-start">
                              <span className="text-primary mr-2">•</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Diagnostic Services Tab */}
            <TabsContent value="diagnostic">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <Card className="border-0 shadow-none">
                  <CardContent className="px-0 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {diagnosticServices.map((service) => (
                        <div key={service.id} className="text-center p-6 rounded-lg border hover:shadow-md transition-all">
                          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <service.icon className="h-8 w-8" />
                          </div>
                          <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-semibold mb-4">Need a diagnostic test?</h3>
                      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        Our state-of-the-art facilities and experienced staff ensure accurate results delivered promptly.
                      </p>
                      <Button onClick={() => navigate('/contact')}>
                        Schedule a Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          {/* Call to Action */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-primary/5 rounded-xl p-8 text-center my-12"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ready to Take the Next Step?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Schedule an appointment with one of our healthcare professionals and start your journey toward better health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/doctors')}>
                Find a Doctor
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ServicesPage;
