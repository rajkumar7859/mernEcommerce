import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram ,FaLinkedinIn } from 'react-icons/fa';
import instagram from "../assets/image/instagram.png"
import facebook from "../assets/image/facebook.png"
import linkedin from "../assets/image/linkedin.png"
import twitter from "../assets/image/twitter.png"

function Footer() {
  return (
    <footer className="mt-8 bg-blue-300 text-white py-12 sm:pb-12">
       <div className="container mx-auto">
        <div className=' w-1/3 m-auto flex flex-wrap justify-center gap-6 border border-yellow-300 p-2 rounded-xl shadow-lg shadow-blue-700/50  ' >
          <a href="#"><img className='w-9	' src={linkedin} alt="linkedin-logo"/></a>
          <a href="#"><img className='w-9	' src={twitter} alt="twitter-logo"/></a>
          <a href="#"><img className='w-9	' src={facebook} alt="facebook-logo"/></a>
          <a href="#"><img className='w-9	' src={instagram} alt="instagram-logo"/></a>
        </div>
        <div className='w-4/5 m-auto flex flex-wrap justify-center gap-6 p-4 items-center	' >
          <p className='font-bold text-2xl italic text-black'>Sign up for our newsletter</p>
          <input type="email" name="email" className="mt-1 px-3 py-2 w-2/5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
          <button class=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ring-2 ring-yellow-300">Submit</button>
        </div>
       <div className="sm:flex sm:items-center sm:justify-between border border-red-500">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <span className="block font-bold text-xl text-black">Company</span>
              <a href="#" className="text-black hover:text-gray-700 text-base block">About Us</a>
              <a href="#" className="text-black hover:text-gray-700 text-base block">Careers</a>
              <a href="#" className="text-black hover:text-gray-700 text-base block">Press</a>
              <a href="#" className="text-black hover:text-gray-700 text-base block">Investor Relations</a>
            </div>
       </div>
       </div>
   </footer>
  );
}

export default Footer;
