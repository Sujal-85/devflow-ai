import { useState } from 'react';
import { motion } from 'framer-motion';
import { ListTodo, Plus, Sparkles, Clock, User, Tag, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  status: 'todo' | 'in-progress' | 'done';
  aiGenerated: boolean;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Implement user authentication flow', priority: 'high', assignee: 'Alex', status: 'in-progress', aiGenerated: false },
  { id: '2', title: 'Fix memory leak in WebSocket handler', priority: 'high', assignee: 'Sarah', status: 'todo', aiGenerated: true },
  { id: '3', title: 'Add unit tests for API endpoints', priority: 'medium', assignee: 'Marcus', status: 'todo', aiGenerated: true },
  { id: '4', title: 'Optimize database queries', priority: 'medium', assignee: 'Emma', status: 'in-progress', aiGenerated: false },
  { id: '5', title: 'Update documentation', priority: 'low', assignee: 'Alex', status: 'done', aiGenerated: true },
  { id: '6', title: 'Refactor authentication module', priority: 'medium', assignee: 'Sarah', status: 'done', aiGenerated: false },
];

const columns = [
  { id: 'todo', title: 'To Do', color: 'border-muted-foreground' },
  { id: 'in-progress', title: 'In Progress', color: 'border-info' },
  { id: 'done', title: 'Done', color: 'border-success' },
];

export const SprintPlannerView = () => {
  const [tasks] = useState<Task[]>(initialTasks);

  const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <ListTodo className="w-7 h-7 text-primary" />
            Sprint Planner
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered task management and sprint planning
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Suggest Tasks
          </Button>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>
      </motion.div>

      {/* Sprint Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Current Sprint</p>
            <p className="text-lg font-semibold text-foreground">Sprint 23</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">5 days remaining</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-lg font-semibold text-foreground">67%</p>
          </div>
          <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-primary to-[hsl(45,100%,60%)]" />
          </div>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column, colIndex) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + colIndex * 0.1 }}
            className={cn(
              "glass rounded-2xl p-4 border-t-2",
              column.color
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{column.title}</h3>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {getTasksByStatus(column.id).length}
              </span>
            </div>

            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task, taskIndex) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + colIndex * 0.1 + taskIndex * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 cursor-pointer group transition-all"
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {task.title}
                        </p>
                        {task.aiGenerated && (
                          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          getPriorityColor(task.priority)
                        )}>
                          {task.priority}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
