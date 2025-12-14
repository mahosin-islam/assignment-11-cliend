import React, { use } from "react";

import Homproduct from "./Homproduct";

import HeroBanner from "../../../components/Homerileted/Herobanar.jsx/Herobanr";
import Giods from "./Giods";
import Review from "./Review";
import { AuthContex } from "../../../Providers/AuthContex";
import Resposer from "./Resposer";

const Home = () => {
  const {user}=use(AuthContex)
  console.log(user)
  return (
     <div className="md:mt-20">
    
       <HeroBanner></HeroBanner>
       <div className="">
          <Homproduct></Homproduct>
       </div>
       <Giods></Giods>
       <Review></Review>
       <Resposer></Resposer>
     </div>
      
  );
};

export default Home;
