import { SelectProps } from '@/components/Molecules/Forms/Select/Select.model';

export const Select = ({
   id,
   name,
   icon,
   placeholder,
   label,
   labelVisible = false,
   labelClassName = '',
   selectClassName = '',
   onChange,
   options,
}: SelectProps) => {
  return (
    <label htmlFor={id} className={` ${icon ? 'relative' : ''} ${labelClassName}`}>
      {label && <span className={labelVisible ? 'block' : 'sr-only'}>{label}</span>}
      <select id={id} name={name ?? id} onChange={onChange} className={`p-2 block w-full box-border rounded-md ${selectClassName} ${icon ? 'pl-10': 'pl-4'}`}>
        {placeholder && (<option hidden>{placeholder}</option>)}
        {options.map((option, i) => (
          <option key={option.text + i.toString()} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {icon && <span className="absolute left-2 top-0 h-full flex flex-col items-center justify-center overflow-hidden w-8 opacity-70 pointer-events-none select-none">
        {icon}
      </span>}
    </label>
  );
};
