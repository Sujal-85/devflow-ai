import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  iconColor = "text-primary",
  delay = 0 
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-2xl p-6 hover:shadow-[0_0_40px_hsl(51_100%_52%/0.1)] transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              change.type === 'increase' ? "text-success" : "text-destructive"
            )}>
              <span>{change.type === 'increase' ? '↑' : '↓'}</span>
              <span>{Math.abs(change.value)}% from last week</span>
            </p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10",
          iconColor
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
