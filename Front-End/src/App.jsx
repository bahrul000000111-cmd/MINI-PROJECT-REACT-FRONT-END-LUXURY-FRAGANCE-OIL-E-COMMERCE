import React from 'react';
// Pastikan file-file ini ada di dalam folder src/components/
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import StatsSection from './components/StatsSection';
import ShopByHotel from './components/ShopByHotel';
import ComparisonSection from './components/ComparisonSection';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <ComparisonSection />
      <StatsSection/>
      <ShopByHotel/>
    </>
  )
}

export default App;