'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Globe, 
  Smartphone, 
  LogOut, 
  Activity,
  Layers,
  LayoutDashboard,
  Bell,
  User,
  Menu,
  X,
  Settings,
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active: boolean;
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link href={href}>
      <button className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
        active 
          ? 'bg-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)]' 
          : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
      }`}>
        <div className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-white/20' : 'group-hover:bg-zinc-800'}`}>
          {icon}
        </div>
        <span className="font-semibold text-sm tracking-wide">{label}</span>
      </button>
    </Link>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // In a real app, you'd call an API to clear the cookie
    // But for now, we'll just redirect and let the next request hit the middleware
    await fetch('/api/auth/logout', { method: 'POST' }); // I'll create this route next
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black text-white font-body">
      {/* Sidebar - Desktop */}
      <aside className={`fixed left-0 top-0 bottom-0 bg-zinc-950 border-r border-zinc-900 flex flex-col z-[60] transition-all duration-500 ease-in-out ${
        isSidebarOpen ? 'w-72' : 'w-24'
      } hidden lg:flex`}>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-14">
            <div className={`w-12 h-12 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-2xl font-display shadow-lg transition-transform duration-500 ${!isSidebarOpen && 'scale-90'}`}>
               S
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display font-black text-xl tracking-tighter"
              >
                SOLUTION SQUAD
              </motion.span>
            )}
          </div>

          <nav className="space-y-2">
            <SidebarItem 
               icon={<LayoutDashboard size={20} />} 
               label={isSidebarOpen ? "Overview" : ""} 
               href="/admin" 
               active={pathname === '/admin'} 
            />
            <SidebarItem 
               icon={<Activity size={20} />} 
               label={isSidebarOpen ? "Real-time" : ""} 
               href="/admin/realtime" 
               active={pathname === '/admin/realtime'} 
            />
            <SidebarItem 
               icon={<Users size={20} />} 
               label={isSidebarOpen ? "Audience" : ""} 
               href="/admin/audience" 
               active={pathname === '/admin/audience'} 
            />
            <SidebarItem 
               icon={<Globe size={20} />} 
               label={isSidebarOpen ? "Acquisition" : ""} 
               href="/admin/acquisition" 
               active={pathname === '/admin/acquisition'} 
            />
            <SidebarItem 
               icon={<Layers size={20} />} 
               label={isSidebarOpen ? "Conversions" : ""} 
               href="/admin/conversions" 
               active={pathname === '/admin/conversions'} 
            />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-zinc-900/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 text-zinc-500 hover:text-red-400 transition-all duration-300 w-full px-5 py-4 rounded-2xl hover:bg-red-500/10 group"
          >
            <div className="p-1.5 rounded-lg group-hover:bg-red-500/20">
              <LogOut size={20} />
            </div>
            {isSidebarOpen && <span className="font-semibold text-sm">Logout Session</span>}
          </button>
        </div>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-10 w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-xl z-[70]"
        >
          <ChevronRight size={14} className={`transition-transform duration-500 ${isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-500 ease-in-out min-h-screen ${
        isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24'
      }`}>
        {/* Top Navbar */}
        <header className="sticky top-0 h-24 bg-black/60 backdrop-blur-xl border-b border-zinc-900 px-8 flex items-center justify-between z-50">
          <div className="flex items-center gap-4">
            <button className="lg:hidden w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
               <Menu size={20} />
            </button>
            <div className="hidden md:block">
               <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-0.5">Control Center</h2>
               <p className="text-white font-bold tracking-tight">Solution Squad Digital Identity</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full text-xs font-medium text-zinc-400">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               System Online
            </div>
            
            <div className="flex items-center gap-4">
               <button className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-800 transition-colors relative group">
                  <Bell size={18} className="text-zinc-400 group-hover:text-white" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-zinc-900"></span>
               </button>
               <div className="h-8 w-[1px] bg-zinc-900 mx-2"></div>
               <div className="flex items-center gap-3">
                  <div className="text-right hidden md:block">
                     <p className="text-sm font-bold leading-none mb-1">Zubaer Islam</p>
                     <p className="text-[10px] uppercase font-black text-blue-500 tracking-widest">Master Admin</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden p-0.5">
                     <div className="w-full h-full bg-zinc-950 rounded-[0.8rem] flex items-center justify-center">
                        <User size={22} className="text-blue-500" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 lg:p-12">
           {children}
        </div>
      </main>
    </div>
  );
}
