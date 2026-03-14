import React from 'react'
import NavTop from './NavTop'
import ScrollToTop from './common/ScrollToTop'
import SectionTop from './SectionTop'
export default function Navbar() {
  return (
    <div className='navbg text-white rounded-2xl'>
        <div id='top' className='bg-black/60 p-8 rounded-2xl'>
            <NavTop/>
            <SectionTop/>
        </div>
        <ScrollToTop/>
    </div>
  )
}
