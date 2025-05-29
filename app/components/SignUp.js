'use client';
import React, { useEffect, useRef, useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeModel from './ThreeJSModel';

gsap.registerPlugin(ScrollTrigger);

const SignUpComp = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const buttonGroupRef = useRef(null);
  const [auth, setAuth] = useState();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(buttonGroupRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: buttonGroupRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full px-6 py-12 bg-gray-50 flex flex-col-reverse lg:flex-row items-center justify-center gap-20">
      
      {/* Left: Auth section */}
      <div
        ref={containerRef}
        className="w-full max-w-md flex flex-col items-center lg:items-start cursor-pointer"
      >
        <div ref={headingRef} className="text-center lg:text-left">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
            Sign <span className="text-pink-600">Up.</span>
          </h1>
        </div>

        <div
          ref={buttonGroupRef}
          className="flex gap-4 text-lg md:text-xl mt-6 bg-purple-500 px-6 py-4 rounded-3xl text-white w-full justify-center"
        >
          <button
            className="hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700 transition duration-300 px-4 py-2 rounded cursor-pointer"
            onClick={() => setAuth('SignUp')}
          >
            Sign Up
          </button>
          <button
            className="hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700 transition duration-300 px-4 py-2 rounded cursor-pointer"
            onClick={() => setAuth('SignIn')}
          >
            Sign In
          </button>
        </div>

        <div className="mt-8 w-full">
          {auth === 'SignUp' ? (
            <SignUp routing="hash" />
          ) : (
            <SignIn routing="hash" />
          )}
        </div>
      </div>

      {/* Right: Model */}
      <div className="w-full max-w-md flex justify-center items-center h-[400px] md:h-[450px] lg:h-[500px]">
        <ThreeModel />
      </div>
    </div>
  );
};

export default SignUpComp;
