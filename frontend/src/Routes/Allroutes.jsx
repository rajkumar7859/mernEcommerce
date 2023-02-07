import React from 'react'
import { Routes , Route } from "react-router-dom"
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import AboutUs from './AboutUs'
import Contact from './Contact'
import Home from './Home'

const Allroutes = () => {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<Contact />} />
      </Routes>
<Footer />
    </div>
  )
}

export default Allroutes
