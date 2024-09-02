"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import zenLogo from '@/public/image.svg';
import EnterKeyOrionIcon from '@/components/enter-icon';
import AvatarStack from '@/components/avatar-stack';
import ExpandingArrow from '@/components/expanding-arrow';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      // Validate URL length
      if (url.length > 2048) {
        alert('URL is too long');
        return;
      }

      try {
        console.log('Sending URL:', url);
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          if (response.status === 431) {
            alert('URL is too long');
          } else {
            throw new Error('Failed to extract content');
          }
        }

        const data = await response.json();
        // Store data in localStorage
        localStorage.setItem('articleData', JSON.stringify(data));
        // Navigate to read view
        router.push('/read');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-4 left-4 flex items-center space-x-1">
        <Image 
          src={zenLogo} 
          alt="Zen Logo" 
          width={50} 
          height={50} 
        />
        <span className="text-xl font-semibold">Zen Read</span>
      </div>
      <div
        className="group mt-20 sm:mt-0 rounded-full flex space-x-2 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <AvatarStack/>
        <p className="mt-1">100+ ppls are already using</p>
        <ExpandingArrow />
      </div>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Zen Read
      </h1>
      <p className="font-light text-gray-600 w-full max-w-lg text-center">
        A simple, clean, and distraction-free reading experience.
      </p>
    
      <div className="flex justify-center space-x-5 pt-5 mt-5 w-full max-w-xl text-gray-600">
        <form onSubmit={handleSubmit} className="w-full max-w-md relative">
          <div className="relative">
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://article-url.com"
              autoComplete="off" 
              className="bg-white h-10 w-full px-5 pr-10 rounded-lg text-sm focus:outline-none" 
              required
            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
              <EnterKeyOrionIcon />
            </button>
          </div>
        </form>
      </div>
      <div className="sm:absolute sm:bottom-0 mb-1 lg:bottom-0 w-full px-20 py-10 flex justify-between">
        &copy; {new Date().getFullYear()} Zen Read
        <Link
          href="
          "
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}