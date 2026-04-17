'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MousePointer2, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCcw, 
  AlertCircle,
  Globe,
  Smartphone,
  BarChart3,
  Search,
  ChevronRight,
  User
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';

interface AnalyticsData {
  overview: any[];
  devices: any[];
  pages: any[];
  sources: any[];
  realtime: {
    activeUsers: number;
    topPages: any[];
  };
}

const COLORS = ['#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e'];

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analytics');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Failed to fetch analytics');
      }
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => fetchAnalytics(true), 60000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  if (loading) return <DashboardSkeleton />;

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <span className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">Real-time intelligence</span>
            </div>
            <h1 className="text-4xl font-black font-display tracking-tightest">PERFORMANCE INSIGHTS</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fetchAnalytics(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Updating Data...' : 'Sync Now'}
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
              Export Report
            </button>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4 text-red-500"
          >
            <AlertCircle size={24} />
            <div>
              <p className="font-bold">Analytics API Error</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
            <button 
              onClick={() => fetchAnalytics()}
              className="ml-auto bg-red-500 text-white px-4 py-1.5 rounded-xl text-xs font-bold"
            >
              Retry Connection
            </button>
          </motion.div>
        )}

        {/* Real-time & Primary Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <RealtimeCard activeUsers={data?.realtime.activeUsers || 0} />
          <StatCard 
            title="Total Sessions" 
            value={data?.overview?.reduce((acc, curr) => acc + curr.sessions, 0).toLocaleString() || "0"} 
            trend="+12%" 
            positive={true} 
            icon={<Activity className="text-indigo-500" />} 
          />
          <StatCard 
            title="Unique Visitors" 
            value={data?.overview?.reduce((acc, curr) => acc + curr.users, 0).toLocaleString() || "0"} 
            trend="+5.4%" 
            positive={true} 
            icon={<Users className="text-blue-500" />} 
          />
          <StatCard 
            title="Page Views" 
            value={data?.overview?.reduce((acc, curr) => acc + curr.views, 0).toLocaleString() || "0"} 
            trend="-2.1%" 
            positive={false} 
            icon={<Globe className="text-purple-500" />} 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Main Traffic Chart */}
          <div className="xl:col-span-2 bg-zinc-950/50 backdrop-blur-sm border border-zinc-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black font-display tracking-tight mb-1">AUDIENCE TRAFFIC</h3>
                <p className="text-zinc-500 text-sm font-medium">Session distribution over active property lifecycle</p>
              </div>
              <div className="flex gap-2 p-1 bg-zinc-900 rounded-xl">
                 <button className="px-4 py-2 bg-zinc-800 text-xs font-bold rounded-lg text-white">Sessions</button>
                 <button className="px-4 py-2 text-xs font-bold rounded-lg text-zinc-500 hover:text-zinc-300">Views</button>
              </div>
            </div>
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.overview}>
                  <defs>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#3f3f46" 
                    fontSize={10} 
                    fontWeight="700"
                    tickLine={false} 
                    axisLine={false} 
                    dy={20}
                    tickFormatter={(val) => {
                        if (!val) return '';
                        const date = new Date(val.substring(0,4)+'-'+val.substring(4,6)+'-'+val.substring(6,8));
                        return date.toLocaleDateString('en-US', { weekday: 'short' });
                    }}
                  />
                  <YAxis 
                    stroke="#3f3f46" 
                    fontSize={10} 
                    fontWeight="700"
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => val > 1000 ? `${(val/1000).toFixed(1)}k` : val}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', borderRadius: '24px', border: '1px solid #27272a', padding: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                    labelStyle={{ marginBottom: '8px', color: '#71717a' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="#3b82f6" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorVis)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Technology Pie Chart */}
          <div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-900 rounded-[3rem] p-10 shadow-2xl flex flex-col group">
            <h3 className="text-2xl font-black font-display tracking-tight mb-1">TECHNOLOGY</h3>
            <p className="text-zinc-500 text-sm font-medium mb-10">Cross-device classification</p>
            <div className="flex-1 flex flex-col justify-center gap-10">
              <div className="h-[280px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.devices.map(d => ({ name: d.category, value: d.users }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={15}
                      dataKey="value"
                      stroke="none"
                    >
                      {data?.devices.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                   <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest leading-none mb-1">DOMINANCE</p>
                   <p className="text-4xl font-black font-display tracking-tighter">
                      {Math.round((Math.max(...(data?.devices.map(d => d.users) || [0])) / (data?.devices.reduce((a, b) => a + b.users, 0) || 1)) * 100)}%
                   </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {data?.devices.map((device, i) => (
                  <div key={i} className="flex items-center justify-between bg-zinc-900/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-sm font-bold text-zinc-300 capitalize">{device.category}</span>
                    </div>
                    <span className="font-display font-black text-white">{device.users.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Top Pages */}
          <div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-900 rounded-[3rem] p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black font-display tracking-tight">TOP PERFORMING PAGES</h3>
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
                <BarChart3 size={18} className="text-zinc-500" />
              </div>
            </div>
            <div className="space-y-4">
              {data?.pages.map((page, i) => (
                <div key={i} className="group hover:bg-zinc-900/40 p-5 rounded-3xl border border-transparent hover:border-zinc-800/50 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-black text-zinc-300 truncate max-w-[70%]">{page.path}</span>
                    <span className="text-xs font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">{page.views.toLocaleString()} VIEWS</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(page.views / (data?.pages[0]?.views || 1)) * 100}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acquisition Sources */}
          <div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-900 rounded-[3rem] p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black font-display tracking-tight">ACQUISITION CHANNELS</h3>
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
                <Search size={18} className="text-zinc-500" />
              </div>
            </div>
            <div className="overflow-hidden border border-zinc-900 rounded-3xl">
              <table className="w-full text-left">
                <thead className="bg-zinc-900/50 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="py-6 px-8">SOURCE CHANNEL</th>
                    <th className="py-6 px-8">SESSIONS</th>
                    <th className="py-6 px-8 text-right">GROWTH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {data?.sources.map((source, i) => (
                    <tr key={i} className="group hover:bg-zinc-900/30 transition-colors">
                      <td className="py-6 px-8">
                        <span className="text-sm font-bold text-zinc-300 uppercase tracking-tight">{source.source}</span>
                      </td>
                      <td className="py-6 px-8">
                        <span className="text-sm font-black font-display">{source.sessions.toLocaleString()}</span>
                      </td>
                      <td className="py-6 px-8 text-right">
                         <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-green-500 px-3 py-1 rounded-full bg-green-500/10 active:scale-95 transition-transform cursor-pointer">
                            <ArrowUpRight size={12} />
                            STABLE
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, trend, positive, icon }: any) {
  return (
    <div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-900 rounded-[2.5rem] p-8 hover:border-zinc-800 transition-all group overflow-hidden relative shadow-xl">
      <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 group-hover:bg-zinc-800 transition-colors shadow-inner">
               {icon}
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full ${positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
               {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
               {trend}
            </div>
          </div>
          <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</h3>
          <p className="text-4xl font-black font-display tracking-tightest">{value}</p>
      </div>
      <div className={`absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-10 transition-all duration-700 blur-2xl w-40 h-40 rounded-full ${positive ? 'bg-green-500' : 'bg-red-500'}`}></div>
    </div>
  );
}

function RealtimeCard({ activeUsers }: { activeUsers: number }) {
  return (
    <div className="bg-zinc-950 border border-blue-500/30 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-[0_0_80px_-20px_rgba(37,99,235,0.2)]">
      <div className="absolute top-0 right-0 p-6">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></span>
        </span>
      </div>
      <div className="relative z-10">
        <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Omnipresent Activity</h3>
        <p className="text-6xl font-black font-display tracking-tighter mb-4 shadow-blue-500/50">{activeUsers}</p>
        <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                        <User size={12} className="text-zinc-500" />
                    </div>
                ))}
             </div>
             <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Users currently online</span>
        </div>
      </div>
      
      {/* Decorative dynamic bars */}
      <div className="absolute bottom-0 right-0 left-0 h-40 opacity-[0.03] flex items-end justify-between px-4 pb-2 group-hover:opacity-[0.08] transition-opacity duration-700">
        {[1,2,3,4,5,6,12,8,9,1,4,2,6,8,5,10].map((h, i) => (
            <motion.div 
                key={i} 
                className="w-1.5 bg-blue-500 rounded-full"
                animate={{ height: `${h * 10}%` }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 + Math.random() }}
            />
        ))}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-black p-12 space-y-12 animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
            <div className="h-4 w-40 bg-zinc-900 rounded-full"></div>
            <div className="h-12 w-80 bg-zinc-900 rounded-2xl"></div>
        </div>
        <div className="flex gap-4">
            <div className="h-12 w-40 bg-zinc-900 rounded-2xl"></div>
            <div className="h-12 w-40 bg-zinc-900 rounded-2xl"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[1,2,3,4].map(i => (
            <div key={i} className="h-48 bg-zinc-950 border border-zinc-900 rounded-[2.5rem]"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 h-[550px] bg-zinc-950 border border-zinc-900 rounded-[3rem]"></div>
        <div className="h-[550px] bg-zinc-950 border border-zinc-900 rounded-[3rem]"></div>
      </div>
    </div>
  );
}
