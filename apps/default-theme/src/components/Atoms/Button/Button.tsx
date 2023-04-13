import { ButtonProps, variants, sizes } from './Button.model';
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
    ariaLabel,
}: ButtonProps) => {
  return <button
    aria-label={ariaLabel}
    type={type}
    disabled={disabled}
    onClick={onClick ? () => onClick() : undefined}
    className={`rounded-md font-semibold ${icon ? 'inline-flex items-center' : 'inline-block'} text-center transition-colors duration-200
    ${variants[variant || 'primary']} 
    ${sizes[size || 'base']} 
    ${className}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'text-button-disabled bg-button-disabled hover:bg-button-disabled' : ''}
    `}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>;
};
