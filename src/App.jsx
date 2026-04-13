import React from 'react';
// Pastikan file-file ini ada di dalam folder src/components/
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import ComparisonTable from './components/ComparisonTable'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <ComparisonTable />
    </>
  )
}

export default App;