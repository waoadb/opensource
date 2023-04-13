export type Variant = 'xs' | 'small' | 'base' | 'large' | 'xlarge';
export interface ParagraphProps extends React.PropsWithChildren {
  className?: string;
  variant?: Variant;
}

/**
 * Get the style associated with the paragraph.
 * @param variant - The variant of the paragraph.
 * @returns
 */
export const getParagraphStyle = (variant?: Variant): string => {
  switch (variant) {
    case 'xs': {
      return 'text-xs';
    }
    case 'small': {
      return 'text-sm';
    }
    case 'base': {
      return 'text-sm lg:text-base';
    }
    case 'large': {
      return 'text-base lg:text-lg';
    }
    default: {
      return '';
    }
  }
};
