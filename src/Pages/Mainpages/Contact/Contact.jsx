import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const Contact = () => {
  return (
    <div className="m-10 p-5  rounded-2xl min-h-100">
      <div className="my-2">
        <h2 className="text-4xl  font-semibold">Let’s Connect</h2>
      </div>
      <div>
        <section class=" my-4 px-4 md:px-10">
          <div class=" mx-auto  ">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <div class="p-6 border rounded-2xl  border-gray-300">
                <div class="text-red-400 text-4xl mb-4">
                  <MdOutlineMarkEmailUnread />
                </div>
                <h3 class=" font-semibold text-3xl mb-2">Email</h3>
                <p class="text-gray-600 text-sm">
                  mahosin@gmail.com
                </p>
              </div>

              <div class="p-6 border rounded-2xl border-gray-200">
                <div class="text-red-400 text-4xl mb-4">
                  <FiPhoneCall />
                </div>
                 <h3 class=" font-semibold text-3xl mb-2">Phone</h3>
                <p class="text-gray-600 text-sm">
                  08+01334657
                </p>
              </div>

              <div class="p-6 border rounded-2xl border-gray-200">
                <div class="text-red-400 text-4xl mb-4">
                  <FaMapMarkerAlt />
                </div>
                <h3 class="font-semibold text-3xl mb-2">Our Location</h3>
                <p class="text-gray-600 text-sm">
                 Bangladesh,barisha,bargun sador
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* conscat-form */}
      <div>
        <div className=" flex-col flex justify-between  md:flex-row ">
          <div className="text-center  md:w-1/2 flex-1  rounded-2xl">
            <img
              className="w-full  rounded-2xl"
              src="
               https://i.ibb.co.com/3mBkGpFL/images-17.jpg"
              alt=""
            />
          </div>

          <div className="card md:w-1/2">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="you name"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <textarea
                  rows="5"
                  cols="4"
                
                  placeholder="Write your message"
                ></textarea>

                <button className="btn w-50 rounded-2xl bg-[#c7a07e] py-2 mt-4">
                  Send message
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
