import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen pt-5 pb-10 px-4 md:px-10 bg-base-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight">
            Let’s <span className="text-pink-500">Connect</span>
          </h2>
          <p className="text-base-content/70 max-w-lg mx-auto">
            Have a question or a project in mind? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          
          {/* Left Side: Contact Information */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="p-8 bg-pink-500 rounded-3xl text-white shadow-xl shadow-pink-500/20">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <p className="font-medium text-lg">Dhaka, Bangladesh</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                    <FaEnvelope size={20} />
                  </div>
                  <p className="font-medium text-lg">support@garments.com</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                    <FaPhoneAlt size={20} />
                  </div>
                  <p className="font-medium text-lg">+880 1234 567 890</p>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="mt-10 pt-10 border-t border-white/20">
                <p className="text-sm opacity-80">Follow us on social media for latest updates.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full md:w-2/3 bg-base-200/50 backdrop-blur-lg border border-base-300 p-8 md:p-12 rounded-3xl shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-semibold text-base-content/80">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full bg-base-100 focus:border-pink-500 transition-all rounded-xl p-6"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold text-base-content/80">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="input input-bordered w-full bg-base-100 focus:border-pink-500 transition-all rounded-xl p-6"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-base-content/80">Your Message</label>
                <textarea
                  rows="5"
                  className="textarea textarea-bordered w-full bg-base-100 focus:border-pink-500 transition-all rounded-xl p-4 text-base"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button className="btn btn-lg bg-pink-500 hover:bg-pink-600 border-none text-white w-full md:w-auto px-10 rounded-xl flex items-center gap-2 transition-transform active:scale-95">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;