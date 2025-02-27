
import { Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { CalendarDays } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-primary mb-4">
              <CalendarDays className="w-8 h-8 mr-2" />
              <span className="text-2xl font-medium">MediBooking</span>
            </Link>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to manage your appointments
            </p>
          </div>
          
          <AuthForm />
        </div>
      </div>
      
      <footer className="mt-auto py-4 text-center text-sm text-muted-foreground">
        <p>Don't have an account? <Link to="/signup" className="text-primary hover:underline">Create one now</Link></p>
      </footer>
    </div>
  );
};

export default Login;
