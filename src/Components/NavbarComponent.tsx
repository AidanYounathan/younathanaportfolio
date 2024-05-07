'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavLinkComponent from '../Components/NavLinkComponent'
import { title } from 'process'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Navbar } from 'flowbite-react';
import MenuOverlay from './CollapsedMenuComponent'

const navLinks = [
    {
        title: "About",
        path: '#about',
    },
    {
        title: "Projects",
        path: '#projects',
    },
    {
        title: 'Contact',
        path: '#contact',
    }
]



const NavbarComponent = () => {

const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="fixed mx-auto top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-90">
        <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
          <Link
            href={"/"}
            className="text-2xl md:text-5xl text-white font-semibold"
          >
            AIDAN YOUNATHAN
          </Link>
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <Bars3Icon className="h-5 w-5 " />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLinkComponent href={link.path} title={link.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
      </nav>
    //   <Navbar fluid rounded className='bg-transparent'>
    //   <Navbar.Brand as={Link} href="">
        
    //     <span className="text-2xl md:text-5xl text-white font-semibold">LOGO</span>
    //   </Navbar.Brand>
    //   <Navbar.Toggle />
    //   <Navbar.Collapse>
    //     <Navbar.Link href="#about" className='border-none'>About</Navbar.Link>
    //     <Navbar.Link href="#projects" className='border-none'>Projects</Navbar.Link>
    //     <Navbar.Link href="#contact" className='border-none'>Contact</Navbar.Link>
    //   </Navbar.Collapse>
    // </Navbar>
    )
}

export default NavbarComponent
