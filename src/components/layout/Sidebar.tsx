import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Code2,
  FileText,
  ListTodo,
  Users,
  Settings,
  ChevronLeft,
  Zap,
  GitBranch,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'code-review', label: 'Code Review', icon: Code2 },
  { id: 'documentation', label: 'Documentation', icon: FileText },
  { id: 'sprint-planner', label: 'Sprint Planner', icon: ListTodo },
  { id: 'team-insights', label: 'Team Insights', icon: Users },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ activeSection, onSectionChange, isCollapsed, onCollapse }: SidebarProps) => {
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <motion.div
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-bold text-lg text-foreground">DevHub</h1>
                <p className="text-xs text-muted-foreground">AI Productivity</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActive && "text-primary"
              )} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* GitHub Status */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent/50",
          isCollapsed && "justify-center"
        )}>
          <GitBranch className="w-5 h-5 text-success flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">main</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Items */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="px-3 pb-4 space-y-1">
        <motion.button
          onClick={logout}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium"
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => onCollapse(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.div>
      </button>
    </motion.aside>
  );
};
