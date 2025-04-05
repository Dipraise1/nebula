"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center py-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/20 rounded-full blur-[80px]" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary text-glow">Nebula AI</span> <br />
              <span>Decentralized</span> <br />
              <span className="text-secondary text-glow">GPU Marketplace</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Rent GPU resources, earn rewards by lending, and participate in the fairlaunch ecosystem powered by $NAI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" glowEffect="purple">Explore Platform</Button>
              <Button size="lg" variant="outline" glowEffect="cyan">Learn More</Button>
            </div>
          </motion.div>

          {/* Animated GPU Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center"
          >
            <div className="glass-effect rounded-xl p-8 relative">
              <div className="w-full h-64 rounded-lg neon-purple flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="40" width="120" height="120" rx="8" stroke="#7C3AED" strokeWidth="4" />
                  <rect x="55" y="55" width="90" height="90" rx="4" stroke="#7C3AED" strokeWidth="2" />
                  <circle cx="100" cy="100" r="25" stroke="#EC4899" strokeWidth="3" />
                  <path d="M75 125L125 75" stroke="#06B6D4" strokeWidth="3" />
                  <path d="M75 75L125 125" stroke="#06B6D4" strokeWidth="3" />
                  <motion.circle 
                    cx="100" 
                    cy="100" 
                    r="35" 
                    stroke="#7C3AED" 
                    strokeWidth="1" 
                    strokeDasharray="10 5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold mb-1">Decentralized Computing</h3>
                <p className="text-gray-400">Powered by $NAI Token</p>
              </div>
              
              {/* Floating Data Points */}
              <motion.div 
                className="absolute -top-3 -right-3 bg-primary text-white text-xs px-2 py-1 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                1B Supply
              </motion.div>
              <motion.div 
                className="absolute -bottom-3 -left-3 bg-secondary text-white text-xs px-2 py-1 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Fairlaunch
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 