'use client'

import { Facebook, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'
import { Cedarville_Cursive } from 'next/font/google'

const cedarville = Cedarville_Cursive({
  weight: '400',
  subsets: ['latin'],
})

export default function Footer() {
  return (
    <footer className="bg-[#191C1D] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
              <img src="/logo.svg" alt="Nouni Cleaning" className="w-32" />
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#56CA00] transition duration-300">
              <Facebook />
            </a>
            <a href="#" className="hover:text-[#56CA00] transition duration-300">
              <Twitter />
            </a>
            <a href="#" className="hover:text-[#56CA00] transition duration-300">
              <Instagram />
            </a>
          </div>
        </div>
        <hr className="border-gray-700 my-6" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Nouni Cleaning. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#56CA00] transition duration-300 mr-4">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#56CA00] transition duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}