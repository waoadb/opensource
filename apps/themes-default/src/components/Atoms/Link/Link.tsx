/* Dependencies */
import { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';

// Styles
const variants = Object.freeze({
  primary:
    'shadow-sm bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  secondary:
    'shadow-sm bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  hollowAlert:
    'border border-red-400 text-red-600 hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700',
  hollowPrimary:
    'shadow-sm border border-indigo-600 text-indigo-600 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  hollowSecondary:
    'shadow-sm border border-gray-600 hover:border-gray-500 hover:bg-grey-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  plain: '',
});

export const sizes = Object.freeze({
  slim: '',
  base: 'leading-none px-6 py-3',
  large: 'text-2xl leading-none py-4 px-8',
});

// Models
type LinkProps = PropsWithChildren<{
  /**
   * Class names to be appended
   */
  className?: string;
  /**
   * Accessible title
   */
  accessibleTitle?: string;
  /**
   * Icon to be shown
   */
  icon?: React.ReactNode;
  /**
   * Style Variant.
   */
  variant?: keyof typeof variants;
  /**
   * Size Variant.
   */
  size?: keyof typeof sizes;
  /**
   * Full Width
   */
  fullWidth?: boolean;
  /**
   * Link Url
   */
  href: string;
  /**
   * Target
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
}>;

/**
 * Link
 * @param props - Component props.
 */
export const Link = ({
  className,
  variant,
  size,
  children,
  fullWidth,
  icon,
  accessibleTitle,
  href,
  target,
}: LinkProps) => {
  return (
    <NextLink
      title={accessibleTitle}
      {...(target && { target })}
      className={classNames(
        'rounded-md font-semibold text-center transition-colors duration-200',
        className,
        {
          'inline-flex items-center': icon,
          'inline-block': !icon,
          'w-full': fullWidth,
        },
        variants[variant || 'primary'],
        sizes[size || 'base']
      )}
      href={href}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </NextLink>
  );
};
