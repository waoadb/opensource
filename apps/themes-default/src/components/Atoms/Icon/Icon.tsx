/* Dependencies */
export type IconModelNameType =
  | 'Toilet'
  | 'Orientation'
  | 'ChevronDown'
  | 'Exclamation'
  | 'Close'
  | 'EmailAt'
  | 'Linkedin'
  | 'Facebook'
  | 'Globe'
  | 'Filter'
  | 'ListIcon'
  | 'Wheelchair'
  | 'Captions'
  | 'Search'
  | 'ShoppingCart'
  | 'FacebookCircle'
  | 'Twitter'
  | 'Instagram'
  | 'Calendar'
  | 'Person'
  | 'ArrowFullLeft';

type Props = {
  name: IconModelNameType;
  className?: string;
  width?: number | string;
  height?: number | string;
  ariaVisible?: boolean;
  title: string;
};

export const Icon = ({
  name,
  width,
  height,
  className,
  ariaVisible = false,
  title,
}: Props) => {
  return (
    <svg
      aria-hidden={!ariaVisible}
      focusable={ariaVisible}
      className={`fill-current ${className ?? ''}`}
      viewBox={width && height ? `0 0 ${width} ${height}` : ''}
      width={width ?? ''}
      height={height ?? ''}
      xlinkTitle={title}
    >
      <use
        xlinkHref={`/assets/svg/demo-icons.svg#${name}`}
        href={`/assets/svg/demo-icons.svg#${name}`}
      />
    </svg>
  );
};
