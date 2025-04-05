"use client";

import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

// Define staking tiers
const stakingTiers = [
  { 
    name: 'Bronze', 
    minAmount: 10000, 
    maxAmount: 49999, 
    apy: 12, 
    lockPeriod: 30,
    color: 'from-amber-700 to-amber-500',
    glowColor: 'neon-purple'
  },
  { 
    name: 'Silver', 
    minAmount: 50000, 
    maxAmount: 99999, 
    apy: 18, 
    lockPeriod: 60,
    color: 'from-gray-400 to-gray-300',
    glowColor: 'neon-cyan'
  },
  { 
    name: 'Gold', 
    minAmount: 100000, 
    maxAmount: 499999, 
    apy: 24, 
    lockPeriod: 90,
    color: 'from-yellow-500 to-yellow-300',
    glowColor: 'neon-pink'
  },
  { 
    name: 'Platinum', 
    minAmount: 500000, 
    maxAmount: Number.MAX_SAFE_INTEGER, 
    apy: 30, 
    lockPeriod: 180,
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'neon-cyan'
  }
];

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState(50000);
  const [stakingTier, setStakingTier] = useState(stakingTiers[1]);
  const [stakingPeriod, setStakingPeriod] = useState(stakingTiers[1].lockPeriod);
  const [estimatedReward, setEstimatedReward] = useState(0);
  const [isStaking, setIsStaking] = useState(false);
  const [unstakeProgress, setUnstakeProgress] = useState(0);
  const [showUnstakeTimer, setShowUnstakeTimer] = useState(false);
  
  // Update tier based on stake amount
  useEffect(() => {
    const tier = stakingTiers.find(tier => 
      stakeAmount >= tier.minAmount && stakeAmount <= tier.maxAmount
    );
    
    if (tier && tier.name !== stakingTier.name) {
      setStakingTier(tier);
      setStakingPeriod(tier.lockPeriod);
    }
  }, [stakeAmount, stakingTier.name]);
  
  // Calculate estimated rewards
  useEffect(() => {
    const dailyRate = stakingTier.apy / 365;
    const dailyReward = stakeAmount * (dailyRate / 100);
    const totalReward = dailyReward * stakingPeriod;
    setEstimatedReward(totalReward);
  }, [stakeAmount, stakingTier, stakingPeriod]);
  
  const handleStakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setStakeAmount(value);
  };
  
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStakingPeriod(parseInt(e.target.value));
  };
  
  const handleStake = () => {
    setIsStaking(true);
    setShowUnstakeTimer(false);
  };
  
  const handleUnstake = () => {
    setShowUnstakeTimer(true);
    setUnstakeProgress(0);
    
    // Simulate unstaking cooldown
    const interval = setInterval(() => {
      setUnstakeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowUnstakeTimer(false);
          setIsStaking(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Complete in ~5 seconds
  };
  
  return (
    <section id="stake" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-secondary/5 to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-secondary text-glow">Stake $NAI</span> & Secure the Network
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Earn passive rewards by staking your $NAI tokens and helping secure the network
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
            <Card className="h-full" glassEffect borderGlow="cyan">
              <h3 className="text-2xl font-bold mb-6">Stake Your $NAI</h3>
              
              <div className="space-y-6">
                {isStaking ? (
                  <div className="text-center py-6">
                    <div className="text-5xl mb-4 text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Staking Active!</h4>
                    <p className="text-gray-300 mb-8">
                      You have successfully staked {stakeAmount.toLocaleString()} $NAI in the {stakingTier.name} tier for {stakingPeriod} days.
                      Your estimated reward is {estimatedReward.toFixed(2)} $NAI.
                    </p>
                    
                    {showUnstakeTimer ? (
                      <div className="mb-6">
                        <h5 className="text-lg font-medium mb-2">Unstaking Cooldown</h5>
                        <div className="w-full bg-card/50 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-secondary h-2.5 rounded-full transition-all duration-100 ease-linear" 
                            style={{ width: `${unstakeProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-400">
                          Please wait... Unstaking in progress ({unstakeProgress}%)
                        </p>
                      </div>
                    ) : (
                      <Button 
                        size="lg" 
                        variant="outline" 
                        glowEffect="cyan" 
                        className="w-full"
                        onClick={handleUnstake}
                      >
                        Unstake $NAI
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <div>
                      <label htmlFor="stake-amount" className="block text-sm font-medium text-gray-300 mb-2">
                        Stake Amount ($NAI)
                      </label>
                      <input
                        id="stake-amount"
                        type="number"
                        min="10000"
                        value={stakeAmount}
                        onChange={handleStakeAmountChange}
                        className="w-full py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-secondary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="stake-period" className="block text-sm font-medium text-gray-300 mb-2">
                        Staking Period (Days)
                      </label>
                      <select
                        id="stake-period"
                        value={stakingPeriod}
                        onChange={handlePeriodChange}
                        className="w-full py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-secondary"
                      >
                        <option value={30}>30 Days</option>
                        <option value={60}>60 Days</option>
                        <option value={90}>90 Days</option>
                        <option value={180}>180 Days</option>
                        <option value={365}>365 Days</option>
                      </select>
                    </div>
                    
                    <div className="bg-card/50 p-4 rounded-lg border border-border">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Selected Tier:</span>
                        <span className="font-medium text-secondary">{stakingTier.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">APY Rate:</span>
                        <span className="font-medium">{stakingTier.apy}%</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Lock Period:</span>
                        <span className="font-medium">{stakingPeriod} days</span>
                      </div>
                      <div className="border-t border-border mt-3 pt-3 flex justify-between">
                        <span className="text-lg font-bold text-gray-300">Estimated Reward:</span>
                        <span className="text-lg font-bold text-secondary">+{estimatedReward.toFixed(2)} $NAI</span>
                      </div>
                    </div>
                    
                    <Button
                      size="lg"
                      className="w-full"
                      glowEffect="cyan"
                      onClick={handleStake}
                    >
                      Stake Now
                    </Button>
                    
                    <p className="text-xs text-gray-400 text-center">
                      Note: Staked tokens are locked for the selected period. Early unstaking may incur penalties.
                    </p>
                  </>
                )}
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
              <h3 className="text-2xl font-bold mb-6">Staking Tiers & Benefits</h3>
              
              <div className="space-y-6">
                {stakingTiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg glass-effect border relative overflow-hidden ${tier.name === stakingTier.name ? tier.glowColor : 'border-border'}`}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${tier.color}`} />
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h4 className="text-lg font-bold">{tier.name}</h4>
                        <p className="text-sm text-gray-400">
                          {tier.minAmount.toLocaleString()} - {
                            tier.maxAmount === Number.MAX_SAFE_INTEGER ? 
                            '∞' : tier.maxAmount.toLocaleString()
                          } $NAI
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary">{tier.apy}%</div>
                        <div className="text-sm text-gray-400">APY</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 relative z-10">
                      <div className="flex justify-between text-sm">
                        <span>Lock period: {tier.lockPeriod} days</span>
                        {tier.name === stakingTier.name && (
                          <span className="text-secondary font-medium">Current Tier ✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-semibold mb-4">Staking Benefits</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-base font-medium text-white">Passive Income</h5>
                        <p className="text-sm text-gray-400">Earn competitive APY just by holding your tokens</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-base font-medium text-white">Network Security</h5>
                        <p className="text-sm text-gray-400">Help secure the Nebula AI network with your stake</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-base font-medium text-white">Governance Rights</h5>
                        <p className="text-sm text-gray-400">Higher tiers grant voting power on platform proposals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-base font-medium text-white">Reduced Fees</h5>
                        <p className="text-sm text-gray-400">Get discounted GPU rental fees based on your staking tier</p>
                      </div>
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