
import { useState, useEffect } from 'react';
import { CalendarDays, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 glass shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary"
        >
          <CalendarDays className="w-8 h-8" />
          <span className="text-xl font-medium">MediBooking</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/doctors" label="Doctors" />
          <NavLink to="/services" label="Services" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 py-4 px-4 animate-fade-in shadow-md">
          <nav className="flex flex-col space-y-3">
            <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/doctors" label="Doctors" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/services" label="Services" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/about" label="About" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
            
            <div className="pt-3 flex flex-col space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link 
    to={to} 
    className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium relative group"
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
  </Link>
);

// Mobile Nav Link
const MobileNavLink = ({ 
  to, 
  label, 
  onClick 
}: { 
  to: string; 
  label: string; 
  onClick: () => void;
}) => (
  <Link 
    to={to} 
    className="text-foreground/90 hover:text-foreground py-2 transition-colors text-lg font-medium"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;
