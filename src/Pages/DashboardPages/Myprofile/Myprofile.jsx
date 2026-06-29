import React, { useContext, useRef, useState, useEffect } from "react";
import {
  FaEnvelope,
  FaUserCog,
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCamera,
} from "react-icons/fa";

import {
  MdLogout,
  MdEdit,
  MdVerified,
  MdWarning,
  MdClose,
} from "react-icons/md";

import { BsClockHistory } from "react-icons/bs";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { AuthContex } from "../../../Providers/AuthContex";
import useRole from "../../../Hooks/useRole";
import useStatus from "../../../Hooks/useStatus";
import useSuspen from "../../../Hooks/useSuspen";

// ---------------- ROLE CONFIG ----------------
const ROLE_CONFIG = {
  admin: {
    style: "bg-violet-100 text-violet-700 ring-violet-200",
    label: "Administrator",
  },

  manager: {
    style: "bg-sky-100 text-sky-700 ring-sky-200",
    label: "Manager",
  },

  buyer: {
    style: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    label: "Premium Buyer",
  },

  rider: {
    style: "bg-amber-100 text-amber-700 ring-amber-200",
    label: "Delivery Partner",
  },
};

// ---------------- STATS ----------------
const STATS_DATA = {
  buyer: [
    {
      label: "Orders",
      value: "24",
      Icon: FaShoppingBag,
      color: "#6366f1",
    },

    {
      label: "Wishlist",
      value: "12",
      Icon: FaHeart,
      color: "#ec4899",
    },

    {
      label: "Reviews",
      value: "8",
      Icon: FaStar,
      color: "#f59e0b",
    },
  ],

  admin: [
    {
      label: "Revenue",
      value: "৳85k",
      Icon: FaMoneyBillWave,
      color: "#10b981",
    },

    {
      label: "Users",
      value: "1.2k",
      Icon: FaUsers,
      color: "#3b82f6",
    },

    {
      label: "Alerts",
      value: "14",
      Icon: FaExclamationTriangle,
      color: "#f43f5e",
    },
  ],

  manager: [
    {
      label: "Teams",
      value: "18",
      Icon: FaUsers,
      color: "#0ea5e9",
    },

    {
      label: "Revenue",
      value: "৳52k",
      Icon: FaMoneyBillWave,
      color: "#14b8a6",
    },

    {
      label: "Reports",
      value: "11",
      Icon: FaStar,
      color: "#f59e0b",
    },
  ],

  rider: [
    {
      label: "Deliveries",
      value: "146",
      Icon: FaShoppingBag,
      color: "#f59e0b",
    },

    {
      label: "Rating",
      value: "4.9",
      Icon: FaStar,
      color: "#10b981",
    },

    {
      label: "Earnings",
      value: "৳12k",
      Icon: FaMoneyBillWave,
      color: "#6366f1",
    },
  ],
};

const Myprofile = () => {
  // ---------------- CONTEXT ----------------
  const { user, setUser, updataUserProfile, creatSingOut } =
    useContext(AuthContex);

  const { role } = useRole();
  const { status } = useStatus();
  const { suspen } = useSuspen();

  const navigate = useNavigate();

  // ---------------- REFS ----------------
  const editModalRef = useRef(null);
  const suspendModalRef = useRef(null);

  // ---------------- STATES ----------------
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    photo: "",
  });

  // ---------------- EFFECT ----------------
  useEffect(() => {
    setEditData({
      name: user?.displayName || "",
      photo: user?.photoURL || "",
    });
  }, [user]);

  // ---------------- UPDATE PROFILE ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updataUserProfile({
        displayName: editData.name,
        photoURL: editData.photo,
      });

      setUser((prev) => ({
        ...prev,
        displayName: editData.name,
        photoURL: editData.photo,
      }));

      toast.success("Profile updated!");

      editModalRef.current?.close();
    } catch (err) {
      toast.error(err?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = async () => {
    try {
      await creatSingOut();

      toast.success("Logged out");

      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Logout failed");
    }
  };

  // ---------------- DATA ----------------
  const stats = STATS_DATA[role] || STATS_DATA.buyer;

  const isSuspended = status === "suspend";

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="relative bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="h-40 bg-gradient-to-br from-pink-600 via-pink-700 to-fuchsia-600"></div>

          <div className="px-8 pb-10">
            <div className="relative -mt-16 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${
                      user?.displayName || "User"
                    }`
                  }
                  className="w-36 h-36 rounded-3xl object-cover border-[6px] border-white shadow-2xl bg-slate-100"
                  alt="Avatar"
                />

                <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></span>
              </div>

              {/* INFO */}
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-extrabold flex items-center justify-center md:justify-start gap-2 tracking-tight">
                  {user?.displayName || "Unknown User"}

                  <MdVerified className="text-indigo-500" />
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${
                      ROLE_CONFIG[role]?.style || "bg-slate-100"
                    }`}
                  >
                    {ROLE_CONFIG[role]?.label || role || "User"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${
                      isSuspended
                        ? "bg-red-100 text-red-600 ring-red-200"
                        : "bg-emerald-100 text-emerald-600 ring-emerald-200"
                    }`}
                  >
                    {status || "active"}
                  </span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => editModalRef.current?.showModal()}
                  className="btn btn-primary bg-indigo-600 border-none rounded-2xl hover:bg-indigo-700 shadow-lg text-white shadow-indigo-200 capitalize"
                >
                  <MdEdit size={18} />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-2xl"
                >
                  <MdLogout size={20} />
                </button>
              </div>
            </div>

            {/* ACCOUNT INFO */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-500">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold">
                    {user?.email || "No Email"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-violet-500">
                  <FaUserCog />
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Account Type
                  </p>

                  <p className="text-sm font-semibold uppercase">
                    {role || "user"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats?.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: `${s.color}15`,
                  color: s.color,
                }}
              >
                <s.Icon size={22} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                {s.label}
              </p>
              <p className="text-3xl font-black mt-1 tracking-tight">
                {s.value}
              </p>
            </div>
          ))}
        </div>
        {/* SUSPEND ALERT */}
        {isSuspended && (
          <div className="bg-red-50 border border-red-100 p-5 rounded-[2rem] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center animate-pulse">
                <MdWarning size={24} />
              </div>
              <div>
                <h4 className="font-bold text-red-900">
                  Account Suspended
                </h4>
                <p className="text-sm text-red-700/80">
                  Please check the reason for restriction.
                </p>
              </div>
            </div>
            <button
              onClick={() => suspendModalRef.current?.showModal()}
              className="btn btn-sm btn-error text-white rounded-xl px-6"
            >
              Details
            </button>
          </div>
        )}
      </div>
      {/* EDIT MODAL */}
      <dialog ref={editModalRef} className="modal backdrop-blur-md">
        <div className="modal-box bg-white rounded-[2.5rem] p-0 overflow-hidden max-w-md border-none shadow-2xl">
          <div className="bg-indigo-600 p-8 text-white relative">
            <h3 className="text-2xl font-black">Edit Profile</h3>
            <p className="text-indigo-100 text-sm opacity-80">
              Update your public information
            </p>
            <button
              onClick={() => editModalRef.current?.close()}
              className="absolute top-6 right-6 hover:rotate-90 transition-transform"
            >
              <MdClose size={24} />
            </button>
          </div>
          <form onSubmit={handleUpdate} className="p-8 space-y-5">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <img
                  src={
                    editData.photo ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  className="w-24 h-24 rounded-[2rem] object-cover border-4 border-slate-100 shadow-lg"
                  alt="Preview"
                />
                <div className="absolute inset-0 bg-black/40 rounded-[2rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <FaCamera size={20} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-2 tracking-widest">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      name: e.target.value,
                    })
                  }
                  className="input w-full bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500/20 font-semibold"
                  required
                />
              </div>
              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-2 tracking-widest">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={editData.photo}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      photo: e.target.value,
                    })
                  }
                  className="input w-full bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500/20 font-semibold"
                  required
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="btn btn-primary w-full h-14 bg-indigo-600 border-none rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 text-white mt-4"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </dialog>

      {/* SUSPEND MODAL */}
      <dialog ref={suspendModalRef} className="modal backdrop-blur-md">
        <div className="modal-box bg-white rounded-[2.5rem] p-8 max-w-sm border-none shadow-2xl text-center">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle size={32} />
          </div>

          <h3 className="text-2xl font-black text-slate-900">
            {suspen?.Title || "Restricted"}
          </h3>

          <div className="my-6 p-4 bg-slate-50 rounded-2xl italic text-slate-600 border border-slate-100">
            "{suspen?.Reson || "No reason provided"}"
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8">
            <BsClockHistory />

            {suspen?.Time
              ? new Date(suspen.Time).toLocaleString()
              : "No date available"}
          </div>

          <form method="dialog">
            <button className="btn btn-ghost w-full bg-slate-100 rounded-2xl font-bold">
              Close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Myprofile;