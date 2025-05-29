'use client';

import React, { useEffect, useRef } from 'react';
import { Josefin_Sans } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Solution = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={`${josefin.className} overflow-hidden px-4 md:px-12`}>
      <div className="bg-pink-500 rounded-3xl text-white mx-auto mt-16 transform -rotate-2 w-full max-w-6xl h-40 md:h-48 px-6 md:px-12 flex justify-center items-center text-4xl md:text-5xl font-bold shadow-lg">
        My Solution: LadyCom.
      </div>
      <div className="flex justify-center -rotate-2 mt-4 md:mt-6">
        <p className="text-center w-full max-w-4xl px-4 md:px-8 text-base md:text-xl text-gray-800 font-medium leading-relaxed">
          <span className="text-pink-600 font-bold">LadyCom</span> is a community of women supporting each other during tough times,
          sharing stories, and raising their voices to be heard. By joining this movement, you’re not just speaking out —
          you’re becoming a part of something powerful. One voice may not change the world, but a united community will.
        </p>
      </div>
    </div>
  );
};

export default Solution;
