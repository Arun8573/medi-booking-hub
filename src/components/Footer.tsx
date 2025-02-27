
import { CalendarDays, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 py-12 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4 space-x-2 text-primary">
              <CalendarDays className="w-7 h-7" />
              <span className="text-xl font-medium">HelpCare Booking</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Schedule your medical appointments with ease, connecting patients with healthcare providers efficiently.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/team" label="Our Team" />
              <FooterLink to="/careers" label="Careers" />
              <FooterLink to="/blog" label="Blog" />
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              <FooterLink to="/appointments" label="Book Appointment" />
              <FooterLink to="/doctors" label="Find a Doctor" />
              <FooterLink to="/specialties" label="Specialties" />
              <FooterLink to="/telemedicine" label="Telemedicine" />
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/faq" label="FAQ" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} HelpCare Booking. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer Link Component
const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
    >
      {label}
    </Link>
  </li>
);

// Social Media Link Component
const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-muted-foreground hover:text-foreground transition-colors p-2 bg-background/80 rounded-full"
  >
    {icon}
  </a>
);

export default Footer;
