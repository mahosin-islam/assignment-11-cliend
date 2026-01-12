import React from "react";

import Homproduct from "./Homproduct";

import Review from "./Review";

import Hero from "./Hero";
import { SparklesPreview } from "../../../components/BackgoruAnimaiton/SparklesPreview";
import HomeFeatureSection from "./HomeFeatureSection";

import BuyerShowcase from "./BuyerShowcase";

const Home = () => {
  return (
    <div className="md:mt-10 bg-base-100">
      {/* <HeroBanner></HeroBanner> */}
      <Hero></Hero>
      <div className="">
        <Homproduct></Homproduct>
      </div>
      <BuyerShowcase></BuyerShowcase>

      <div>
        <h2 className="text-2xl py-3 font-semibold">
          Modern Fashion, Delivered to Your Doorstep
        </h2>
        <SparklesPreview></SparklesPreview>
      </div>

      <HomeFeatureSection></HomeFeatureSection>
      <Review></Review>
    </div>
  );
};

export default Home;
