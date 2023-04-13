/* Dependencies */
import { PropsWithChildren } from 'react'

export interface ButtonProps extends PropsWithChildren {
  /**
   * Class names to be appended
   */
  className?: string
  /**
   * Button disabled
   */
  disabled?: boolean
  /**
   * Button aria label
   */
  ariaLabel?: string
  /**
   * Button icon
   */
  icon?: React.ReactNode
  /**
   * Onclick handler
   */
  onClick?: Function
  /**
   * button Variant.
   */
  variant?: keyof typeof variants
  /**
   * button Variant.
   */
  size?: keyof typeof sizes
  /**
   * button Width
   */
  fullWidth?: boolean
  /**
   * Button Type
   */
  type?: 'button' | 'submit' | 'reset'
}

export interface Variants {
  plain: string
  primary: string
  secondary: string
  hollowAlert: string
  hollowPrimary: string
  hollowSecondary: string
}

export const variants: Variants = Object.freeze({
  primary:
    'shadow-sm bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  secondary:
    'shadow-sm bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  hollowAlert: 'border border-red-400 text-red-600 hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700',
  hollowPrimary:
    'shadow-sm border border-indigo-600 text-indigo-600 hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  hollowSecondary:
    'shadow-sm border border-gray-600 hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  plain: '',
})

export interface Sizes {
  slim: string
  base: string
  large: string
}
export const sizes: Sizes = Object.freeze({
  slim: '',
  base: 'leading-none px-6 py-3',
  large: 'text-2xl leading-none py-4 px-8',
})
