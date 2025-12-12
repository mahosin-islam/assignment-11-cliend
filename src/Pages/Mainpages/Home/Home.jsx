import React, { use } from "react";

import Homproduct from "./Homproduct";

import HeroBanner from "../../../components/Homerileted/Herobanar.jsx/Herobanr";
import Giods from "./Giods";
import Review from "./Review";
import { AuthContex } from "../../../Providers/AuthContex";

const Home = () => {
  const {user}=use(AuthContex)
  console.log(user)
  return (
     <div>
    
       <HeroBanner></HeroBanner>
       <div className="">
          <Homproduct></Homproduct>
       </div>
       <Giods></Giods>
       <Review></Review>
     </div>
      
  );
};

export default Home;
