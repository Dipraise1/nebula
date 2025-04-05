"use client";

import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import a simple loading component
const LoadingChart = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

// Dynamically import the chart component to avoid SSR issues
const PieChartComponent = dynamic(
  () => import('./charts/PieChartComponent'),
  { 
    ssr: false,
    loading: () => <LoadingChart />
  }
);

// Token distribution data
const tokenDistribution = [
  { name: 'GPU Lenders', value: 400000000, color: '#7C3AED' },
  { name: 'Staking Rewards', value: 300000000, color: '#06B6D4' },
  { name: 'Community Development', value: 150000000, color: '#EC4899' },
  { name: 'Ecosystem Growth', value: 100000000, color: '#10B981' },
  { name: 'Liquidity Pools', value: 50000000, color: '#F59E0B' },
];

// Market statistics
const marketStats = {
  totalSupply: 1000000000,
  circulatingSupply: 350000000,
  stakedTokens: 125000000,
  price: 0.085,
  marketCap: 29750000,
};

export default function TokenMetrics() {
  // State to track if client-side rendering is active
  const [isClient, setIsClient] = useState(false);
  
  // Calculate staking percentage
  const stakingPercentage = (marketStats.stakedTokens / marketStats.circulatingSupply) * 100;
  
  // Set client-side rendering flag when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <section id="tokenomics" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary text-glow">$NAI Token</span> Economics
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A truly fair-launched token powering the decentralized GPU marketplace
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full" glassEffect borderGlow="purple">
              <h3 className="text-2xl font-bold mb-6">$NAI Flow Diagram</h3>
              
              <div className="rounded-xl bg-card p-6 relative overflow-hidden">
                {/* Flow diagram */}
                <div className="w-full relative">
                  {/* GPU Lender Node */}
                  <motion.div 
                    className="absolute left-0 top-0 glass-effect p-3 rounded-lg border border-primary neon-purple text-center w-40"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="text-primary font-bold">GPU Lenders</div>
                    <div className="text-xs text-gray-400">Provide GPUs</div>
                  </motion.div>
                  
                  {/* Marketplace Node */}
                  <motion.div 
                    className="glass-effect p-4 rounded-lg border border-secondary neon-cyan text-center w-48 mx-auto my-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="text-secondary font-bold">Nebula Marketplace</div>
                    <div className="text-xs text-gray-400">Facilitates GPU matching</div>
                  </motion.div>
                  
                  {/* GPU Renter Node */}
                  <motion.div 
                    className="absolute right-0 top-0 glass-effect p-3 rounded-lg border border-accent neon-pink text-center w-40"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="text-accent font-bold">GPU Renters</div>
                    <div className="text-xs text-gray-400">Pay in $NAI</div>
                  </motion.div>
                  
                  {/* Staking Pool Node */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 glass-effect p-3 rounded-lg border border-primary neon-purple text-center w-44"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="text-primary font-bold">Staking Pool</div>
                    <div className="text-xs text-gray-400">Network security & rewards</div>
                  </motion.div>
                  
                  {/* Connector Lines */}
                  <svg className="absolute inset-0 w-full h-full z-[-1]" viewBox="0 0 400 200">
                    {/* Lender to Marketplace */}
                    <motion.path 
                      d="M40 30 L180 100" 
                      stroke="#7C3AED" 
                      strokeWidth="2" 
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                    <motion.circle 
                      cx="143" cy="82" r="3" 
                      fill="#7C3AED"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    />
                    
                    {/* Marketplace to Renter */}
                    <motion.path 
                      d="M220 100 L360 30" 
                      stroke="#06B6D4" 
                      strokeWidth="2" 
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                    <motion.circle 
                      cx="257" cy="82" r="3" 
                      fill="#06B6D4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    />
                    
                    {/* Renter to Marketplace (payment) */}
                    <motion.path 
                      d="M360 40 L220 110" 
                      stroke="#EC4899" 
                      strokeWidth="2" 
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                    <motion.circle 
                      cx="290" cy="75" r="3" 
                      fill="#EC4899"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    />
                    
                    {/* Marketplace to Lender (payment) */}
                    <motion.path 
                      d="M180 110 L40 40" 
                      stroke="#EC4899" 
                      strokeWidth="2" 
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                    <motion.circle 
                      cx="110" cy="75" r="3" 
                      fill="#EC4899"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.8 }}
                    />
                    
                    {/* Marketplace to Staking Pool (fees) */}
                    <motion.path 
                      d="M200 120 L200 170" 
                      stroke="#7C3AED" 
                      strokeWidth="2" 
                      fill="none"
                      strokeDasharray="3,3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                    <motion.circle 
                      cx="200" cy="145" r="3" 
                      fill="#7C3AED"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 2 }}
                    />
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                    <span className="text-xs text-gray-300">GPU Resources</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                    <span className="text-xs text-gray-300">$NAI Payment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                    <span className="text-xs text-gray-300">Service Matching</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-0.5 border-t-2 border-dashed border-primary mr-2"></div>
                    <span className="text-xs text-gray-300">Protocol Fee</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Fair Launch Model</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      ✓
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">No pre-mine for team or investors</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      ✓
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">No ICO or private fundraising rounds</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      ✓
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">100% of tokens earned through network participation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">
                      ✓
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">Fixed supply with deflationary token burns</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full" glassEffect>
              <h3 className="text-2xl font-bold mb-6">Token Metrics</h3>
              
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Total Supply</div>
                    <div className="text-2xl font-bold text-white">{marketStats.totalSupply.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">$NAI</div>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Circulating Supply</div>
                    <div className="text-2xl font-bold text-white">{marketStats.circulatingSupply.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">{((marketStats.circulatingSupply / marketStats.totalSupply) * 100).toFixed(1)}% of total</div>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Staked Tokens</div>
                    <div className="text-2xl font-bold text-white">{marketStats.stakedTokens.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">{stakingPercentage.toFixed(1)}% of circulating</div>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Market Cap</div>
                    <div className="text-2xl font-bold text-white">${marketStats.marketCap.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Based on current price</div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between bg-card/50 p-4 rounded-lg">
                  <div>
                    <div className="text-gray-400 text-sm">Current Price (simulated)</div>
                    <div className="text-3xl font-bold text-primary">${marketStats.price}</div>
                  </div>
                  <div className="flex">
                    <div className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">
                      +5.2% (24h)
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold mb-4">Token Distribution</h4>
              
              <div className="w-full h-72">
                {isClient && (
                  <PieChartComponent 
                    data={tokenDistribution} 
                    totalSupply={marketStats.totalSupply} 
                  />
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-lg font-semibold mb-4">Token Utility</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 7H7v6h6V7z" />
                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">GPU Marketplace Currency</h5>
                      <p className="text-sm text-gray-400">Used for all transactions in the Nebula AI ecosystem</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">Governance Rights</h5>
                      <p className="text-sm text-gray-400">Staked tokens grant voting power on protocol decisions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">Network Incentives</h5>
                      <p className="text-sm text-gray-400">Rewards for GPU lenders, validators, and developers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">Priority Access</h5>
                      <p className="text-sm text-gray-400">Token holders get preferred access to limited GPU resources</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 