import { motion } from 'framer-motion';
import { Settings, Github, Slack, Bell, Palette, Shield, Key, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const integrations = [
  { name: 'GitHub', description: 'Connect your repositories', icon: Github, connected: true },
  { name: 'Slack', description: 'Get notifications in Slack', icon: Slack, connected: false },
];

export const SettingsView = () => {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Settings className="w-7 h-7 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and integrations
        </p>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-primary" />
          Integrations
        </h3>
        <div className="space-y-4">
          {/* GitHub Integration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Github className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">GitHub</p>
                <p className="text-sm text-muted-foreground">Connect your repositories</p>
              </div>
            </div>
            {/* Mock Connect Logic for UI Demo */}
            <Button
              variant="gradient"
              size="sm"
              className="gap-2"
              onClick={() => {
                const token = prompt('Enter your GitHub Personal Access Token (PAT):');
                if (token) {
                  // In a real app we would call the backend here
                  // For now, let's just show the user how it would look
                  alert('Connecting to GitHub with token: ' + token.substring(0, 5) + '...');
                  // Call connection API here
                }
              }}
            >
              Connect
            </Button>
          </motion.div>

          {/* Slack Integration (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Slack className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Slack</p>
                <p className="text-sm text-muted-foreground">Get notifications in Slack</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              Connect
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Code review alerts', description: 'Get notified when AI finds issues', enabled: true },
            { label: 'Sprint updates', description: 'Daily sprint progress summaries', enabled: true },
            { label: 'Team activity', description: 'Commits and PR notifications', enabled: false },
          ].map((setting, index) => (
            <motion.div
              key={setting.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-card border border-border"
            >
              <div>
                <p className="font-medium text-foreground">{setting.label}</p>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <button
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  setting.enabled ? "bg-primary" : "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-transform",
                    setting.enabled ? "translate-x-6" : "translate-x-0.5"
                  )}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Appearance
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Dark', active: true },
            { label: 'Light', active: false },
            { label: 'System', active: false },
          ].map((theme) => (
            <button
              key={theme.label}
              className={cn(
                "p-4 rounded-xl border text-center transition-all",
                theme.active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              )}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security
        </h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start gap-3">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
            Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
