import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import FirstSec from '@/components/FirstSec'
import FeaturedFreelancer from '@/components/FeaturedFreelancer'
import ClientFeatures from '@/components/ClientFeatures'
import AboutSection from '@/components/About'
import Footer from '@/components/Footer'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "about") {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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