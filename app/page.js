'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { createClient } from 'pexels';

import Hero from './Components/hero.js';
import Footer from './Components/footer.js';

const client = createClient('KtkhIAkhgmtfD1uC3VCJ2viFZXHtav2KvfnxkM3ogCIAkY0fni7r6gRc');

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const formRef = useRef(null);

  useGSAP(() => {
    if (formRef.current) {
      const [input, button] = formRef.current.querySelectorAll('input, button');

      // Animate the whole form
      gsap.from(
        formRef.current,
        { opacity: 0, duration: 1, width: 0, delay: 2, ease: 'power4' }
      );

      // Animate input and button separately for staggered effect
      gsap.from(
        input,
        { x:100, opacity: 0, duration: 1, delay: 2, ease: 'power1' }
      );

      gsap.fromTo(
        button,
        {opacity: 0},
        { opacity:1 , delay:2, ease: 'power1'}
      );
    }
  }, []);

  const fetchData = async (page = 1) => {
    try {
      const response = await client.photos.search({ query, per_page: 20, page });
      if (response.photos && response.photos.length > 0) {
        setPhotos(prevPhotos => page === 1 ? response.photos : [...prevPhotos, ...response.photos]);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setPhotos([]);
    fetchData(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Hero />
      
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6s..."
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      >

      </link>
      <div className='flex justify-center items-center flex-col gap-5'>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='bg-[#ffffff00] border-[3px] border-white w-fit flex p-2 rounded-full m-16 md:scale-100 sm:scale-75 scale-[0.7] absolute top-[400px]'
        >
          <input
            placeholder='Search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='rounded-full placeholder:px-2 w-96 focus:outline-none text-white bg-transparent placeholder:text-white'
          />
          <button type="submit" className='bg-transparent text-[20px] px-2  focus:border-none rounded-full active:text-white transition-all text-white active:text-transparent'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      <div className='flex items-center justify-center flex-col pt-10 bg-white'>
        <div id='con' className='columns-[150px] sm:columns-[250px] z-10'>
          {photos.map(photo => (
            <div className='shadow-xl rounded-md w-fit' key={photo.id}>
              <img
                src={photo.src.medium}
                alt={photo.alt}
                width='250px'
                className='rounded-md cursor-pointer mb-5'
                onClick={() => downloadImage(photo.src.original)}
              />
            </div>
          ))}
        </div>
        <button onClick={handleLoadMore} className='bg-white px-4 rounded-full shadow-xl p-2 shadow-slate-200 mt-10 active:text-white transition-all z-10 scale-75 md:scale-100'>
          Load more
        </button>
      </div>

      <div className='h-56 bg-gradient-to-b from-white to-[#CBD9E6] w-full'> </div>
      <Footer />
    </>
  );
}
