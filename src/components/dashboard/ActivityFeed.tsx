import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'commit',
    title: 'Refactored authentication module',
    repo: 'frontend/auth',
    user: 'Alex Chen',
    time: '2 mins ago',
    icon: GitCommit,
    color: 'text-success',
  },
  {
    id: 2,
    type: 'pr',
    title: 'Add user dashboard components',
    repo: 'frontend/dashboard',
    user: 'Sarah Kim',
    time: '15 mins ago',
    icon: GitPullRequest,
    color: 'text-info',
  },
  {
    id: 3,
    type: 'merge',
    title: 'Merge: API rate limiting feature',
    repo: 'backend/api',
    user: 'Marcus Lee',
    time: '1 hour ago',
    icon: GitMerge,
    color: 'text-primary',
  },
  {
    id: 4,
    type: 'commit',
    title: 'Fixed memory leak in socket handler',
    repo: 'backend/realtime',
    user: 'Emma Davis',
    time: '2 hours ago',
    icon: GitCommit,
    color: 'text-success',
  },
];

export const ActivityFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Team commits and PRs</p>
        </div>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50",
                activity.color
              )}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.repo} · {activity.user}
                </p>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{activity.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
