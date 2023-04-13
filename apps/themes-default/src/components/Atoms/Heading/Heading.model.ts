export type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.PropsWithChildren {
  className?: string;
  level: Level;
  style?: Level;
}

/**
 * Get the style associated with the heading.
 * @param level - The level of the heading.
 * @returns
 */
export const getHeadingStyle = (level?: Level): string => {
  switch (level) {
    case 'h1': {
      return 'text-3xl md:text-5xl';
    }
    case 'h2': {
      return 'text-2xl md:text-3xl';
    }
    case 'h3': {
      return 'text-xl md:text-2xl';
    }
    case 'h4': {
      return 'text-lg md:text-xl';
    }
    case 'h5': {
      return 'text-base';
    }
    default: {
      return '';
    }
  }
};
