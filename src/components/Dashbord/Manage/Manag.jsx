import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  PlusCircle, Package, ShoppingCart, CheckCircle, 
  Clock, DollarSign, List, BarChart3, XCircle 
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import { AuthContex } from '../../../Providers/AuthContex';
import { Link } from 'react-router';
import useAxiosSicures from '../../../Hooks/useAxiosSicure';

const Manag = () => {
  const { user } = use(AuthContex);
  const axiosSecure = useAxiosSicures();

  const { data: managerStats, isLoading } = useQuery({
    queryKey: ['manager-stats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-stats/${user?.email}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="min-h-screen flex justify-center items-center bg-base-100"><span className="loading loading-spinner text-primary"></span></div>;

  const pieData = [
    { name: 'Approved', value: managerStats?.approvedOrders || 0, color: '#2dd4bf' }, // Secondary (Teal)
    { name: 'Pending', value: managerStats?.pendingOrders || 0, color: '#38bdf8' },  // Accent (Sky Blue)
    { name: 'Rejected', value: managerStats?.rejectedOrders || 0, color: '#f87171' }, // Error Red
  ].filter(d => d.value > 0);

  return (
    <div className="p-6 bg-base-200 min-h-screen space-y-8">
      
      {/* Header - Using base-100 and primary text */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-black text-base-content">Manager Dashboard</h1>
          <p className="text-base-content/60 font-medium">Overview of your garment business metrics.</p>
        </div>
        <Link 
          to="/dashboard/add-product" 
          className="bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          <PlusCircle size={20} /> Add New Product
        </Link>
      </div>

      {/* Stats Grid - Using MStatCard with theme variables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MStatCard label="My Products" value={managerStats?.totalProducts} icon={<Package />} color="text-primary" />
        <MStatCard label="Approved" value={managerStats?.approvedOrders} icon={<CheckCircle />} color="text-secondary" />
        <MStatCard label="Pending" value={managerStats?.pendingOrders} icon={<Clock />} color="text-accent" />
        <MStatCard label="Rejected" value={managerStats?.rejectedOrders} icon={<XCircle />} color="text-error" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Fulfillment Chart Section */}
        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-base-content">
            <BarChart3 size={20} className="text-secondary" /> Order Fulfillment
          </h3>
          <div className="h-[280px]">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)', borderRadius: '12px', border: '1px solid var(--color-base-300)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-base-content/40 italic">No Data Available</div>
            )}
          </div>
        </div>

        {/* Revenue Section - Using Gradient accent based on theme */}
        <div className="lg:col-span-2 bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm flex flex-col justify-center items-center text-center space-y-6 transition-colors duration-300">
           <div className="p-6 bg-base-200 rounded-full text-primary shadow-inner">
              <DollarSign size={48} />
           </div>
           <div>
              <p className="text-base-content/50 font-bold uppercase tracking-widest text-sm">Total Revenue</p>
              <h2 className="text-5xl font-black text-primary mt-2">
                {managerStats?.totalRevenue?.toLocaleString() || 0} <span className="text-xl">BDT</span>
              </h2>
           </div>
           <div className="w-full h-[2px] bg-base-300 border-dashed border-t"></div>
           <p className="text-base-content/70 text-sm font-medium">Keep up the good work! Your garment collection is performing well.</p>
        </div>
      </div>
    </div>
  );
};

const MStatCard = ({ label, value, icon, color }) => (
  <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm flex items-center gap-5 transition-all hover:border-primary group">
    <div className={`p-4 rounded-2xl bg-base-200 ${color} group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest">{label}</p>
      <h3 className="text-2xl font-black text-base-content">{value || 0}</h3>
    </div>
  </div>
);

export default Manag;