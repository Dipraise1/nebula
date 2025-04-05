"use client";

import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

// Mock payment address
const PAYMENT_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

type GPUOption = {
  id: string;
  name: string;
  vram: string;
  cores: string;
  pricePerHour: number;
};

const gpuOptions: GPUOption[] = [
  { id: 'a100', name: 'NVIDIA A100', vram: '80GB', cores: '6912', pricePerHour: 24.5 },
  { id: 'rtx4090', name: 'NVIDIA RTX 4090', vram: '24GB', cores: '16384', pricePerHour: 12.75 },
  { id: 'rtx3090', name: 'NVIDIA RTX 3090', vram: '24GB', cores: '10496', pricePerHour: 8.5 },
  { id: 'a6000', name: 'NVIDIA A6000', vram: '48GB', cores: '10752', pricePerHour: 18.25 },
];

const durationOptions = [
  { value: 1, label: '1 Hour' },
  { value: 6, label: '6 Hours' },
  { value: 12, label: '12 Hours' },
  { value: 24, label: '24 Hours' },
  { value: 72, label: '3 Days' },
  { value: 168, label: '7 Days' },
];

type RentalStatus = 'idle' | 'processing' | 'success' | 'error';

export default function GpuRental() {
  const [selectedGpu, setSelectedGpu] = useState<GPUOption>(gpuOptions[0]);
  const [duration, setDuration] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [rentalStatus, setRentalStatus] = useState<RentalStatus>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  // Check if wallet is connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
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
  
  // Handle account changes
  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      setIsWalletConnected(false);
      setWalletAddress('');
    } else {
      setWalletAddress(accounts[0]);
      setIsWalletConnected(true);
    }
  };
  
  useEffect(() => {
    setTotalCost(selectedGpu.pricePerHour * duration);
  }, [selectedGpu, duration]);
  
  const handleGpuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gpu = gpuOptions.find(gpu => gpu.id === e.target.value);
    if (gpu) setSelectedGpu(gpu);
  };
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(Number(e.target.value));
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
        }
      } catch (error: any) {
        console.error("Error connecting wallet:", error);
        setErrorMessage(error.message || "Failed to connect wallet");
      }
    } else {
      setErrorMessage("Please install MetaMask or another Ethereum wallet");
    }
  };
  
  const handleRentGpu = async () => {
    setRentalStatus('processing');
    setErrorMessage(null);
    setTxHash(null);
    
    if (!isWalletConnected || !window.ethereum) {
      setErrorMessage("Please connect your wallet first");
      setRentalStatus('error');
      return;
    }
    
    try {
      // Convert totalCost to equivalent ETH amount for demo purposes (1 $NAI = 0.01 ETH for example)
      const ethAmount = (totalCost * 0.01).toFixed(6);
      const amountInWei = `0x${(parseFloat(ethAmount) * 1e18).toString(16)}`;
      
      // Send transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: PAYMENT_ADDRESS,
          value: amountInWei,
          gas: '0x5208', // 21000 gas (standard transaction)
        }],
      });
      
      setTxHash(txHash);
      setRentalStatus('success');
      
      // Reset after 10 seconds
      setTimeout(() => {
        setRentalStatus('idle');
        setTxHash(null);
      }, 10000);
    } catch (error: any) {
      console.error("Transaction error:", error);
      setErrorMessage(error.message || "Transaction failed");
      setRentalStatus('error');
    }
  };
  
  const formatTxHash = (hash: string): string => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };
  
  return (
    <section id="rent" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary text-glow">Rent GPU</span> Resources
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Access high-performance computing power on-demand, paying with ETH to demonstrate real functionality.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full" glassEffect borderGlow="purple">
              <h3 className="text-2xl font-bold mb-6">GPU Rental</h3>
              
              {rentalStatus === 'success' ? (
                <div className="text-center py-4 sm:py-8">
                  <div className="text-5xl mb-4 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Payment Successful!</h4>
                  <p className="text-gray-300 mb-2">
                    Your GPU rental has been processed and is now active.
                  </p>
                  {txHash && (
                    <p className="text-sm text-primary mb-4">
                      Transaction: {formatTxHash(txHash)}
                    </p>
                  )}
                  <div className="bg-card/50 p-4 rounded-lg mb-6 text-left">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-400">GPU:</div>
                      <div className="font-medium">{selectedGpu.name}</div>
                      <div className="text-gray-400">Duration:</div>
                      <div className="font-medium">{duration} hour{duration > 1 ? 's' : ''}</div>
                      <div className="text-gray-400">Amount Paid:</div>
                      <div className="font-medium">{(totalCost * 0.01).toFixed(6)} ETH</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setRentalStatus('idle')}
                  >
                    Rent Another GPU
                  </Button>
                </div>
              ) : (
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label htmlFor="gpu" className="block text-sm font-medium text-gray-300 mb-2">
                      Select GPU Model
                    </label>
                    <select
                      id="gpu"
                      value={selectedGpu.id}
                      onChange={handleGpuChange}
                      className="w-full py-3 sm:py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary text-base"
                    >
                      {gpuOptions.map(gpu => (
                        <option key={gpu.id} value={gpu.id}>
                          {gpu.name} ({gpu.vram} VRAM)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                      Rental Duration
                    </label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={handleDurationChange}
                      className="w-full py-3 sm:py-2.5 px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary text-base"
                    >
                      {durationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-card/50 rounded-lg p-4 border border-border">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:mb-2">
                      <span className="text-gray-300 font-medium sm:font-normal">GPU Model:</span>
                      <span className="font-medium">{selectedGpu.name}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:mb-2">
                      <span className="text-gray-300 font-medium sm:font-normal">VRAM:</span>
                      <span className="font-medium">{selectedGpu.vram}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:mb-2">
                      <span className="text-gray-300 font-medium sm:font-normal">CUDA Cores:</span>
                      <span className="font-medium">{selectedGpu.cores}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:mb-2">
                      <span className="text-gray-300 font-medium sm:font-normal">Price per Hour:</span>
                      <span className="font-medium">{selectedGpu.pricePerHour} $NAI (~{(selectedGpu.pricePerHour * 0.01).toFixed(6)} ETH)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:mb-2">
                      <span className="text-gray-300 font-medium sm:font-normal">Duration:</span>
                      <span className="font-medium">{duration} hour{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="border-t border-border mt-3 pt-3 flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-lg font-bold text-gray-300">Total Cost:</span>
                      <span className="text-lg font-bold text-primary text-glow">
                        {totalCost.toFixed(2)} $NAI <span className="text-sm opacity-70">(~{(totalCost * 0.01).toFixed(6)} ETH)</span>
                      </span>
                    </div>
                  </div>
                  
                  {!isWalletConnected ? (
                    <Button 
                      size="lg" 
                      className="w-full" 
                      glowEffect="purple"
                      onClick={connectWallet}
                    >
                      Connect Wallet to Rent
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      className="w-full" 
                      glowEffect="purple" 
                      onClick={handleRentGpu}
                      isLoading={rentalStatus === 'processing'}
                    >
                      {rentalStatus === 'processing' ? 'Processing Payment...' : 'Pay with ETH'}
                    </Button>
                  )}
                  
                  {errorMessage && (
                    <div className="bg-red-900/30 text-red-300 p-3 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full" glassEffect>
              <h3 className="text-2xl font-bold mb-4 sm:mb-6">Why Choose Nebula AI?</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="text-base sm:text-lg font-semibold mb-1">On-Demand Access</h4>
                    <p className="text-sm sm:text-base text-gray-400">Access high-performance GPUs instantly without investing in expensive hardware.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="text-base sm:text-lg font-semibold mb-1">Cost Effective</h4>
                    <p className="text-sm sm:text-base text-gray-400">Pay only for what you use, with flexible duration options to fit your needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="text-base sm:text-lg font-semibold mb-1">Secure & Decentralized</h4>
                    <p className="text-sm sm:text-base text-gray-400">All transactions secured by blockchain technology with transparent pricing.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="text-base sm:text-lg font-semibold mb-1">Global Network</h4>
                    <p className="text-sm sm:text-base text-gray-400">Access GPUs from providers around the world for optimal latency and performance.</p>
                  </div>
                </div>
                
                {/* Current Usage Stats */}
                <div className="mt-4 sm:mt-6 border-t border-border pt-4 sm:pt-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Current Network Stats</h4>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-card/50 p-2 sm:p-3 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-primary">2,347</div>
                      <div className="text-xs sm:text-sm text-gray-400">Active GPUs</div>
                    </div>
                    <div className="bg-card/50 p-2 sm:p-3 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-secondary">98.7%</div>
                      <div className="text-xs sm:text-sm text-gray-400">Uptime</div>
                    </div>
                    <div className="bg-card/50 p-2 sm:p-3 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-accent">12,582</div>
                      <div className="text-xs sm:text-sm text-gray-400">Users</div>
                    </div>
                    <div className="bg-card/50 p-2 sm:p-3 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-primary">83.4K</div>
                      <div className="text-xs sm:text-sm text-gray-400">$NAI/Day Volume</div>
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