import React from 'react';
import Header from '../components/ui/Header';
import Hero from '../components/sections/Hero';
import GpuRental from '../components/sections/GpuRental';
import LendGpu from '../components/sections/LendGpu';
import Staking from '../components/sections/Staking';
import TokenMetrics from '../components/sections/TokenMetrics';
import Footer from '../components/ui/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
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
