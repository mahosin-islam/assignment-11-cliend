import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';



const ReviewCard = ({review}) => {
    const {user_photoURL,review:pasination,userName}=review;
  
    return (
       <div className=" my-4 bg-white  shadow-xl  p-8 max-w-xl border border-gray-100">
      {/* Quote Icon */}
      <div className="text-teal-300 text-5xl mb-3">
  <FaQuoteLeft></FaQuoteLeft>

      </div>

      {/* Message */}
      <p className="text-gray-600 leading-relaxed mb-6">
      {pasination}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* User Info */}
      <div className="flex items-center gap-8">
        {/* Avatar Circle */}
        <div className="w-12 h-12 rounded-full">
            <img className='rounded-full' src={user_photoURL} alt="" />
        </div>

        {/* Name + Role */}
        <div>
          <h3 className="font-bold text-lg">{userName}</h3>
          <p className="text-gray-500 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;