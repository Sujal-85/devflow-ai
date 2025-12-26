import { motion } from 'framer-motion';
import { Code, GitCommit, Bug, Zap } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ProductivityChart } from './ProductivityChart';
import { ActivityFeed } from './ActivityFeed';
import { AIInsights } from './AIInsights';

export const DashboardView = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(51_100%_52%/0.1),_transparent_70%)]" />
        <div className="relative">
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, Developer! 👋
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Your productivity is up 12% this week. You have 3 pending code reviews and 2 AI-generated documentation updates ready for review.
          </p>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Lines of Code"
          value="12,847"
          change={{ value: 12, type: 'increase' }}
          icon={Code}
          delay={0.1}
        />
        <MetricCard
          title="Commits Today"
          value="24"
          change={{ value: 8, type: 'increase' }}
          icon={GitCommit}
          iconColor="text-success"
          delay={0.15}
        />
        <MetricCard
          title="Bugs Fixed"
          value="7"
          change={{ value: 3, type: 'decrease' }}
          icon={Bug}
          iconColor="text-warning"
          delay={0.2}
        />
        <MetricCard
          title="AI Assists"
          value="156"
          change={{ value: 24, type: 'increase' }}
          icon={Zap}
          iconColor="text-info"
          delay={0.25}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductivityChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights />
    </div>
  );
};
