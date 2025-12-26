import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', productivity: 65, commits: 12 },
  { name: 'Tue', productivity: 78, commits: 19 },
  { name: 'Wed', productivity: 82, commits: 14 },
  { name: 'Thu', productivity: 70, commits: 8 },
  { name: 'Fri', productivity: 89, commits: 23 },
  { name: 'Sat', productivity: 45, commits: 5 },
  { name: 'Sun', productivity: 38, commits: 3 },
];

export const ProductivityChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Productivity Overview</h3>
          <p className="text-sm text-muted-foreground">Weekly developer activity</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Productivity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-info" />
            <span className="text-sm text-muted-foreground">Commits</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(51, 100%, 52%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(51, 100%, 52%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="commitsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(215, 20%, 65%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215, 20%, 65%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 8%)',
                border: '1px solid hsl(222, 30%, 18%)',
                borderRadius: '12px',
                color: 'hsl(210, 40%, 98%)',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="productivity" 
              stroke="hsl(51, 100%, 52%)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#productivityGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="commits" 
              stroke="hsl(199, 89%, 48%)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#commitsGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
