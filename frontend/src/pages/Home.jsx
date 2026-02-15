import React from 'react'
import Navbar from '@/components/Navbar'
import FirstSec from '@/components/FirstSec'
import FeaturedFreelancer from '@/components/FeaturedFreelancer'
import ClientFeatures from '@/components/ClientFeatures'
import AboutSection from '@/components/About'
import Footer from '@/components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
       <FirstSec/>
       <FeaturedFreelancer/>
       <ClientFeatures/>
       <AboutSection/>
       <Footer/>
    </div>
  )
}

export default Home