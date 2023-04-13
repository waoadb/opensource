/* Dependencies */
import { createElement, FunctionComponent } from 'react';

// Models
import { getHeadingStyle, HeadingProps } from './Heading.model';

/**
 * Heading component
 * @param props - Component props.
 */
export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  level,
  style,
  className,
}) => {
  const classNames = `font-semibold ${getHeadingStyle(style ?? level)} ${
    className || ''
  } `;

  return createElement(level, { className: classNames }, children);
};
