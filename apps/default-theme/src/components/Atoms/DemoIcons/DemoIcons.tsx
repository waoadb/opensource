import { FunctionComponent } from 'react';
import { IconModel } from './DemoIcons.model';
export const Icon: FunctionComponent<IconModel> = ({
  name,
  width,
  height,
  className,
  ariaVisible = false,
}) => {
  return (
    <svg
      aria-hidden={!ariaVisible}
      focusable={ariaVisible}
      className={`fill-current ${className ?? ''}`}
      viewBox={width && height ? `0 0 ${width} ${height}` : ''}
      width={width ?? ''}
      height={height ?? ''}
    >
      <use
        xlinkHref={`/assets/svg/demo-icons.svg#${name}`}
        href={`/assets/svg/demo-icons.svg#${name}`}
      />
    </svg>
  );
};
