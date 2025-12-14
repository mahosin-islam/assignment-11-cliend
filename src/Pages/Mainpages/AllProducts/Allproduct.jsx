import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import AllCard from "./AllCard";
import Loading from "../../../Extra/Loading";

const Allproduct = () => {
  const axiosSicure = useAxiosSicures();
  const limit = 6;
const [currentpage, setCurrentpage] = useState(0);

const { isLoading, data } = useQuery({
  queryKey: ["products", currentpage],
  queryFn: async () => {
    const res = await axiosSicure.get(
      `/All-pagination?limit=${limit}&skip=${currentpage * limit}`
    );
    return res.data;
  },
});

if (isLoading) return <Loading />;

const product= data?.result || [];
const total = data?.total || 0;
const totalpage = Math.ceil(total / limit);


  return (
    <div>
     
      <div className="pt-12 grid grid-cols-1  md:grid-cols-3  gap-8 2xs:bg-red-500 2xs:bg-red-500 mx-10">
        {Array.isArray(product) &&
          product.map((card) => <AllCard key={card._id} card={card}></AllCard>)}
      </div>
      <div className="flex gap-4 my-10 justify-end">
        {
          currentpage >0 &&<button className="btn"
        onClick={()=>setCurrentpage(currentpage - 1)}
        >prev</button>
        }
        
        {
          [...Array(totalpage).keys()].map(i=><button 
          onClick={()=>setCurrentpage(i)}
          className={`btn ${i===currentpage && "btn-primary"}`}>
            {i + 1}
          </button>)
        }
{  totalpage > currentpage + 1 &&
 <button 
         onClick={()=>setCurrentpage(currentpage + 1 )}
         className="btn">Next</button>
}

        
      </div>
    </div>
  );
};

export default Allproduct;
