'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {TypeAnimation} from 'react-type-animation'
import { Button } from "flowbite-react";
import { motion } from 'framer-motion'



const HeroComponent = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  }

  const item = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <section className="pb-12 md:pb-0">
      <motion.div className='grid grid-cols-1 sm:grid-cols-12' variants={container} initial="hidden" animate="visible">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <motion.h1 className='text-white mb-4 text-3xl sm:text-6xl  lg:text-7xl font-extrabold' initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease: 'circOut' }}>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500'>Hello, I Am{""} </span>
            <br />
            <span>
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
            </span>
          </motion.h1>

          <motion.p className='text-[#bdc9d1] mt-4 sm:text-lg text-base font-medium lg:text-xl mb-6' variants={item}>
            I&apos;m a software engineer who builds thoughtful, performant web applications. I specialize in front-end and full-stack development with a focus on clean UI, accessible design, and reliable systems. Reach out if you&apos;d like to collaborate or hire.
          </motion.p>

          <motion.div variants={item}>
            <a href="/Aidan_Younathan_Resume.pdf" download="Aidan_Younathan_Resume.pdf"><button className='px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-r from-blue-500 via-purple-900 to-pink-500 hover:bg-slate-800 text-white  mt-3' ><span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Download Resume</span></button></a>
          </motion.div>
        </div>

        <motion.div className='col-span-5 place-self-center mt-4 lg:mt-0 flex justify-center' variants={item}>
          <div className='rounded-full bg-[#181818] overflow-hidden w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[400px] lg:h-[400px] flex items-center justify-center'>
            <Image
              // Use the same image URL (with cache-bust) as the site icons so the favicon matches the circular avatar
              src='/images/Aidan.png?v=2'
              alt='Aidan Younathan'
              width={400}
              height={400}
              className='object-cover object-top w-full h-full'
              sizes='(max-width: 640px) 12rem, (max-width: 1024px) 18rem, 25rem'
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroComponent
