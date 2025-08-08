'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedBox = () => {
  const boxRef = useRef(null);

   useGSAP(() => {
    if (boxRef.current) {
      const divs = boxRef.current.querySelectorAll('div');

      divs.forEach((div, index) => {
        gsap.fromTo(
          div,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            // delay: index * 0.2,
            stagger : 0.2,
            scrollTrigger: {
              trigger: div,
              start: 'top 90%',
            }
          }
        );
      });
    }
  }, [boxRef]);




  return (
    <div ref={boxRef} className="space-y-6 px-4 pb-10 bg-[#CBD9E6]">
      <div id='con'>
        <h1 className="font-bold text-xl py-2">About Us</h1>
        <p className='text-sm sm:text-xl'>
          Pexels provides high quality and completely free stock photos licensed under the Pexels license. All photos are nicely tagged, searchable and also easy to discover through our discover pages.
        </p>
      </div>

      <div>
        <h1 className="font-bold text-xl py-2">Photos</h1>
        <p className='text-sm sm:text-xl'>
          We have hundreds of thousands free stock photos and every day new high resolution photos will be added. All photos are hand-picked from photos uploaded by our users or sourced from free image websites.
        </p>
      </div>

      <div>
        <h1 className="font-bold text-xl py-2">Photo Sources</h1>
        <p className='text-sm sm:text-xl'>
          Only free images from our community of photographers are added to our photo database. We constantly try to deliver as many high quality free stock photos as possible to the creatives who use our website.
        </p>
      </div>

      <div>
        <h1 className="font-bold text-xl py-2">Team</h1>
        <p className='text-sm sm:text-xl'>
          Pexels is run by Bruno Joseph, Ingo Joseph and Daniel Frese. Bruno and Ingo co-founded Pexels together in 2014 and Daniel joined them in 2015.
        </p>
      </div>

      <div>
        <h1 className="font-bold text-xl py-2">Mission</h1>
        <p className='text-sm sm:text-xl'>
          We help millions of designers, writers, artists, programmers and other creators to get access to beautiful photos that they can use freely which empowers them to create amazing products, designs, stories, websites, apps, art and other work.
        </p>
      </div>
    </div>
  );
};

export default AnimatedBox;
