import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaBars} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'


const links=[
  {
    to:"/aboutus",
    title:"About"
  },
  {
    to:"/contact",
    title:"Contact"
  },
  {
    to:"/",
    title:"Home"
  }
 
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          My App
        </Link>
      </div>
      <div className="block md:hidden">
        <button
          className="navbar-burger flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={toggleOpen}
        >
          {!isOpen?<FaBars color="black" /> : <CgClose color="black" />}
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex md:items-center md:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >

        <div className="text-sm md:flex-grow">
          {
            links?.map((nav)=>{ return (
              <Link
              to={nav.to}
              className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={toggleOpen}
            >
              {nav.title}
            </Link>
            )
            })
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
