import React from "react";

import Homproduct from "./Homproduct";

import Review from "./Review";

import Hero from "./Hero";
import { SparklesPreview } from "../../../components/BackgoruAnimaiton/SparklesPreview";
import HomeFeatureSection from "./HomeFeatureSection";

import BuyerShowcase from "./BuyerShowcase";
import WhyChooseUs from "./WhyChooseUs";
import FlashSaleBanner from "./FlashSaleBanner";
import FashionGallery from "./FashionGallery";
import VisionGallery from "./VisionGallery";
import Male from "./GenderCategory/Male";
import Childern from "./GenderCategory/Childern";
import Women from "./GenderCategory/Women";


const Home = () => {
  return (
    <div className="md:mt-10 bg-base-100">
      <Hero></Hero>
      <Homproduct></Homproduct>
      <Male></Male>
      <Childern></Childern>
      <Women></Women>
      <BuyerShowcase></BuyerShowcase>
      <SparklesPreview></SparklesPreview>
      <WhyChooseUs></WhyChooseUs>
      <FashionGallery></FashionGallery>
      <VisionGallery></VisionGallery>
      <HomeFeatureSection></HomeFeatureSection>
      <FlashSaleBanner></FlashSaleBanner>
      <Review></Review>
    </div>
  );
};

export default Home;
