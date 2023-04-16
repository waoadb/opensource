/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { uniqueId } from '@/helpers/uniqueId/uniqueId';

// Models
export type Props = {
  /**
   * Disables the field.
   */
  disabled?: boolean;

  /**
   * Sets the field label.
   */
  label: string | JSX.Element;

  /**
   * Sets the field name.
   */
  name: string;

  /**
   * Field on change event handler.
   */
  onChange: Function;

  /**
   * Field on blur event handler.
   */
  onBlur: Function;

  /**
   * Sets the field as readonly.
   */
  readOnly?: boolean;

  /**
   * Sets the field as required.
   */
  required?: boolean;

  /**
   * Sets the item as selected by default.
   */
  selected?: boolean;

  /**
   * Sets the field value.
   */
  value: string;
};

/**
 * Radio
 * @param props - Component props
 * @returns
 */
export const Radio = ({
  disabled,
  label,
  name,
  onChange,
  onBlur,
  readOnly,
  required,
  selected,
  value,
}: Props) => {
  // State
  const id = useMemo(() => uniqueId(), []);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="flex gap-2 flex-row flex-nowrap items-center w-full cursor-pointer"
      >
        <input
          id={id}
          type="radio"
          name={name}
          className="transition-colors border-2 border-gray-400 checked:bg-indigo-600 hover:border-indigo-600 rounded-full focus:outline-indigo-600 hover:checked:bg-indigo-600 focus:checked:bg-indigo-600"
          onChange={onChange.bind(this)}
          onBlur={onBlur.bind(this)}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          defaultChecked={selected}
          value={value}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
