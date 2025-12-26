import { motion } from 'framer-motion';
import { Users, TrendingUp, TrendingDown, Clock, GitCommit, Code, Bug, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const teamData = [
  { name: 'Alex', commits: 45, reviews: 23, linesChanged: 2340 },
  { name: 'Sarah', commits: 38, reviews: 31, linesChanged: 1890 },
  { name: 'Marcus', commits: 52, reviews: 18, linesChanged: 3120 },
  { name: 'Emma', commits: 41, reviews: 27, linesChanged: 2560 },
];

const activityData = [
  { name: 'Mon', commits: 24, reviews: 12 },
  { name: 'Tue', commits: 31, reviews: 18 },
  { name: 'Wed', commits: 28, reviews: 15 },
  { name: 'Thu', commits: 35, reviews: 22 },
  { name: 'Fri', commits: 42, reviews: 28 },
];

const languageData = [
  { name: 'TypeScript', value: 45, color: 'hsl(199, 89%, 48%)' },
  { name: 'JavaScript', value: 25, color: 'hsl(51, 100%, 52%)' },
  { name: 'Python', value: 15, color: 'hsl(142, 76%, 46%)' },
  { name: 'Go', value: 10, color: 'hsl(280, 70%, 60%)' },
  { name: 'Other', value: 5, color: 'hsl(215, 20%, 65%)' },
];

export const TeamInsightsView = () => {
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
            <Users className="w-7 h-7 text-primary" />
            Team Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Analytics and performance metrics for your development team
          </p>
        </div>
      </motion.div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Commits', value: '176', change: '+12%', trend: 'up', icon: GitCommit, color: 'text-success' },
          { label: 'Code Reviews', value: '99', change: '+8%', trend: 'up', icon: Code, color: 'text-info' },
          { label: 'Bugs Fixed', value: '34', change: '-5%', trend: 'down', icon: Bug, color: 'text-warning' },
          { label: 'AI Assists Used', value: '289', change: '+24%', trend: 'up', icon: Zap, color: 'text-primary' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
                <span className={stat.trend === 'up' ? 'text-success text-sm' : 'text-destructive text-sm'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground text-sm">vs last week</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 8%)',
                    border: '1px solid hsl(222, 30%, 18%)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="commits" fill="hsl(51, 100%, 52%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reviews" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Languages Used</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 8%)',
                    border: '1px solid hsl(222, 30%, 18%)',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {languageData.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Member</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Commits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reviews</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Lines Changed</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Activity</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member, index) => (
                <motion.tr
                  key={member.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(45,100%,60%)] flex items-center justify-center text-primary-foreground font-medium text-sm">
                        {member.name[0]}
                      </div>
                      <span className="font-medium text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-foreground">{member.commits}</td>
                  <td className="py-4 px-4 text-foreground">{member.reviews}</td>
                  <td className="py-4 px-4 text-foreground">{member.linesChanged.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-[hsl(45,100%,60%)]"
                        style={{ width: `${(member.commits / 52) * 100}%` }}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
