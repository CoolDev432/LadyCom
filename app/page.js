'use client'

import React from 'react'
import Hero from './components/Hero'
import gsap from 'gsap'
import Problem from './components/What'
import Solution from './components/Solution'
import SignUpComp from './components/SignUp'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { FeaturesSectionDemo } from './components/Features'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Problem/>
        <Solution/>
        <div className='flex justify-center mt-20'>
          <h1 className='text-5xl font-bold text-pink-600'>
          Feautures.
          </h1>
        </div>
        <FeaturesSectionDemo/>
        <SignedOut>
        <SignUpComp/>
        </SignedOut>
    </div>
  )
}

export default Home