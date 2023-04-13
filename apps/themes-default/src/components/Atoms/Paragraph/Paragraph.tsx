/* Dependencies */
import { FunctionComponent } from 'react';

// Models
import { getParagraphStyle, ParagraphProps } from './Paragraph.model';

/**
 * Paragraph component
 * @param props - Component props.
 */
export const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  variant,
  className,
}) => {
  const classNames = `${className || ''} ${getParagraphStyle(variant)}`;
  return <p className={classNames}>{children}</p>;
};
