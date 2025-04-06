'use client';

import React from 'react';
import Header from '../components/ui/Header';
import Hero from '../components/sections/Hero';
import GpuRental from '../components/sections/GpuRental';
import LendGpu from '../components/sections/LendGpu';
import Staking from '../components/sections/Staking';
import TokenMetrics from '../components/sections/TokenMetrics';
import Footer from '../components/ui/Footer';
import JsonLd from '../components/SEO/JsonLd';

// Organization JSON-LD data
const organizationData = {
  url: 'https://nebulaai.xyz',
  name: 'Nebula AI',
  logo: 'https://nebulaai.xyz/logo.png',
  description: 'Nebula AI is a decentralized GPU marketplace where users can rent GPU resources for AI workloads, earn rewards by lending GPUs, and stake tokens to secure the network.',
  socialLinks: [
    'https://twitter.com/NebulaAI',
    'https://discord.gg/nebulaai',
    'https://github.com/NebulaAI',
    'https://t.me/NebulaAI'
  ],
  contactPoints: [
    {
      '@type': 'ContactPoint',
      email: 'contact@nebulaai.xyz',
      contactType: 'customer service'
    }
  ]
};

// Website JSON-LD data
const websiteData = {
  url: 'https://nebulaai.xyz',
  name: 'Nebula AI - Decentralized GPU Marketplace',
  description: 'Decentralized GPU marketplace for AI workloads with fair tokenomics and staking rewards.'
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* JSON-LD Structured Data */}
      <JsonLd type="Organization" data={organizationData} />
      <JsonLd type="WebSite" data={websiteData} />
      
      <Header />
      <Hero />
      <GpuRental />
      <LendGpu />
      <Staking />
      <TokenMetrics />
      <Footer />
    </main>
  );
}
