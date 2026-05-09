import React, { use } from 'react';
import { AuthContex } from '../../../Providers/AuthContex';
import { useQuery } from '@tanstack/react-query';

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { ShoppingBag, CheckCircle, Clock, XCircle, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import useAxiosSicures from '../../../Hooks/useAxiosSicure';

const Buyers = () => {
  const { user } = use(AuthContex);
  const axiosSecure = useAxiosSicures();

  const { data: buyerData, isLoading } = useQuery({
    queryKey: ['buyer-stats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer-stats/${user?.email}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-pink-600"></span></div>;

  const summary = buyerData?.summary || {};
  const recentOrders = buyerData?.recentOrders || [];

  // চার্টের জন্য ডেটা ফরম্যাট করা (কবে কবে অর্ডার হয়েছে)
  const chartData = recentOrders.map(order => ({
    date: new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    amount: order.Price
  })).reverse();

  return (
    <div className="p-4 md:p-8 bg-base-100 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold ">My Dashboard</h1>
          <p className=" mt-1">Track your garment orders and shopping activity.</p>
        </div>
        <div className="flex items-center gap-3 bg-base-100 p-3 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-right">
            <p className="text-xs uppercase font-bold tracking-wider">Wallet Spent</p>
            <p className="text-lg font-black text-pink-600">{summary.totalSpent?.toLocaleString()} BDT</p>
          </div>
          <div className="p-3 bg-base-100 rounded-xl text-pink-600">
            <CreditCard size={24} />
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value={summary.totalOrders} icon={<ShoppingBag />} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="Approved" value={summary.approvedOrders} icon={<CheckCircle />} color="text-green-600" bg="bg-green-50" />
        <StatCard label="Pending" value={summary.pendingOrders} icon={<Clock />} color="text-orange-600" bg="bg-orange-50" />
        <StatCard label="Rejected" value={summary.totalOrders - (summary.approvedOrders + summary.pendingOrders)} icon={<XCircle />} color="text-red-600" bg="bg-red-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order History Map (Chart) */}
        <div className="lg:col-span-2 bg-base-100 p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 ">Shopping Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Recent Activity */}
        <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Recent Items</h3>
          <div className="space-y-4">
            {recentOrders.slice(0, 4).map((order) => (
              <div key={order._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                <img src={order.photo} alt={order.ProductName} className="w-12 h-12 rounded-xl object-cover border border-gray-100" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">{order.ProductName}</h4>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                  order.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                  order.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-pink-600 bg-base-100 rounded-xl hover:bg-pink-100 transition-colors">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Stats
const StatCard = ({ label, value, icon, color, bg }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-base-100 p-6 rounded-3xl shadow-sm border  flex items-center gap-5"
  >
    <div className={`p-4 rounded-2xl ${bg} ${color}`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-sm font-medium uppercase tracking-wide">{label}</p>
      <h3 className="text-2xl font-black ">{value}</h3>
    </div>
  </motion.div>
);

export default Buyers;