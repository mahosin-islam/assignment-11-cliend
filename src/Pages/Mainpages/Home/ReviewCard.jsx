import React from 'react';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const { user_photoURL, review: pasination, userName } = review;

  return (
    <div className="relative my-6 bg-base-100  p-10 max-w-xl rounded-[2.5rem] border border-gray-50 shadow-2xl overflow-hidden group transition-all duration-300">
      
      {/* 1. Mint Green/Teal Large Quote Icon (Top Right) */}
      <div className="absolute top-6 right-8 text-base-content text-7xl md:text-8xl opacity-70 z-0">
      
      </div>

      <div className="relative z-10">
        {/* 2. Star Rating (Yellow/Orange) */}
        <div className="flex gap-1 mb-8 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={24} />
          ))}
        </div>

        {/* 3. Message Text (Large & Bold) */}
        <div className="mb-4">
          <p className="text-base-content   font-medium leading-[1.4] tracking-tight">
            "{pasination}"
          </p>
        </div>

        {/* 4. User Info Section */}
        <div className="flex items-center gap-5 mt-auto">
          {/* Avatar with Teal Ring Border */}
          <div className="w-20  rounded-full p-1 bg-teal-400">
             <div className="w-full h-full rounded-full border-4 border-white overflow-hidden ">
                <img 
                  className="w-full h-full object-cover" 
                  src={user_photoURL || "https://i.ibb.co/v309L9Z/user-placeholder.png"} 
                  alt={userName} 
                />
             </div>
          </div>

          {/* Name and Designation */}
          <div>
            <h3 className="font-extrabold text-base-content text-2xl tracking-tight">
              {userName}
            </h3>
            <p className="text-gray-400 text-lg font-normal">
              Community Member
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;