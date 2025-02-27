
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Mail, MapPin, MessageSquare, Phone, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
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

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiry, setInquiry] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setInquiry('general');
      setMessage('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Have questions or need assistance? Our team is here to help. Reach out to us through any of 
              the channels below or fill out the contact form.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Details */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="lg:col-span-2 space-y-6"
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">(800) 123-4567</p>
                      <p className="text-sm text-muted-foreground mt-1">Monday-Friday, 8am-6pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">support@helpcare-booking.com</p>
                      <p className="text-sm text-muted-foreground mt-1">We'll respond as soon as possible</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office</h3>
                      <p className="text-muted-foreground">123 Healthcare Avenue</p>
                      <p className="text-muted-foreground">Suite 500</p>
                      <p className="text-muted-foreground">Boston, MA 02118</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Hours</h3>
                      <p className="text-muted-foreground">Monday-Friday: 9am-5pm</p>
                      <p className="text-muted-foreground">Saturday: 10am-2pm</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Map (placeholder image) */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-muted">
                    <img 
                      src="https://maps.googleapis.com/maps/api/staticmap?center=Boston,MA&zoom=14&size=600x300&markers=color:red%7CBoston,MA&key=YOUR_API_KEY_HERE" 
                      alt="Map location" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Button variant="outline" className="bg-white/90">
                        Open in Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-3"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Send us a Message</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="name" 
                            placeholder="John Doe" 
                            className="pl-10" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="phone" 
                            placeholder="(123) 456-7890" 
                            className="pl-10" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@example.com" 
                          className="pl-10" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inquiry">Type of Inquiry</Label>
                      <Select 
                        value={inquiry} 
                        onValueChange={setInquiry}
                        required
                      >
                        <SelectTrigger id="inquiry">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Information</SelectItem>
                          <SelectItem value="appointment">Appointment Issues</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Questions</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea 
                          id="message" 
                          placeholder="How can we help you?" 
                          className="pl-10 min-h-[120px]" 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending Message...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* FAQ Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Find quick answers to common questions about our services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">How do I reschedule an appointment?</h3>
                  <p className="text-muted-foreground">
                    You can easily reschedule appointments through your dashboard. Simply log in, find the appointment
                    in your upcoming appointments list, and click on the "Reschedule" option.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Is my medical information secure?</h3>
                  <p className="text-muted-foreground">
                    Absolutely. We employ industry-leading security measures and adhere to HIPAA regulations to ensure 
                    your medical information remains private and protected at all times.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Can I book appointments for family members?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can book appointments for family members. During the booking process, you'll have the option
                    to specify who the appointment is for, including dependents on your account.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">How far in advance can I book appointments?</h3>
                  <p className="text-muted-foreground">
                    Most healthcare providers allow booking up to 3 months in advance, but this can vary depending on 
                    the provider's schedule and policies. The available booking window will be shown during the booking process.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-muted-foreground mb-4">
                Didn't find what you're looking for? Our support team is ready to help.
              </p>
              <Button onClick={() => document.getElementById('name')?.focus()}>
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ContactPage;
