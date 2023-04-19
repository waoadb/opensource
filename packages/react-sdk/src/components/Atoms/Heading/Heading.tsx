/* Dependencies */
import { FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'classnames';

// Styles
const variants = Object.freeze({
  h1: 'db-text-3xl md:db-text-5xl',
  h2: 'db-text-2xl md:db-text-3xl',
  h3: 'db-text-xl md:db-text-2xl',
  h4: 'db-text-lg md:db-text-xl',
  h5: 'db-text-base',
});

// Models
export type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = PropsWithChildren<{
  /**
   * Class names to be appended
   */
  className?: string;
  /**
   * Heading level
   */
  level?: Level;
  /**
   * Heading style
   */
  style?: keyof typeof variants;
  /**
   * Suppress hydration warning
   */
  suppressHydrationWarning?: boolean;
}>;

/**
 * Heading component
 * @param props - Component props.
 */
export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  level: El = 'h2',
  style = 'h2',
  className,
  suppressHydrationWarning = false,
}) => {
  return (
    <El
      className={classNames('db-font-semibold', className, variants[style])}
      {...(suppressHydrationWarning ? { suppressHydrationWarning: true } : {})}
    >
      {children}
    </El>
  );
};
