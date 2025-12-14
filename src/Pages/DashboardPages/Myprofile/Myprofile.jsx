// MyProfile.jsx
import React, { use, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaUserCog,
} from "react-icons/fa";
import { AuthContex } from "../../../Providers/AuthContex";
import useRole from "../../../Hooks/useRole";
import useStatus from "../../../Hooks/useStatus";
import useSuspen from "../../../Hooks/useSuspen";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";

const Myprofile = () => {
  const riderModelRef = useRef();
  const { user, creatSingOut } = use(AuthContex);
  const { role } = useRole();
  const { status } = useStatus();
  const { suspen } = useSuspen();

  const handelShowModel = () => {
    riderModelRef.current.showModal();
  };

  const navigate = useNavigate();
  const handelLogOut = () => {
    creatSingOut()
      .then(() => {
        toast("successful logout");
        navigate("/");
      })

      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className=" shadow-lg rounded-2xl w-full max-w-3xl p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div>
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <button className="mt-4 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center gap-2 transition">
              <FaEdit /> Edit Profile
            </button>
            <button 
            className="my-4 btn "
            onClick={handelLogOut}>Logout 
            <MdLogout />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-500">
              {user?.displayName}
            </h2>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <FaEnvelope className="text-indigo-500" /> {user?.email}
            </p>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <FaUserCog className="text-indigo-500" />
              Role {role}
            </p>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-500" />
              Status {status}
            </p>
            <div>
              {status == "suspend" ? (
                <button
                  onClick={handelShowModel}
                  className="mt-4 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center gap-2 transition"
                >
                  Suspen-Reson
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <h3 className="text-xl font-semibold text-indigo-600">Orders</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">24</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <h3 className="text-xl font-semibold text-indigo-600">Wishlist</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">12</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <h3 className="text-xl font-semibold text-indigo-600">Reviews</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">8</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-500 mb-4">
            About Me
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Hello! I'm Mahosin, a passionate web developer from Dhaka,
            Bangladesh. I love creating beautiful and responsive web
            applications using React, Tailwind CSS, and modern technologies.
            Always open to learning new things and improving my skills.
          </p>
        </div>
        {/* model */}

        <dialog
          ref={riderModelRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h2>{suspen.Title}</h2>
            <h2>{suspen.Reson}</h2>
            <h2>{new Date(suspen.Time).toLocaleString()}</h2>

            <div className="modal-action">
              <form method="dialog">
                {/* close modarl */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* end */}
      </div>
    </div>
  );
};

export default Myprofile;
