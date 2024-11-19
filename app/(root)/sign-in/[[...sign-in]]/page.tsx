import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#56CA00] to-[#37B7C0]">
      <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-lg p-8 lg:p-12 flex items-center justify-center lg:rounded-r-3xl shadow-2xl order-2 lg:order-1">
        <div className="w-full max-w-md">
          <SignIn forceRedirectUrl={"/redirect"} />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-8 lg:px-16 flex flex-col justify-center order-1 lg:order-2">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={200}
          className="rounded-full self-center mb-8"
        />
        <div className="text-white space-y-6 lg:space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-center lg:text-left">
            Bienvenue de retour !
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-gray-100 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            Connectez-vous pour accéder à votre compte.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sécurité garantie</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Accès rapide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page