'use client';

import React, { useRef, useEffect } from 'react';
import { Josefin_Sans } from "next/font/google";
import gsap from 'gsap';
import { SignedIn, UserButton, SignOutButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Hero = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.5, delay: 1.3 ,  ease: 'power3.out' } });

    tl.fromTo(headingRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0 })
      .fromTo(paraRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.5")
      .fromTo(imgRef.current, { opacity: 0, y: 30 }, { opacity: 0.65, y: 0 }, "-=0.5");

  })

  return (
    <div
      className={`relative flex items-end justify-start w-full min-h-screen bg-[url('/woman.jpeg')] bg-cover bg-center bg-no-repeat px-6 py-10 ${josefin.className}`}
    >
      <div className="relative z-10 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-white text-left w-full max-w-full">
        <h1
          ref={headingRef}
          className="text-7xl sm:text-5xl md:text-6xl lg:text-9xl font-bold mb-4 opacity-0"
        >
          LadyCom
        </h1>
        <p
          ref={paraRef}
          className="text-lg sm:text-4xl md:text-4xl opacity-0"
        >
          Together, We Fear Less.
        </p>
      <div className='mt-10'>
        <SignedIn>
          <div className='flex items-center'>
            <UserButton/>
            <Link href={'/dashboard'}>
            <Button variant={'ghost'} className={'ml-5 cursor-pointer'}>
              Dashboard
            </Button>
            </Link>

            <SignOutButton>
            <Button variant={'destructive'} className={'cursor-pointer ml-5'}>
                Sign Out
            </Button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
      </div>
    </div>
  );
};

export default Hero;
