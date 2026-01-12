import React from "react";
import { Link } from "react-router";

const AllCard = ({ card }) => {
  const { ProductName, Images,_id, quantity, price, Category, Discount } = card;
  return (
   <Link to={`/Dtails/${_id}`}>
   
<div className="col-span-1 cursor-pointer">
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-3 group">
    {/* Image */}
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
      <img
        referrerPolicy="no-referrer"
        src={Images}
        alt="product"
        className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
      />

      {/* Discount Badge */}
      <span className={`${Discount && "absolute top-3 left-5 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded"}`}>
        {/* -{ Discount}% */}
            -{Discount
            }%
      </span>
    </div>

    {/* Content */}
    <div className="mt-3 space-y-1">
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
        {ProductName}
      </h3>

      <p className="text-xs text-gray-500">
        Category: {Category}
      </p>

      {/* Price */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-bold text-orange-600">
          ৳{Number((price - (price * Discount / 100)).toFixed(2))}
        </span>
        <span className="text-sm text-gray-400 line-through">
          {
            Discount &&
               price 
            }
          
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-400 text-sm">
        ★★★★☆
        <span className="text-gray-500 text-xs">(3)</span>
      </div>

      {/* Quantity */}
      <p className="text-xs text-gray-500">
        Stock: {quantity}
      </p>
    </div>
  </div>
</div>
   </Link>
  );
};

export default AllCard;
