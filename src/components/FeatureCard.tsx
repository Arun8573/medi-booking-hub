
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="p-6 rounded-xl bg-white dark:bg-card shadow-sm border border-border hover:shadow-md transition-all duration-300 h-full"
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0,
        animation: 'fade-in 0.6s ease-out forwards, slide-up 0.6s ease-out forwards',
      }}
    >
      <div className="flex flex-col items-start">
        <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
