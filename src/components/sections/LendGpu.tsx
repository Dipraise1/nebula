"use client";

import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

// Mock data
const leaderboardData = [
  { rank: 1, address: '0x8a42...7e9b', gpus: 32, earnings: 4521.8, location: 'Frankfurt, DE' },
  { rank: 2, address: '0xf9d5...2c4a', gpus: 28, earnings: 3892.5, location: 'Singapore, SG' },
  { rank: 3, address: '0x3e1c...9d85', gpus: 24, earnings: 3547.6, location: 'Virginia, US' },
  { rank: 4, address: '0xb68f...12d3', gpus: 18, earnings: 2835.2, location: 'Tokyo, JP' },
  { rank: 5, address: '0x7f42...6a0e', gpus: 14, earnings: 2103.7, location: 'London, UK' },
];

const gpuModels = [
  { id: 'a100', name: 'NVIDIA A100', hourlyEarning: 18.2, utilization: 92 },
  { id: 'rtx4090', name: 'NVIDIA RTX 4090', hourlyEarning: 9.5, utilization: 88 },
  { id: 'rtx3090', name: 'NVIDIA RTX 3090', hourlyEarning: 6.3, utilization: 79 },
  { id: 'a6000', name: 'NVIDIA A6000', hourlyEarning: 13.8, utilization: 84 },
];

const locationOptions = [
  'North America', 'Europe', 'Asia Pacific', 'South America'
];

type RegistrationStatus = 'idle' | 'processing' | 'success' | 'error';

export default function LendGpu() {
  const [selectedGpu, setSelectedGpu] = useState(gpuModels[0]);
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState(locationOptions[0]);
  const [availability, setAvailability] = useState(24);
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [userRank, setUserRank] = useState<number | null>(null);
  
  // Check if wallet is connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
            checkLeaderboard(accounts[0]);
          }
          
          // Setup event listeners for account changes
          window.ethereum.on('accountsChanged', handleAccountsChanged);
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkWalletConnection();
    
    // Clean up event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);
  
  // Check if wallet is on leaderboard
  const checkLeaderboard = (address: string) => {
    // Mock check - in real app this would be a backend API call
    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    const userOnLeaderboard = leaderboardData.find(
      item => item.address.toLowerCase() === shortAddress.toLowerCase()
    );
    
    if (userOnLeaderboard) {
      setUserRank(userOnLeaderboard.rank);
    } else {
      setUserRank(null);
    }
  };
  
  // Handle account changes
  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      setIsWalletConnected(false);
      setWalletAddress('');
      setUserRank(null);
    } else {
      setWalletAddress(accounts[0]);
      setIsWalletConnected(true);
      checkLeaderboard(accounts[0]);
    }
  };
  
  // Calculate estimated earnings
  const hourlyEarning = selectedGpu.hourlyEarning * quantity;
  const dailyEarning = hourlyEarning * availability;
  const weeklyEarning = dailyEarning * 7;
  const monthlyEarning = dailyEarning * 30;
  const estimatedUtilization = Math.min(100, selectedGpu.utilization - (quantity > 5 ? quantity : 0));
  
  const handleGpuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = gpuModels.find(gpu => gpu.id === e.target.value);
    if (selected) setSelectedGpu(selected);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };
  
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability(Math.min(24, Math.max(1, parseInt(e.target.value) || 1)));
  };
  
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          checkLeaderboard(accounts[0]);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error connecting wallet:", errorMessage);
        setErrorMessage(`Failed to connect wallet: ${errorMessage}`);
      }
    } else {
      setErrorMessage("Please install MetaMask or another Ethereum wallet");
    }
  };
  
  const handleRegister = async () => {
    if (!isWalletConnected) {
      setErrorMessage("Please connect your wallet first");
      return;
    }
    
    setRegistrationStatus('processing');
    setErrorMessage(null);
    
    // Simulate blockchain registration with a delay
    setTimeout(() => {
      setRegistrationStatus('success');
      
      // Add to the user's GPUs in the leaderboard data
      const existingLeaderboardEntry = leaderboardData.find(
        entry => entry.address === `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      );
      
      if (existingLeaderboardEntry) {
        existingLeaderboardEntry.gpus += quantity;
      } else {
        // Add a new entry at position 6 (or lower if there are less than 5 entries)
        const newRank = Math.min(6, leaderboardData.length + 1);
        leaderboardData.splice(newRank - 1, 0, {
          rank: newRank,
          address: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
          gpus: quantity,
          earnings: 0,
          location: location
        });
        
        // Reorder ranks
        leaderboardData.forEach((entry, index) => {
          entry.rank = index + 1;
        });
        
        // Keep only top 5
        if (leaderboardData.length > 5) {
          leaderboardData.length = 5;
        }
      }
      
      // Update user rank
      checkLeaderboard(walletAddress);
    }, 2000);
  };
  
  const formatWalletAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  return (
    <section id="lend" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent/5 to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-accent text-glow">Lend GPU</span> & Earn $NAI
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Put your idle GPU resources to work and earn passive income in $NAI tokens
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
            <Card className="h-full" glassEffect borderGlow="pink">
              <h3 className="text-2xl font-bold mb-6">Register Your GPUs</h3>
              
              {registrationStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4 text-accent text-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">GPUs Registered Successfully!</h4>
                  <p className="text-gray-300 mb-6">
                    Your {quantity} {selectedGpu.name} {quantity === 1 ? 'GPU' : 'GPUs'} {quantity === 1 ? 'has' : 'have'} been registered on the Nebula AI network.
                    Estimated earnings have been calculated below.
                  </p>
                  
                  {userRank && (
                    <div className="bg-card/50 p-4 rounded-lg mb-6 text-left">
                      <p className="text-accent font-medium mb-2">🎉 Congratulations! You're now ranked #{userRank} on the leaderboard!</p>
                      <p className="text-sm text-gray-400">Keep adding more GPUs to increase your earnings and climb the ranks.</p>
                    </div>
                  )}
                  
                  <Button onClick={() => setRegistrationStatus('idle')} variant="outline" glowEffect="pink">
                    Register More GPUs
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {!isWalletConnected && (
                    <div className="bg-card/50 p-4 rounded-lg border border-accent/30 text-center mb-4">
                      <p className="text-gray-300 mb-4">Connect your wallet to register your GPUs on the network and start earning.</p>
                      <Button 
                        onClick={connectWallet} 
                        glowEffect="pink"
                        className="w-full"
                      >
                        Connect Wallet
                      </Button>
                    </div>
                  )}
                  
                  {isWalletConnected && (
                    <div className="bg-card/50 p-4 rounded-lg border border-accent/30 mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-400">Connected Wallet</p>
                          <p className="font-medium">{formatWalletAddress(walletAddress)}</p>
                        </div>
                        {userRank ? (
                          <div className="bg-accent/20 px-3 py-1 rounded-full">
                            <p className="text-accent text-sm font-medium">Rank #{userRank}</p>
                          </div>
                        ) : (
                          <div className="bg-card/50 px-3 py-1 rounded-full">
                            <p className="text-gray-400 text-sm">Not Ranked</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="gpu-model" className="block text-sm font-medium text-gray-300 mb-2">
                      GPU Model
                    </label>
                    <select
                      id="gpu-model"
                      value={selectedGpu.id}
                      onChange={handleGpuChange}
                      className="w-full py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-accent"
                      disabled={!isWalletConnected}
                    >
                      {gpuModels.map(gpu => (
                        <option key={gpu.id} value={gpu.id}>
                          {gpu.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-full py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-accent"
                      disabled={!isWalletConnected}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <select
                      id="location"
                      value={location}
                      onChange={handleLocationChange}
                      className="w-full py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-accent"
                      disabled={!isWalletConnected}
                    >
                      {locationOptions.map(loc => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
                      Daily Availability (hours)
                    </label>
                    <input
                      id="availability"
                      type="number"
                      min="1"
                      max="24"
                      value={availability}
                      onChange={handleAvailabilityChange}
                      className="w-full py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-accent"
                      disabled={!isWalletConnected}
                    />
                  </div>
                  
                  <Button
                    size="lg"
                    className="w-full"
                    glowEffect="pink"
                    onClick={handleRegister}
                    disabled={!isWalletConnected}
                    isLoading={registrationStatus === 'processing'}
                  >
                    {registrationStatus === 'processing' ? 'Registering...' : 'Register GPU'}
                  </Button>
                  
                  {errorMessage && (
                    <div className="bg-red-900/30 text-red-300 p-3 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}
              
              {/* Earning Statistics */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-lg font-semibold mb-4">Estimated Earnings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Hourly</div>
                    <div className="text-xl font-bold text-accent">
                      <CountUp end={hourlyEarning} decimals={2} suffix=" $NAI" duration={2} />
                    </div>
                  </div>
                  <div className="bg-card/50 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Daily</div>
                    <div className="text-xl font-bold text-accent">
                      <CountUp end={dailyEarning} decimals={2} suffix=" $NAI" duration={2} />
                    </div>
                  </div>
                  <div className="bg-card/50 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Weekly</div>
                    <div className="text-xl font-bold text-accent">
                      <CountUp end={weeklyEarning} decimals={2} suffix=" $NAI" duration={2} />
                    </div>
                  </div>
                  <div className="bg-card/50 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Monthly</div>
                    <div className="text-xl font-bold text-accent">
                      <CountUp end={monthlyEarning} decimals={2} suffix=" $NAI" duration={2} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Estimated Utilization</span>
                    <span className="text-sm font-medium">{estimatedUtilization}%</span>
                  </div>
                  <div className="w-full bg-card/50 rounded-full h-2.5">
                    <div 
                      className="bg-accent h-2.5 rounded-full" 
                      style={{ width: `${estimatedUtilization}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    *Actual earnings may vary based on network demand and GPU utilization
                  </p>
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
              <h3 className="text-2xl font-bold mb-6">Top GPU Providers Leaderboard</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Provider</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">GPUs</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Earnings</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {leaderboardData.map((provider, index) => (
                      <tr key={index} className={walletAddress && provider.address === `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` ? 'bg-accent/10' : ''}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : index === 1 ? 'bg-gray-400/20 text-gray-400' : index === 2 ? 'bg-amber-600/20 text-amber-600' : 'bg-card text-gray-400'}`}>
                              {provider.rank}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm font-medium text-white">
                            {walletAddress && provider.address === `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` ? (
                              <span className="text-accent">{provider.address} (You)</span>
                            ) : (
                              provider.address
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-white">{provider.gpus}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-white">{provider.earnings.toLocaleString()} $NAI</div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-white">{provider.location}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4">Lender Requirements</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      1
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">Dedicated GPU</h5>
                      <p className="text-sm text-gray-400">Must have a dedicated GPU with at least 6GB VRAM that's not your primary display adapter</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      2
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">Internet Connection</h5>
                      <p className="text-sm text-gray-400">Stable internet connection with at least 10 Mbps upload speed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      3
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">Power Supply</h5>
                      <p className="text-sm text-gray-400">Stable power supply with UPS recommended for optimal earnings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      4
                    </div>
                    <div className="ml-3">
                      <h5 className="text-base font-medium text-white">Cooling Solution</h5>
                      <p className="text-sm text-gray-400">Adequate cooling to maintain optimal GPU temperatures during extended usage</p>
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