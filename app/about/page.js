'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

function StatCard({ label, value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    let totalMilSecDur = 1200;
    let incrementTime = Math.abs(Math.floor(totalMilSecDur / end));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center min-w-[140px]">
      <span className="text-3xl font-extrabold text-black">{count}</span>
      <span className="text-md font-medium text-black mt-2">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">About ShopVix</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          ShopVix is dedicated to delivering high-quality digital solutions for businesses of all sizes.
          Our mission is to empower brands with modern web and mobile experiences that drive results.
        </p>
        <div className="flex flex-wrap gap-6 justify-center my-10">
          <StatCard label="Projects Completed" value={120} />
          <StatCard label="Happy Clients" value={25} />
          <StatCard label="Awards Won" value={4} />
        </div>
        <div className="border-t border-gray-700 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300">
            We believe the web should be beautiful, functional, and accessible to everyone. Every project we undertake is an opportunity to create something meaningful that connects people to brands in authentic ways.
          </p>
        </div>
      </motion.div>
    </div>
  );
}