"use client";
import React from "react";
import { SparklesCore } from "../Ui/sparkles";
import { motion } from "framer-motion";
export function SparklesPreview() {
  return (
    <div className=" relative w-full bg-black flex flex-col items-center justify-center overflow-hidden ">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="md:py-1 py-5 text-white relative z-20">
        <div className="relative z-10 flex min-h-[80vh] items-center justify-center px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Small badge / tagline */}
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm text-gray-200 backdrop-blur">
              Premium E-Commerce Experience
            </span>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Modern Fashion,
              <br />
              Delivered to Your Doorstep
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mt-6 max-w-2xl text-base text-gray-200 sm:text-lg"
            >
              Discover premium collections with fast delivery, secure checkout,
              and easy returns — designed for modern shoppers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <button className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600">
                Shop Now
              </button>

              <button className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View Collection
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
