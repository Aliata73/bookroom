import Link from 'next/link';
import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";




const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gray-100 py-6">
      <div className="flex items-center flex-wrap gap-y-3 justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
           
         {currentYear}    &copy; 
          تمامی حقوق برای رومان محفوظ است.
        </p>
        <div className='flex items-center gap-3'>
            <Link href='https://instagram.com/atarod_alii' className='px-2 py-1 bg-[#251a18] text-white rounded-md hover:scale-105 transition-all duration-500'>
            
            <FaInstagram  />
            </Link>
            <Link href='https://github.com/Aliata73' className='px-2 py-1 bg-[#251a18] text-white rounded-md hover:scale-105 transition-all duration-500'>
            
            <FaGithub  />
            </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer