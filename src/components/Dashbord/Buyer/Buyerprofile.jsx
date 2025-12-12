import React, { use } from "react";
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

const Buyerprofile = () => {
  const { user } = use(AuthContex);
  const { role } = useRole();
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 md:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">
                {user?.displayName}
              </h2>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <FaEnvelope className="text-indigo-500" /> {user?.email}
              </p>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <FaUserCog className="text-indigo-500" /> {role}
              </p>
              {/* <p className="text-gray-500 mt-1 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-indigo-500" /> {user.address}
                        </p> */}
              <button className="mt-4 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center gap-2 transition">
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <h3 className="text-xl font-semibold text-indigo-600">Orders</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">24</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <h3 className="text-xl font-semibold text-indigo-600">
                Wishlist
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">12</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <h3 className="text-xl font-semibold text-indigo-600">Reviews</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">8</p>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              About Me
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hello! I'm Mahosin, a passionate web developer from Dhaka,
              Bangladesh. I love creating beautiful and responsive web
              applications using React, Tailwind CSS, and modern technologies.
              Always open to learning new things and improving my skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyerprofile;
