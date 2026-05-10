import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, ShoppingBag, Package, DollarSign, 
  AlertTriangle, ArrowUpRight, UserCheck, Activity 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Link } from 'react-router'; 
import useAxiosSicures from '../../../Hooks/useAxiosSicure';

const Admin = () => {
  const axiosSecure = useAxiosSicures();

  const { data: adminStats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  });

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <span className="loading loading-bars loading-lg text-secondary"></span>
    </div>
  );

  const chartData = [
    { name: 'Admins', value: adminStats?.userDistribution?.admin || 0, color: '#8b5cf6' },
    { name: 'Managers', value: adminStats?.userDistribution?.manager || 0, color: '#ec4899' },
    { name: 'Buyers', value: adminStats?.userDistribution?.buyer || 0, color: '#3b82f6' },
  ];

  return (
    // bg-base-100 লাইট মোডে সাদা থাকবে, ডার্ক মোডে অটো নেভি ডার্ক হবে
    <div className="p-4 md:p-8 bg-base-100 min-h-screen space-y-8 transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content">Admin Insights</h1>
          <p className="font-medium">Monitoring your garment ecosystem in real-time.</p>
        </div>
        <div className="bg-base-100 dark:bg-base-200 px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-gray-600 dark:text-gray-300">System Live</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard label="Total Revenue" value={`${adminStats?.totalRevenue?.toLocaleString()} BDT`} icon={<DollarSign />} color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-50 dark:bg-emerald-900/20" />
        <AdminStatCard label="Platform Users" value={adminStats?.totalUsers} icon={<Users />} color="text-violet-600 dark:text-violet-400" bg="bg-violet-50 dark:bg-violet-900/20" />
        <AdminStatCard label="Live Products" value={adminStats?.totalProducts} icon={<Package />} color="text-pink-600 dark:text-pink-400" bg="bg-pink-50 dark:bg-pink-900/20" />
        <AdminStatCard label="Total Orders" value={adminStats?.totalOrders} icon={<ShoppingBag />} color="text-blue-600 dark:text-blue-400" bg="bg-blue-50 dark:bg-blue-900/20" />
      </div>

      {/* Critical Action Bar - Pink Gradient */}
      {adminStats?.pendingUsers > 0 && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4 rounded-2xl shadow-lg  flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2  rounded-lg"><AlertTriangle /></div>
            <p className="font-bold text-white">Attention Needed: {adminStats.pendingUsers} users are waiting for your approval!</p>
          </div>
          <Link to="/dashboard/manage-users" className="bg-base-100 text-pink-600 px-6 py-2 rounded-xl font-black text-sm hover:scale-105 transition-all uppercase shadow-md">
            Review Now
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Distribution Chart */}
        <div className="lg:col-span-2 bg-base-100 p-6 rounded-3xl shadow-sm border border-gray-100 ">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-base-content">
              <Activity className="text-violet-500" /> User Distribution
            </h3>
            <span className="text-xs font-bold text-gray-400 bg-gray-50 dark:bg-base-300 px-3 py-1 rounded-full uppercase tracking-widest">Across Roles</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', backgroundColor: 'var(--color-base-100)'}} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Summary / Status */}
        <div className="bg-base-100 dark:bg-base-200 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-base-content">
            <UserCheck className="text-emerald-500" /> System Health
          </h3>
          
          <div className="space-y-6">
            <StatusItem label="Pending Orders" value={adminStats?.pendingOrders} color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" />
            <StatusItem label="Active Managers" value={adminStats?.userDistribution?.manager} color="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400" />
            <StatusItem label="Registered Buyers" value={adminStats?.userDistribution?.buyer} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="mt-8 bg-base-100 dark:bg-base-300 p-4 rounded-2xl border border-dashed border-gray-200 ">
             <p className="text-xs leading-relaxed italic">
               "Administrator, you have full control over the garment marketplace ecosystem."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Status Item
const StatusItem = ({ label, value, color }) => (
  <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4 last:border-0">
    <span className=" font-medium">{label}</span>
    <span className={`${color} px-3 py-1 rounded-lg font-bold`}>{value}</span>
  </div>
);

// Sub-component for Admin Stats
const AdminStatCard = ({ label, value, icon, color, bg }) => (
  <div className="bg-base-100 dark:bg-base-200 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 transition-all hover:shadow-md hover:border-pink-500 group">
    <div className={`p-4 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-xs font-bold  uppercase tracking-widest">{label}</p>
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-black ">{value}</h3>
        <ArrowUpRight className="text-emerald-500" size={16} />
      </div>
    </div>
  </div>
);

export default Admin;