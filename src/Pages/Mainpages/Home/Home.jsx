import React, {} from "react";

import Homproduct from "./Homproduct";

import HeroBanner from "../../../components/Homerileted/Herobanar.jsx/Herobanr";
import Giods from "./Giods";
import Review from "./Review";

import Resposer from "./Resposer";

const Home = () => {
 
  
  return (
     <div className="md:mt-20">
    
       <HeroBanner></HeroBanner>
       <div className="">
          <Homproduct></Homproduct>
       </div>
       <Review></Review>
       <Giods></Giods>
       <Resposer></Resposer>
     </div>
      
  );
};

export default Home;
