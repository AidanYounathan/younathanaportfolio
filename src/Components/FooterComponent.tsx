'use client'
import React from 'react'

const FooterComponent = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex flex-col md:flex-row items-center justify-between">
        <div>
          <span className="font-semibold">AIDAN YOUNATHAN</span>
          <div className="text-sm text-slate-400">Software Engineer</div>
        </div>
        <div className="text-sm text-slate-400">ayounathan05@gmail.com</div>
      </div>
    </footer>
  )
}

export default FooterComponent
