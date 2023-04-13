import Link from 'next/link';
import { CtaProps } from '@/components/Atoms/Cta/Cta.model';
export default function Cta({
  href,
  text,
  variant = 'primary',
  className,
}: CtaProps) {

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-within:outline-indigo-600',
    secondary: 'bg-white text-indigo-600 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-within:outline-indigo-600',
    hollow: 'bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-within:outline-indigo-600'
  }

  return (
    <Link href={href} className={`rounded-md font-semi bold inline-block text-center transition-colors duration-200 shadow-sm px-6 py-3 w-full lg:w-auto leading-none ${variants[variant]} ${className}`}>{text}</Link>
  )
}
