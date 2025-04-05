"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

// Statistics data
const stats = [
  {
    value: '35K+',
    label: 'Active GPUs',
    subtext: 'Connected to the network',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    color: 'purple',
  },
  {
    value: '4.2M',
    label: 'Compute Hours',
    subtext: 'Delivered to date',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    color: 'cyan',
  },
  {
    value: '$27M',
    label: 'Total Value Locked',
    subtext: 'In staking and rewards',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    color: 'pink',
  },
  {
    value: '125K+',
    label: 'Community Members',
    subtext: 'Across all platforms',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    color: 'green',
  },
];

export default function Statistics() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full" 
                borderGlow={stat.color === 'purple' ? 'purple' : stat.color === 'cyan' ? 'cyan' : stat.color === 'pink' ? 'pink' : undefined}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    stat.color === 'purple' ? 'text-primary bg-primary/10' : 
                    stat.color === 'cyan' ? 'text-secondary bg-secondary/10' : 
                    stat.color === 'pink' ? 'text-accent bg-accent/10' :
                    'text-green-500 bg-green-500/10'
                  }`}>
                    {stat.icon}
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-400">{stat.subtext}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 