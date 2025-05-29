'use client';

import React, { useRef, useEffect } from 'react';
import { Josefin_Sans } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Problem = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      paraRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: paraRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div className={`flex justify-evenly items-center ${josefin.className} mt-20 w-full flex-wrap px-6`}>
      <div className="max-w-2xl">
        <h1 ref={headingRef} className="font-semibold md:text-7xl text-5xl mb-4">
          The <span className="text-pink-700 font-bold">Problem.</span>
        </h1>
        <p ref={paraRef} className="md:text-2xl text-xl">
          The problem I identified was that despite all the recent cases of cruelty against women, their cries are
          deafened by loud rallies of politicians, claiming to do something about the problem but forgetting about it as
          soon as they come in power. We forget crimes as soon as they take place, providing them just some news
          coverage but never doing any serious efforts to stop cruelty against women.
        </p>
      </div>
      <img
        ref={imgRef}
        src="/download.jpg"
        alt=""
        className="mt-7 rounded-3xl shadow-lg"
        height={300}
        width={300}
      />
    </div>
  );
};

export default Problem;
