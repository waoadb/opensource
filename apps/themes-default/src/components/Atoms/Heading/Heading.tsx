/* Dependencies */
import { createElement, FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'classnames';

// Styles
const variants = Object.freeze({
  h1: 'text-3xl md:text-5xl',
  h2: 'text-2xl md:text-3xl',
  h3: 'text-xl md:text-2xl',
  h4: 'text-lg md:text-xl',
  h5: 'text-base',
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
}>;

/**
 * Heading component
 * @param props - Component props.
 */
export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  level = 'h2',
  style = 'h2',
  className,
}) => {
  return createElement(
    level,
    { className: classNames('font-semibold', className, variants[style]) },
    children
  );
};
