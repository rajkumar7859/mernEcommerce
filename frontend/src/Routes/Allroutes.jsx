import React from 'react'
import { Routes , Route } from "react-router-dom"
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import AboutUs from './AboutUs'
import Contact from './Contact'
import Deals from './Deals'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'

const Allroutes = () => {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
<Footer />
    </div>
  )
}

export default Allroutes
