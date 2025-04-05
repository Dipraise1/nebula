"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

// Feature data
const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    ),
    title: 'High-Performance GPUs',
    description: 'Access to cutting-edge GPUs from providers worldwide, with automatic matching to optimal hardware for your specific workload.',
    highlight: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    title: 'Enterprise-Grade Security',
    description: 'End-to-end encryption for all data with secure virtualization ensuring complete isolation between workloads.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: 'On-Demand Scaling',
    description: 'Scale your GPU resources up or down in seconds, paying only for what you use with no long-term commitments.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    title: 'Developer Tools & SDKs',
    description: 'Comprehensive APIs and development tools that seamlessly integrate with popular AI frameworks and workflows.',
    highlight: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: 'Community Governance',
    description: 'Decentralized decision-making where token holders vote on protocol upgrades, fee structures, and resource allocation.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
    title: 'Low-Code ML Deployment',
    description: 'Intuitive interfaces for deploying machine learning models with pre-configured environments and templates.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-primary text-glow">Future</span> of Decentralized GPU Computing
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Unlocking the potential of distributed GPU infrastructure with blockchain technology
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                glassEffect={feature.highlight} 
                borderGlow={feature.highlight ? 'purple' : undefined}
                className="h-full"
              >
                <div className="text-primary mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It <span className="text-primary text-glow">Works</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                A seamless process from connection to computation
              </p>
            </motion.div>
          </div>
          
          <div className="relative max-w-4xl mx-auto py-10">
            {/* Vertical line connecting steps */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 hidden sm:block"></div>
            
            {/* Steps */}
            <div className="space-y-20 sm:space-y-20">
              {/* Step 1 */}
              <motion.div 
                className="relative flex flex-col sm:flex-row items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full sm:w-1/2 sm:pr-12 text-center sm:text-right mb-4 sm:mb-0">
                  <h3 className="text-2xl font-bold mb-3">Connect</h3>
                  <p className="text-gray-400">Link your wallet to access the decentralized GPU marketplace and browse available resources</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 neon-purple hidden sm:flex">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="sm:hidden w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 neon-purple mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="w-full sm:w-1/2 sm:pl-12">
                  <Card className="mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Wallet Connected</p>
                        <p className="text-xs text-gray-400">Multi-chain support: ETH, SOL, AVAX</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                className="relative flex flex-col sm:flex-row items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="order-2 sm:order-1 w-full sm:w-1/2 sm:pr-12">
                  <Card className="mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Customize Resources</p>
                        <p className="text-xs text-gray-400">GPU Type, Memory, Compute Units</p>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center z-10 neon-cyan hidden sm:flex">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="sm:hidden w-12 h-12 rounded-full bg-secondary flex items-center justify-center z-10 neon-cyan mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="order-1 sm:order-2 w-full sm:w-1/2 sm:pl-12 text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="text-2xl font-bold mb-3">Configure</h3>
                  <p className="text-gray-400">Specify your computational requirements and configure your environment with prebuilt templates</p>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                className="relative flex flex-col sm:flex-row items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full sm:w-1/2 sm:pr-12 text-center sm:text-right mb-4 sm:mb-0">
                  <h3 className="text-2xl font-bold mb-3">Pay</h3>
                  <p className="text-gray-400">Fund your compute session with $NAI tokens, with transparent pricing and no hidden fees</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center z-10 neon-pink hidden sm:flex">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="sm:hidden w-12 h-12 rounded-full bg-accent flex items-center justify-center z-10 neon-pink mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="w-full sm:w-1/2 sm:pl-12">
                  <Card className="mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Pay-As-You-Go</p>
                        <p className="text-xs text-gray-400">Starting at 0.0001 $NAI per compute minute</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                className="relative flex flex-col sm:flex-row items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="order-2 sm:order-1 w-full sm:w-1/2 sm:pr-12">
                  <Card className="mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Compute Started</p>
                        <p className="text-xs text-gray-400">Access via SSH, API, or Web Interface</p>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center z-10 shadow-glow-green hidden sm:flex">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="sm:hidden w-12 h-12 rounded-full bg-green-500 flex items-center justify-center z-10 shadow-glow-green mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="order-1 sm:order-2 w-full sm:w-1/2 sm:pl-12 text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="text-2xl font-bold mb-3">Compute</h3>
                  <p className="text-gray-400">Launch your workload with instant access to distributed GPU resources across the network</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 