import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import AllCard from "./AllCard";
import Loading from "../../../Extra/Loading";


const Allproduct = () => {
  const axiosSicure = useAxiosSicures();
  const {isLoading, data: product = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSicure.get("/product");
      return res.data;
    },
  });
  if(isLoading){
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2>Allpages {product.length}</h2>
      <div className="pt-12 grid grid-cols-1  md:grid-cols-3  gap-8 2xs:bg-red-500 2xs:bg-red-500 mx-10">
        {Array.isArray(product) &&
          product.map((card) =><AllCard key={card._id}  card={card}>
           
          </AllCard>
        
          )}
      </div>
    </div>
  );
};

export default Allproduct;
