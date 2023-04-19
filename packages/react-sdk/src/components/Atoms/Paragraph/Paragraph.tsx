/* Dependencies */
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

// Styles
const variants = Object.freeze({
  xs: 'db-text-xs',
  small: 'db-text-sm',
  base: 'db-text-sm lg:db-text-base',
  large: 'db-text-base lg:db-text-lg',
});

// Models
type ParagraphProps = PropsWithChildren<{
  /**
   * Class names to be appended
   */
  className?: string;
  /**
   * Paragraph style
   */
  style?: keyof typeof variants;
  /**
   * Suppress hydration warning
   */
  suppressHydrationWarning?: boolean;
}>;

/**
 * Paragraph component
 * @param props - Component props.
 */
export const Paragraph = ({
  children,
  className,
  style = 'base',
  suppressHydrationWarning = false,
}: ParagraphProps) => {
  return (
    <p
      className={classNames(className, variants[style])}
      {...(suppressHydrationWarning ? { suppressHydrationWarning: true } : {})}
    >
      {children}
    </p>
  );
};
