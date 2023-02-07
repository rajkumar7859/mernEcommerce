import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { TfiUser } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { MdContactMail} from "react-icons/md";
import { TbBrandReactNative } from "react-icons/tb";
import { FiSend } from "react-icons/fi";

const links = [
    {
      id: 1,
      link: "home",
      icon: <AiFillHome size={30} className="animate-wiggle  hover:text-green-400"></AiFillHome>,
      css: "text-blue-500 scale-125 duration-300",
    },
    {
      id: 2,
      link: "aboutUs",
      icon: <TfiUser size={30} className="animate-pulse  hover:text-green-400"></TfiUser>,
      css: "text-blue-500  scale-125 duration-300",
    },
    {
      id: 3,
      link: "contact",
      icon: <TbBrandReactNative size={30} className="animate-spin-slow  hover:text-green-400"></TbBrandReactNative>,
      css: "text-blue-500  scale-125 duration-300",
    },
    {
      id: 4,
      link: "skills",
      icon: <AiFillSetting size={30} className="animate-reverse-spin  hover:text-green-400"></AiFillSetting>,
      css: "text-blue-500  scale-125 duration-300",
    },
    {
      id: 5,
      link: "contact",
      icon: <MdContactMail size={30} className="animate-wiggle  hover:text-green-400"></MdContactMail>,
      css: "text-blue-500  scale-125 duration-300",
    },
  ];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [nav, setNav] = React.useState(false);
    const [place, setPlace] = useState("");
  return (
    <div className="flex justify-between items-center w-full h-16  text-white bg-gray-900  px-4  fixed z-10">
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <h1 className="text-2xl font-title ml-2 hover:scale-105 hover:text-blue-400 duration-200">Portfolio</h1>
      </div>
      <ul className="hidden md:flex">
        {links.map(({ id, link, css }) => (
          <li
            key={id}
            className={`${
              place === link ? css : ""
            } px-4 font-title cursor-pointer capitalize font-medium text-gray-200 hover:scale-105 hover:text-purple-400 duration-200  `}
          >
            <Link to={link}>
              {link}
            </Link>
          </li>
        ))}
        <li className="px-4 font-title cursor-pointer capitalize font-medium text-gray-200 hover:text-purple-400 duration-200  ">
        </li>
      </ul>

      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
        {nav ? <FaTimes size={30}></FaTimes> : <FaBars size={30}></FaBars>}
      </div>
      {nav && (
        <ul className="flex flex-col justify-center absolute top-0 right-0 w-60 h-screen bg-gradient-to-b from-black to-gray-800 text-gray-200">
          {links.map(({ id, link, icon }) => (
            <li key={id} className="px-4 font-title font-medium cursor-pointer capitalize py-6">
              <Link className="flex items-center justify-start gap-4" onClick={() => setNav(!nav)} to={link} smooth duration={500}>
                {icon}
                <p className=" hover:text-blue-500">{link}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Navbar
