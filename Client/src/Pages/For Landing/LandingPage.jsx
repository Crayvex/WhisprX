import React from 'react'
import Navbar from '../../Components/For Landing/Navbar'
import Hero from './Hero';

const LandingPage = () => {
  return (
    <section id='LandingPage' className='bg-base-200'>
      <Navbar />
      <Hero />
    </section>
  )
}

export default LandingPage;