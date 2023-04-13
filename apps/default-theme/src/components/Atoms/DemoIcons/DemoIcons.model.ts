export type IconModelNameType = 'Toilet' | 'Orientation' | 'ChevronDown' | 'Exclamation' | 'Close' | 'EmailAt' | 'Linkedin' | 'Facebook' | 'Globe' | 'Filter' | 'ListIcon' | 'Wheelchair' | 'Captions' | 'Search' | 'ShoppingCart' | 'FacebookCircle' | 'Twitter' | 'Instagram' | 'Calendar' | 'Person' | 'ArrowFullLeft';

export type IconModel = {
  name: IconModelNameType;
  className?: string;
  width?: number | string;
  height?: number | string;
  ariaVisible?: boolean;
};
