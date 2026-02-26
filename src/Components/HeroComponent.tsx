'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {TypeAnimation} from 'react-type-animation'
import { Button } from "flowbite-react";



const HeroComponent = () => {
  return (
    <section>
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className='text-white mb-4 text-3xl sm:text-6xl  lg:text-7xl font-extrabold'><span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500'>Hello, I Am{""} </span>
          <br />
          
          <TypeAnimation
              sequence={[
                "Aidan Younathan",
                1000,
                "Software Engineer",
                1000,
                "Full‑Stack Developer",
                1000,
                "Photographer",
                1000,
              ]}
              wrapper="span"
              speed={10}
              repeat={Infinity}
            />
          
          
          
          </h1>
          <p className='text-[#bdc9d1] mt-4 sm:text-lg text-base font-medium lg:text-xl mb-6'>I&apos;m a software engineer who builds thoughtful, performant web applications. I specialize in front-end and full-stack development with a focus on clean UI, accessible design, and reliable systems. Reach out if you&apos;d like to collaborate or hire.</p>
          <div>
            <a href="/AidanYounathanResume.pdf" download="AidanYounathanResume.pdf"><button className='px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-r from-blue-500 via-purple-900 to-pink-500 hover:bg-slate-800 text-white  mt-3' ><span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Download Resume</span></button></a>
          </div>
        </div>
        <div className='col-span-5 place-self-center mt-4 lg:mt-0'>
          <div className='rounded-full relative bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] overflow-hidden'>
            <Image
          src='/images/Aidan.png'
          alt='Aidan YOunathan'
          height={270}
          width={270}
          className='absolute transform  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
          ></Image>
          </div>
          
        </div>
      </div>
      
    </section>
  )
}

export default HeroComponent
