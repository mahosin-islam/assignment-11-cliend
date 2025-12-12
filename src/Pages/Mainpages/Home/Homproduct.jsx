import React from "react";
import Container from "../../../components/Shavre/Container";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Extra/Loading";
import AllCard from "../AllProducts/AllCard";

const Homproduct = () => {
  const axiosSicure = useAxiosSicures();
  const { isLoading, data: product = [] } = useQuery({
    queryKey: ["latest"],
    queryFn: async () => {
  
      const res = await axiosSicure.get('/Latest-porduct/true');
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="">
      <div className="pt-2 text-center  ">
        <h2 className="text-4xl font-bold">Explore Our Stylish Garments</h2>
        <p>
          Discover our latest collection of stylish and comfortable garments,
          crafted for every occasion. Browse, choose, and place your order
          effortlessly to elevate your wardrobe today
        </p>
      </div>
      <div className="pt-6 grid grid-cols-1  md:grid-cols-3  gap-8 2xs:bg-red-500 2xs:bg-red-500 mx-10">
        {product.map((card) => (
          <AllCard key={card._id} card={card}></AllCard>
        ))}
      </div>
    </div>
  );
};

export default Homproduct;
