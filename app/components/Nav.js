'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Nav = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="flex items-center md:justify-normal justify-center mb-5 bg-transparent p-5">
      <img
        ref={logoRef} 
        src="/logo.png"
        alt="Logo"
        height={100}
        width={100}
        className="rounded-3xl opacity-0 translate-y-[-20px]" 
      />
    </div>
  );
};

export default Nav;
