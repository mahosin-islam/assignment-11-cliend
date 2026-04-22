import React, { use } from "react";
import { TbLayoutNavbarExpand } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContex } from "../../../Providers/AuthContex";
import { LuSettings } from "react-icons/lu";
import { BsHouseAdd } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";
import { TfiShoppingCart } from "react-icons/tfi";
import useRole from "../../../Hooks/useRole";
import Footer from "../../../components/Footer/Footer";
import { MdManageHistory } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaCartPlus, FaMapMarkerAlt, FaUserShield, FaUserTag, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { user } = use(AuthContex);
  const { role } = useRole();

  // Active Link Style Helper
  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
      isActive
        ? "text-indigo-600 font-bold"
        : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* --- MODERN NAVBAR --- */}
          <nav className="navbar w-full bg-base-100  backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 sticky top-0 z-40">
            <div className="flex-1">
              <label
                htmlFor="my-drawer-4"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <TbLayoutNavbarExpand size={24} />
              </label>
              <div className="hidden lg:block text-sm font-medium text-base-content">
                Dashboard / <span className="text-slate-900 font-bold capitalize">{role}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-base-content text-base-content leading-none">{user?.displayName || "User"}</p>
                <p className="text-[10px] font-bold text-indigo-500 uppercase mt-1 tracking-wider">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-full ring-2 ring-indigo-500/20 overflow-hidden border-2 border-white">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt="Profile"
                />
              </div>
            </div>
          </nav>

          {/* --- PAGE CONTENT --- */}
          <main className="flex-1 p-4 md:p-8">
            <Outlet />
          </main>
          
        <h2>this here footer</h2>
        </div>

        {/* --- SIDEBAR DESIGN --- */}
        <div className="drawer-side z-50 ">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          
          <aside className="bg-base-100  border-r border-slate-200  w-72 min-h-full flex flex-col p-6">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 mb-10 px-2 group">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-base-content shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-300">
                <FaShoppingBag size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-base-contain">Garments Hub</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Premium Portal</p>
              </div>
            </Link>

            {/* Menu Items */}
            <ul className="flex flex-col gap-1.5 grow">
              <li>
                <NavLink to="/dashboard" end className={navLinkStyle}>
                  {({ isActive }) => (
                    <>
                      <IoMdHome size={22} className={isActive ? "text-indigo-600" : "group-hover:text-indigo-500"} />
                      <span>Dashboard</span>
                      {isActive && <motion.div layoutId="activeInd" className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 border-r-4 border-indigo-600 rounded-2xl -z-10" />}
                    </>
                  )}
                </NavLink>
              </li>

              {/* Buyer Role */}
              {role === "buyer" && (
                <>
                  <div className="text-[10px] font-bold text-base-content uppercase tracking-widest mt-4 mb-2 ml-4">Shopping</div>
                  <li>
                    <NavLink to="/dashboard/My-order" className={navLinkStyle}>
                      <FaCartPlus size={20} /> My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/Track-Order" className={navLinkStyle}>
                      <FaMapMarkerAlt size={20} /> Track Order
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin Role */}
              {role === "admin" && (
                <>
                  <div className="text-[10px] font-bold text-base-content uppercase tracking-widest mt-4 mb-2 ml-4">Administration</div>
                  <li>
                    <NavLink to="/dashboard/manage-users" className={navLinkStyle}>
                      <FaUserGear size={20} /> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-products" className={navLinkStyle}>
                      <TfiShoppingCart size={20} /> All Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-orders" className={navLinkStyle}>
                      <FaMapMarkerAlt size={20} /> All Orders
                    </NavLink>
                  </li>
                </>
              )}

              {/* Manager Role */}
              {role === "manager" && (
                <>
                  <div className="text-[10px] font-bold text- uppercase tracking-widest mt-4 mb-2 ml-4">Inventory</div>
                  <li>
                    <NavLink to="/dashboard/Manage-Products" className={navLinkStyle}>
                      <MdManageHistory size={20} /> Manage Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/Add-product" className={navLinkStyle}>
                      <BsHouseAdd size={20} /> Add Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/Pending-Orders" className={navLinkStyle}>
                      <FaUserTag size={20} /> Pending Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/Approve-Orders" className={navLinkStyle}>
                      <FaUserShield size={20} /> Approved Orders
                    </NavLink>
                  </li>
                </>
              )}

              {/* Settings Section */}
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                <li>
                  <NavLink to="/dashboard/Myprofile" className={navLinkStyle}>
                    <LuSettings size={20} /> Profile Settings
                  </NavLink>
                </li>
              </div>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;