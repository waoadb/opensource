import Link from 'next/link';
import Image from 'next/image';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Icon } from '@/components/Atoms/DemoIcons/DemoIcons';
import React from 'react';

export const Footer = () => {
  return (
    <footer className='bg-gray-200 block w-full'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col gap-4 mb-4 lg:flex-row items-center justify-between'>
          <div>
            <Link href={'/'} className='mb-4 block'><Image src='/demoLogo.svg' alt='' width={202}
                                                           height={40} /></Link>
            <div className="flex flex-col flex-wrap items-center justify-center lg:items-start gap-2">
              <Paragraph className='font-semibold flex-0 text-center'>Profile title</Paragraph>
              <ul className='lg:mt-2 flex flex-row flex-wrap gap-2'>
                <li>
                  <Link href={'https://facebook.com'} aria-label='Follow on facebook' className="inline-flex items-center justify-center bg-white rounded-full w-8 h-8 group hover:bg-indigo-600 transition-colors">
                    <Icon name='FacebookCircle' className="group-hover:fill-white"
                          width='18' height='18'
                          ariaVisible={false} />
                  </Link>
                </li>
                <li>
                  <Link href={'https://twitter.com'} aria-label='Follow on Twitter' className="inline-flex items-center justify-center bg-white rounded-full w-8 h-8 group hover:bg-indigo-600 transition-colors">
                    <Icon name='Twitter' className="group-hover:fill-white"
                          width='18' height='18'
                          ariaVisible={false} />
                  </Link>
                </li>
                <li>
                  <Link href={'https://instagram.com'} aria-label='Follow on Instagram' className="inline-flex items-center justify-center bg-white rounded-full w-8 h-8 group hover:bg-indigo-600 transition-colors">
                    <Icon name='Instagram' className="group-hover:fill-white"
                          width='18' height='18'
                          ariaVisible={false} />
                  </Link>
                </li>
              </ul>
            </div>

          </div>
          <ul className='flex flex-row flex-wrap items-center gap-4 mb-8'>
            <li>
              <Link href={'/whats-on'}
                    className='font-semibold opacity-80 transition-opacity hover:opacity-100 block'>What&apos;s
                on</Link>
            </li>
            <li>
              <Link href={'/venues'}
                    className='font-semibold opacity-80 transition-opacity hover:opacity-100 block'>Venues</Link>
            </li>
            <li>
              <Link href={'/about-us'}
                    className='font-semibold opacity-80 transition-opacity hover:opacity-100 block'>About us</Link>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4 mb-4 lg:flex-row items-center justify-between'>
          <Paragraph variant='small' className='inline-flex items-center gap-2 order-3 lg:-order-1'><Image
            src='/assets/differentBreedLogo.svg' alt='' width='24' height='24' /><span className="opacity-90"> Powered by Different
            Breed &reg;</span></Paragraph>
          <div className="order-1">
            <ul className='flex flex-row flex-wrap items-center gap-4'>
              <li>
                <Link href={'/terms-and-conditions'}
                      className='text-sm opacity-90 transition-opacity hover:opacity-100 block'>Terms &
                  Conditions</Link>
              </li>
              <li>
                <Link href={'/privacy-policy'}
                      className='text-sm opacity-90 transition-opacity hover:opacity-100 block'>Privacy
                  Policy</Link>
              </li>
              <li>
                <Link href={'/cookie-policy'}
                      className='text-sm opacity-90 transition-opacity hover:opacity-100 block'>Cookie
                  Policy</Link>
              </li>
            </ul>
          </div>
          <div className="order-2">
            <Paragraph variant='small' className="opacity-90">&copy; {new Date().getFullYear()} Profile name. All rights
              reserved.</Paragraph>
          </div>
        </div>
      </div>
    </footer>
  );
};
