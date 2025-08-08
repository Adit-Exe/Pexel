'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type'; // Alternative if no SplitText plugin

const AnimatedTextBox = () => {
  const textRef = useRef(null);
  const image = useRef(null);

  useGSAP(() => {
    if (textRef.current) {
      const split = new SplitType(textRef.current, { types: 'words' });

      gsap.fromTo(
        split.words,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 1,
        }
      );


      gsap.from(
        textRef.current,
        {
          opacity: 0,
          height: 0,
          duration: 1,
          delay: 1,
          ease: 'power4',
        }
      );


      gsap.from(
        image.current,
        {
          opacity: 0,
          duration: 2,
          ease: 'power4',
        }
      );

    }
  }, []);

  return (
    <>

      <div className="relative min-h-[600px] overflow-hidden flex justify-center items-center flex-col">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover rotate-180"
        >
          <source src="/images/bgv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div id="hro" className="flex md:gap-40 gap-1 justify-center items-center md:flex-row flex-col p-10 mt-[-100px]">
          <img ref={image} src="/images/logo.png" className="h-36 md:scale-100 scale-50" />
          <pre ref={textRef} className="text-white w-96 md:scale-100 scale-75 text-wrap font-sans text-center p-5 backdrop-blur-2xl rounded-3xl bg-[#ffffff0e] border-2 border-[#ffffff62]">
            The Pexels API enables programmatic access to the full Pexels content library, including photos, videos. All content is available free of charge, and you are welcome to use Pexels content for anything you'd like, as long as it is within our Guidelines.
            The Pexels API is a RESTful JSON API, and you can interact with it from any language or framework with a HTTP library. Alternately, Pexels maintains some official Client Libraries you can use.
          </pre>
        </div>
        <div className='h-56 bg-gradient-to-b from-transparent via-[#ffffff4f] to-white absolute bottom-0 w-full '></div>
      </div>

    </>

  );
};

export default AnimatedTextBox;
