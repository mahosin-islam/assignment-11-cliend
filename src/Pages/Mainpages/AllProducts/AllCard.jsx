import React from "react";
import { Link } from "react-router";

const AllCard = ({ card }) => {
  const { ProductName, Images,_id, quantity, price, Category } = card;
  return (
   <Link to={`/Dtails/${_id}`}>
   
    <div>
      <div className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl ">
        <div className="flex flex-col gap-2 w-full ">
          <div
            className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
            
              rounded-xl
            "
          >
            <img
              referrerPolicy="no-referrer"
              className="
                p-4
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
              src={Images}
              alt="card Image"
            />
            <div
              className="
              absolute
              top-3
              right-3
            "
            ></div>
          </div>
          <div className="font-semibold text-lg ">{ProductName}</div>
          <div className="font-semibold  text-gray-500 text-base">Category:{Category}</div>
          <div className="font-semibold text-gray-500 text-base">Quantity: {quantity}</div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold text-gray-500 text-base"> Price: {price}$</div>
          </div>
          <button className="btn btn-primary w-full">view dtails</button>
        </div>
      </div>
    </div>
   </Link>
  );
};

export default AllCard;
