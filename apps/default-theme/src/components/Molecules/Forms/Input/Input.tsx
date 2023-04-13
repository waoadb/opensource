import { InputProps } from './Input.model';
export const Input = ({
  id,
  name,
  type = 'text',
  labelVisible = false,
  placeholder,
  icon,
  value = '',
  labelClassName = '',
  inputClassName = '',
  onChange,
}: InputProps) => {
  return (
    <label htmlFor={id} className={` ${icon ? 'relative' : ''} ${labelClassName}`}>
      {placeholder && <span className={labelVisible ? 'block' : 'sr-only'}>{placeholder}</span>}
      <span className="relative block w-full box-border">
        <input type={type} id={id} name={name ?? id} onChange={onChange} placeholder={placeholder} value={value} className={`p-2 block w-full box-border rounded-md ${inputClassName} ${icon ? 'pl-10': 'pl-4'}`}/>
          {icon && <span className="absolute left-2 top-0 h-full flex flex-col items-center justify-center overflow-hidden w-8 opacity-70 pointer-events-none select-none">
          {icon}
        </span>}
      </span>
    </label>
  );
};
