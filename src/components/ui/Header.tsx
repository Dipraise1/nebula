"use client";

import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

// Define minimal types for Ethereum window provider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

// Network configuration
const SUPPORTED_NETWORKS = {
  '0x1': {
    name: 'Ethereum',
    currencySymbol: 'ETH',
    blockExplorer: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  },
  '0x5': {
    name: 'Goerli',
    currencySymbol: 'ETH',
    blockExplorer: 'https://goerli.etherscan.io',
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  },
  '0x89': {
    name: 'Polygon',
    currencySymbol: 'MATIC',
    blockExplorer: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com'
  },
  '0xa4b1': {
    name: 'Arbitrum',
    currencySymbol: 'ETH',
    blockExplorer: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  },
  '0xa': {
    name: 'Optimism',
    currencySymbol: 'ETH',
    blockExplorer: 'https://optimistic.etherscan.io',
    rpcUrl: 'https://mainnet.optimism.io'
  }
};

// Preferred network - change this to the network you want to use
const PREFERRED_NETWORK = '0x1'; // Ethereum Mainnet

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [networkId, setNetworkId] = useState('');
  const [supportedNetwork, setSupportedNetwork] = useState(true);
  const [showNetworkSwitcher, setShowNetworkSwitcher] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  
  // Get details of current network
  const getCurrentNetwork = () => {
    if (!networkId || !SUPPORTED_NETWORKS[networkId]) {
      return {
        name: 'Unknown Network',
        currencySymbol: 'ETH',
        blockExplorer: '#',
        rpcUrl: ''
      };
    }
    return SUPPORTED_NETWORKS[networkId];
  };
  
  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          // Check if already connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
            await updateWalletInfo(accounts[0]);
          }
          
          // Setup event listeners for account changes
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);
          window.ethereum.on('connect', handleConnect);
          window.ethereum.on('disconnect', handleDisconnect);
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          setConnectionError('Failed to detect wallet. Please try connecting manually.');
        }
      }
    };
    
    checkConnection();
    
    // Clean up event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('connect', handleConnect);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);
  
  // Handle wallet connect event
  const handleConnect = () => {
    setConnectionError('');
  };
  
  // Handle wallet disconnect event
  const handleDisconnect = (error: { code: number; message: string }) => {
    console.error("Wallet disconnected:", error);
    disconnectWallet();
    setConnectionError(`Wallet disconnected: ${error.message}`);
  };
  
  // Handle account changes
  const handleAccountsChanged = async (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      // User disconnected their wallet
      disconnectWallet();
    } else {
      // User switched accounts
      setWalletAddress(accounts[0]);
      setConnectionError('');
      await updateWalletInfo(accounts[0]);
    }
  };
  
  // Handle network changes
  const handleChainChanged = (chainId: string) => {
    setNetworkId(chainId);
    checkSupportedNetwork(chainId);
    
    // If user has wallet connected, update balance for new network
    if (isWalletConnected && walletAddress) {
      updateWalletInfo(walletAddress);
    }
  };
  
  // Check if the network is supported
  const checkSupportedNetwork = (chainId: string) => {
    setSupportedNetwork(!!SUPPORTED_NETWORKS[chainId]);
  };
  
  // Update wallet balance and network info
  const updateWalletInfo = async (address: string) => {
    if (window.ethereum) {
      try {
        // Get current chain ID
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setNetworkId(chainId);
        checkSupportedNetwork(chainId);
        
        // Get balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        
        // Convert from wei to ether and set with 4 decimal places
        const etherValue = parseInt(balance, 16) / 1e18;
        setWalletBalance(parseFloat(etherValue.toFixed(4)));
      } catch (error) {
        console.error("Error updating wallet info:", error);
      }
    }
  };
  
  // Request a network switch
  const switchNetwork = async (chainId: string) => {
    if (!window.ethereum) return;
    
    const networkInfo = SUPPORTED_NETWORKS[chainId];
    if (!networkInfo) return;
    
    try {
      // Request switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      
      setShowNetworkSwitcher(false);
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId,
                chainName: networkInfo.name,
                rpcUrls: [networkInfo.rpcUrl],
                blockExplorerUrls: [networkInfo.blockExplorer],
                nativeCurrency: {
                  name: networkInfo.currencySymbol,
                  symbol: networkInfo.currencySymbol,
                  decimals: 18,
                },
              },
            ],
          });
          setShowNetworkSwitcher(false);
        } catch (addError) {
          console.error("Error adding network:", addError);
        }
      }
      console.error("Error switching network:", switchError);
    }
  };
  
  // Simulate sending a transaction
  const sendTransaction = async (toAddress: string, amount: string) => {
    if (!window.ethereum || !isWalletConnected || !walletAddress) {
      return {success: false, error: 'Wallet not connected'};
    }
    
    try {
      setTxPending(true);
      
      // Convert amount to wei (hex string)
      const amountInWei = `0x${(parseFloat(amount) * 1e18).toString(16)}`;
      
      // Request transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: toAddress,
          value: amountInWei,
          gas: '0x5208', // 21000 gas (standard transaction)
        }],
      });
      
      // Wait for transaction to be mined
      const receipt = await waitForTransaction(txHash);
      
      setTxPending(false);
      return {success: true, txHash, receipt};
    } catch (error) {
      console.error("Transaction error:", error);
      setTxPending(false);
      return {success: false, error};
    }
  };
  
  // Wait for transaction to be mined
  const waitForTransaction = (txHash: string) => {
    return new Promise((resolve, reject) => {
      const checkTx = async () => {
        try {
          const receipt = await window.ethereum.request({
            method: 'eth_getTransactionReceipt',
            params: [txHash],
          });
          
          if (receipt) {
            resolve(receipt);
          } else {
            // Check again after 1 second
            setTimeout(checkTx, 1000);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      checkTx();
    });
  };
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const connectWallet = async () => {
    setIsWalletConnecting(true);
    setConnectionError('');
    
    try {
      // Check if MetaMask or other Ethereum provider is available
      if (typeof window !== 'undefined' && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          await updateWalletInfo(accounts[0]);
          
          // Check if we're on a supported network, if not suggest switching
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (!SUPPORTED_NETWORKS[chainId]) {
            // Prompt to switch to preferred network
            await switchNetwork(PREFERRED_NETWORK);
          }
        }
      } else {
        setConnectionError("Please install MetaMask or another Ethereum wallet to connect.");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setConnectionError(error.message || "Failed to connect wallet. Please try again.");
    } finally {
      setIsWalletConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    setWalletBalance(0);
    setNetworkId('');
    setSupportedNetwork(true);
    setShowNetworkSwitcher(false);
    setConnectionError('');
  };

  const formatWalletAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  const toggleNetworkSwitcher = () => {
    setShowNetworkSwitcher(!showNetworkSwitcher);
  };
  
  // Get current network info
  const currentNetwork = getCurrentNetwork();

  return (
    <header className="sticky top-0 z-50 glass-effect py-4 border-b border-white/10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white z-50 relative">
            <span className="text-primary text-glow">Nebula</span> AI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#rent" className="text-white hover:text-primary transition-colors">Rent GPU</a>
          <a href="#lend" className="text-white hover:text-primary transition-colors">Lend GPU</a>
          <a href="#stake" className="text-white hover:text-primary transition-colors">Stake</a>
          <a href="#tokenomics" className="text-white hover:text-primary transition-colors">Tokenomics</a>
        </nav>

        {/* Wallet Button - Desktop */}
        <div className="hidden md:block relative">
          {isWalletConnected ? (
            <div className="flex items-center gap-3">
              {txPending && (
                <div className="bg-yellow-500/20 px-2 py-1 rounded text-yellow-300 text-xs">
                  Transaction Pending...
                </div>
              )}
              
              <div className="text-right hidden sm:block">
                <button 
                  onClick={toggleNetworkSwitcher}
                  className={`text-xs ${supportedNetwork ? 'text-gray-400' : 'text-red-400'} flex items-center`}
                >
                  {currentNetwork.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <p className="text-sm font-semibold text-white">
                  {walletBalance} {currentNetwork.currencySymbol}
                </p>
              </div>
              
              <Button
                onClick={disconnectWallet}
                variant="outline"
                glowEffect="purple"
              >
                {formatWalletAddress(walletAddress)}
              </Button>
              
              {/* Network Switcher Dropdown */}
              {showNetworkSwitcher && (
                <div className="absolute top-full right-0 mt-2 bg-card border border-primary/30 rounded-lg shadow-lg overflow-hidden z-50 w-48">
                  <div className="p-2 border-b border-primary/20 text-center">
                    <p className="text-sm font-semibold text-white">Switch Network</p>
                  </div>
                  <div className="p-2">
                    {Object.entries(SUPPORTED_NETWORKS).map(([chainId, network]) => (
                      <button
                        key={chainId}
                        onClick={() => switchNetwork(chainId)}
                        className={`w-full text-left p-2 rounded text-sm hover:bg-primary/10 transition-colors flex items-center justify-between ${networkId === chainId ? 'bg-primary/20 text-primary' : 'text-gray-300'}`}
                      >
                        {network.name}
                        {networkId === chainId && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Button
                onClick={connectWallet}
                glowEffect="purple"
                isLoading={isWalletConnecting}
              >
                {isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
              {connectionError && (
                <div className="absolute top-full right-0 mt-2 bg-red-900/70 text-white text-xs px-3 py-2 rounded">
                  {connectionError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <XMarkIcon className="h-7 w-7" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bars3Icon className="h-7 w-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu - Fullscreen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 overflow-auto pt-20"
          >
            <div className="flex flex-col items-center min-h-screen px-4 py-16">
              <nav className="flex flex-col items-center justify-center space-y-8 w-full">
                {[
                  { name: 'Rent GPU', href: '#rent' },
                  { name: 'Lend GPU', href: '#lend' },
                  { name: 'Stake', href: '#stake' },
                  { name: 'Tokenomics', href: '#tokenomics' }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <a 
                      href={item.href} 
                      className="text-white text-2xl font-semibold hover:text-primary transition-colors block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
              </nav>
              
              {/* Mobile Wallet Button */}
              <motion.div
                className="mt-12 w-full max-w-xs px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {isWalletConnected ? (
                  <div className="flex flex-col items-center space-y-3">
                    {!supportedNetwork && (
                      <div className="bg-red-900/50 text-red-300 p-2 rounded-lg w-full text-center text-sm">
                        Unsupported network. Please switch to a supported network.
                      </div>
                    )}
                    
                    <div className="bg-card/30 p-4 rounded-lg w-full text-center border border-primary/30">
                      <button 
                        onClick={toggleNetworkSwitcher}
                        className={`text-sm ${supportedNetwork ? 'text-gray-400' : 'text-red-400'} flex items-center justify-center w-full mb-1`}
                      >
                        {currentNetwork.name}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <p className="text-2xl font-bold text-white">
                        {walletBalance} {currentNetwork.currencySymbol}
                      </p>
                      
                      {txPending && (
                        <div className="mt-2 text-yellow-300 text-xs flex justify-center items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Transaction Pending
                        </div>
                      )}
                    </div>
                    
                    {/* Network Switcher for Mobile */}
                    {showNetworkSwitcher && (
                      <div className="bg-card border border-primary/30 rounded-lg overflow-hidden w-full">
                        <div className="p-2 border-b border-primary/20 text-center">
                          <p className="text-sm font-semibold text-white">Switch Network</p>
                        </div>
                        <div className="p-2">
                          {Object.entries(SUPPORTED_NETWORKS).map(([chainId, network]) => (
                            <button
                              key={chainId}
                              onClick={() => switchNetwork(chainId)}
                              className={`w-full text-left p-2 rounded text-sm hover:bg-primary/10 transition-colors flex items-center justify-between ${networkId === chainId ? 'bg-primary/20 text-primary' : 'text-gray-300'}`}
                            >
                              {network.name}
                              {networkId === chainId && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button
                      onClick={disconnectWallet}
                      variant="outline"
                      glowEffect="purple"
                      className="w-full"
                      size="lg"
                    >
                      {formatWalletAddress(walletAddress)}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button
                      onClick={connectWallet}
                      glowEffect="purple"
                      className="w-full"
                      size="lg"
                      isLoading={isWalletConnecting}
                    >
                      {isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </Button>
                    
                    {connectionError && (
                      <div className="bg-red-900/70 text-white text-sm px-3 py-2 rounded text-center">
                        {connectionError}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
              
              {/* Social Icons */}
              <motion.div
                className="mt-16 flex space-x-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                {[
                  { name: 'Twitter', icon: 'X' },
                  { name: 'Discord', icon: 'D' },
                  { name: 'Github', icon: 'G' },
                  { name: 'Telegram', icon: 'T' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors border border-gray-800"
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 