'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { LuSearch } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { HiMail } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { motion,AnimatePresence } from 'framer-motion'

export default function NavTop() {
    const pathname = usePathname()
    const [value, setValue] = useState('')
    const navArray = [
        {
            name: "Dashboard",
            link: "/"
        },
        {
            name: "Cases",
            link: "/cases"
        },
        {
            name: "Calender",
            link: "/calender"
        },
        {
            name: "Finance",
            link: "/finance"
        },
        // {
        //     name: "Hearings",
        //     link: "/hearings"
        // },
        
    ];
    const settingNavArray = [
        {
            name: "Profile Settings",
            link: "/profile_settings"
        },
        {
            name: "Team Management",
            link: "/team_management"
        },
        {
            name: "App Settings",
            link: "/app_settings"
        },
        {
            name: "Storage Management",
            link: "/storage_management"
        },
        {
            name: "Help & Support",
            link: "/help_support"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Logout",
            link: "/logout"
        },
        
    ];
    const [isOpen, setIsOpen] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

  return (
    <div>
        <div className='flex justify-between items-center'>
            <Link href="/" className='flex items-center gap-2 sm:w-[calc(33%-60px)] 2xl:w-1/3'>
                <div>
                    <Image src="/images/lawlogo.svg" alt="logo" width={30} height={30} />
                </div>
                <span className='font-semibold'>Kibria's Judiciary</span>
            </Link>
            <div className=' w-1/3 hidden md:block'>
            <div onClick={() => setShowProfile(false)} className='flex justify-center 2xl:gap-8 items-center'>
                {navArray.map((item, index) => (
                    <Link key={index} href={item.link} className={`${item.link === pathname ? "bg-gray-500/30" : ""} px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-300 cursor-pointer`}>
                        <p className='text-white'>{item.name}</p>
                    </Link>
                ))}
            </div>
            </div>
            <div className=' w-1/3 hidden md:block'>
            <div className='flex items-center justify-end gap-4'>
                <div className="2xl:w-[300px] w-[150px] flex justify-end relative group cursor-pointer">
                <div className="absolute mr-[12px] mt-[12px] z-10">
                    <LuSearch />
                </div>
                <input 
                    id="search"
                    type="text"
                    value={value}
                    onChange={(e) =>{setValue(e.target.value)}}
                    className={`${value ===''?'w-[40px] h-[40px]':'w-[300px] h-[40px]'}  group-focus-within:w-[300px] group-hover:w-[300px] bg-transparent border border-gray-500 rounded-full text-sm float-left text-white pl-[35px] transition-[width] duration-300 ease-in-out focus:outline-none placeholder:text-transparent group-focus-within:placeholder:text-gray-500 group-hover:placeholder:text-gray-500 `}
                    placeholder="Search..."
                    />
                </div>
                <Link href="/notifications" className='border border-gray-500 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-gray-500/30 transition-all duration-300'>
                    <IoNotifications className='text-xl' />
                </Link>
                <div  onClick={() => setShowProfile(!showProfile)} className='w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                    <Image className='object-cover w-full h-full' src="/images/profilepicture.jpg" alt="logo" width={30} height={30} />
                </div>
                </div>
            </div>
            <div className='block md:hidden'>
            <div className='flex items-center gap-3'>
                <Link href="/notifications" className='w-[30px] h-[30px] flex items-center justify-center cursor-pointer'>
                    <IoNotifications className='text-xl' />
                </Link>
                <button onClick={() => setShowProfile(!showProfile)}>
                    <div className='w-[30px] h-[30px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                        <Image className='object-cover w-full h-full' src="/images/profilepicture.jpg" alt="logo" width={20} height={20} />
                    </div>
                </button>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <AiOutlineClose className='text-white text-2xl cursor-pointer'/>
                    ) : (
                        <AiOutlineMenu className='text-white text-2xl cursor-pointer'/>
                    )}
                </button>
            </div>
            </div>
        </div>
        <div className='block md:hidden'>
            <AnimatePresence >
                {isOpen ? (
                    <motion.div
                    style={{ overflow: "hidden" }}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                    exit={{ height: 0 }}
                    >
                        <div onClick={() => {setShowProfile(false); setIsOpen(false);}} className='flex flex-col gap-2 py-5'>
                            {navArray.map((item, index) => (
                                <Link key={index} href={item.link} className={`${item.link === pathname ? "bg-gray-500/30" : ""} px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-300 cursor-pointer`}>
                                    <p className='text-white'>{item.name}</p>
                                </Link>
                            ))}
                        </div>
                        <div className="flex justify-end relative cursor-pointer">
                            <div className="absolute mr-[12px] mt-[12px] z-10">
                                <LuSearch />
                            </div>
                            <input 
                                id="search"
                                type="text"
                                value={value}
                                onChange={(e) =>{setValue(e.target.value)}}
                                className={`w-full h-[40px] bg-transparent border border-gray-500 rounded-full text-sm float-left text-white px-[30px] focus:outline-none`}
                                placeholder="Search..."
                                />
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
        <AnimatePresence >
                {showProfile ? (
                    <motion.div
                    style={{ overflow: "hidden" }}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                    exit={{ height: 0 }}
                    >
                     <div onClick={() => {setShowProfile(false); setIsOpen(false);}} className='flex flex-col gap-2 py-5'>
                            {settingNavArray.map((item, index) => (
                                <Link key={index} href={item.link} className={`${item.link === pathname ? "bg-gray-500/30" : ""} px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-300 cursor-pointer`}>
                                    <p className='text-white'>{item.name}</p>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
    </div>
  )
}
