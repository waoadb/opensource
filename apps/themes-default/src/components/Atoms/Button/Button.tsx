/* Dependencies */
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

// Styles
const variants = Object.freeze({
  primary:
    'shadow-sm bg-indigo-600 text-white disabled:bg-indigo-200 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  secondary:
    'shadow-sm bg-gray-600 text-white disabled:bg-gray-200 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  hollowAlert:
    'border border-red-400 text-red-600 hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700',
  hollowPrimary:
    'shadow-sm border border-indigo-600 text-indigo-600 hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  hollowSecondary:
    'shadow-sm border border-gray-600 disabled:bg-gray-200 hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ',
  plain: '',
});

export const sizes = Object.freeze({
  slim: '',
  base: 'leading-none px-6 py-3',
  large: 'text-2xl leading-none py-4 px-8',
});

// Models
type ButtonProps = PropsWithChildren<{
  /**
   * Class names to be appended
   */
  className?: string;
  /**
   * Button disabled
   */
  disabled?: boolean;
  /**
   * Accessible title
   */
  accessibleTitle: string;
  /**
   * Button icon
   */
  icon?: React.ReactNode;
  /**
   * Onclick handler
   */
  onClick?: Function;
  /**
   * button Variant.
   */
  variant?: keyof typeof variants;
  /**
   * button Variant.
   */
  size?: keyof typeof sizes;
  /**
   * button Width
   */
  fullWidth?: boolean;
  /**
   * Button Type
   */
  type?: 'button' | 'submit' | 'reset';
}>;

/**
 * Button
 * @param props - Component props.
 */
export const Button = ({
  className,
  variant,
  size,
  disabled,
  onClick,
  children,
  fullWidth,
  type,
  icon,
  accessibleTitle,
}: ButtonProps) => {
  return (
    <button
      aria-label={accessibleTitle}
      type={type}
      disabled={disabled}
      onClick={onClick ? () => onClick() : undefined}
      className={classNames(
        'rounded-md font-semibold text-center transition-colors duration-200',
        className,
        variants[variant || 'primary'],
        sizes[size || 'base'],
        {
          'inline-flex items-center': icon,
          'inline-block': !icon,
          'w-full': fullWidth,
          'text-button-disabled hover:bg-button-disabled cursor-not-allowed':
            disabled,
        }
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
