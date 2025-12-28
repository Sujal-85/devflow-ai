import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const insights = [
  {
    id: 1,
    type: 'optimization',
    title: 'Performance Opportunity',
    description: 'The useEffect hook in UserDashboard.tsx can be memoized to prevent unnecessary re-renders.',
    file: 'src/components/UserDashboard.tsx',
    icon: Lightbulb,
    color: 'text-primary bg-primary/10',
    actionLabel: 'Apply Fix',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Potential Memory Leak',
    description: 'Event listener in SocketConnection.ts is not being cleaned up on component unmount.',
    file: 'src/services/SocketConnection.ts',
    icon: AlertTriangle,
    color: 'text-warning bg-warning/10',
    actionLabel: 'View Details',
  },
  {
    id: 3,
    type: 'success',
    title: 'Code Quality Improved',
    description: 'Your team reduced technical debt by 15% this sprint. Great progress on the refactoring initiative!',
    file: null,
    icon: CheckCircle,
    color: 'text-success bg-success/10',
    actionLabel: 'View Report',
  },
];

export const AIInsights = () => {
  const handleRunAnalysis = () => {
    toast.info('Running full code analysis...');
    setTimeout(() => {
      toast.success('Analysis complete! No new issues found.');
    }, 1500);
  };

  const handleInsightAction = (action: string) => {
    toast.success(`Action triggered: ${action}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Powered by advanced code analysis</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleRunAnalysis}>
          Run Full Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                insight.color
              )}>
                <Icon className="w-5 h-5" />
              </div>

              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {insight.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {insight.description}
              </p>

              {insight.file && (
                <p className="text-xs text-muted-foreground mt-3 font-mono truncate">
                  {insight.file}
                </p>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="mt-4 w-full"
                onClick={() => handleInsightAction(insight.actionLabel)}
              >
                {insight.actionLabel}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
