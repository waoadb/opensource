/* Dependencies */
import { useMemo } from 'react';
import classNames from 'classnames';

// Helpers
import { getDescribedBy } from '@/helpers/getDescribedBy/getDescribedBy';

// Components
import { ToolTip } from '../../ToolTip/ToolTip';
import { InputAutoComplete } from '../Input/Input';

// Models
type SelectProps = {
  /**
   * Toggles auto focus on the field at load.
   */
  autoFocus?: boolean;

  /**
   * Sets the auto complete setting on the field.
   */
  autoComplete?: InputAutoComplete;

  /**
   * Disables the field.
   */
  disabled?: boolean;

  /**
   * Sets the error state on the field.
   */
  error?: string;

  /**
   * ID to be used
   */
  id: string;

  /**
   * Icon
   */
  icon?: React.ReactNode;

  /**
   * Sets the field label.
   */
  label: string;

  /**
   * Label Visible
   */
  labelVisible?: boolean;

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
   * Sets the input fields options.
   */
  options: {
    /**
     * The title of the option.
     */
    key: string;

    /**
     * The option value.
     */
    value: string;

    /**
     * Sets the option as the selected item.
     */
    selected?: boolean;
  }[];

  /**
   * Sets the field placeholder.
   */
  placeholder?: string;

  /**
   * Sets the field as required.
   */
  required?: boolean;

  /**
   * Sets the field as read only.
   */
  readOnly?: boolean;

  /**
   * Sets the support text on the field.
   */
  supportText?: string;

  /**
   * Sets the tooltip content for the field.
   */
  toolTip?: string;

  /**
   * Sets the field value.
   */
  value: string;
};

/**
 * Forms: Select
 * @param props - Component Props
 */
export const Select = ({
  autoFocus,
  autoComplete,
  disabled,
  error,
  icon,
  id,
  label,
  labelVisible = true,
  name,
  onChange,
  onBlur,
  options,
  placeholder,
  required,
  supportText,
  toolTip,
  value,
  readOnly = false,
}: SelectProps) => {
  // Set the Tool tip on ID Change
  const describedBy = useMemo(
    () => getDescribedBy({ error, id, name, supportText, toolTip }),
    [id, error, name, supportText, toolTip]
  );

  return (
    <>
      <label htmlFor={id} className="w-full relative">
        <span
          className={classNames(
            {
              'pr-8': toolTip,
              block: labelVisible,
              'sr-only': !labelVisible,
            },
            'min-h-[30px] text-base'
          )}
        >
          {label}
          {required && <span className="text-indigo-500 ml-1">*</span>}
        </span>
        {toolTip && (
          <span className="w-auto absolute top-0 right-0">
            <ToolTip
              content={toolTip}
              position="top-end"
              id={`${id}_${name}-tooltip`}
            ></ToolTip>
          </span>
        )}
        <span className="w-full relative">
          <select
            id={id}
            name={name}
            onChange={onChange.bind(this)}
            onBlur={onBlur.bind(this)}
            aria-invalid={error ? true : false}
            aria-describedby={describedBy}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value ? value : ''}
            className={classNames('block w-full box-border rounded-md', {
              'pl-10': icon,
              'pl-4': !icon,
            })}
          >
            {placeholder && (
              <option disabled value="">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={`${id}_${option.value}`}
                defaultChecked={option.selected}
                value={option.value}
                disabled={readOnly}
              >
                {option.key}
              </option>
            ))}
          </select>
          {icon && (
            <span className="absolute left-2 top-1/2 -translate-y-1/2 h-full flex flex-col items-center justify-center overflow-hidden w-8 opacity-70 pointer-events-none select-none">
              {icon}
            </span>
          )}
        </span>
      </label>
      {(error || supportText) && (
        <div className="w-full flex flex-row items-start mt-2">
          <small
            className={classNames('w-full text-sm', {
              'text-red-600': error,
            })}
            id={`${id}_${name}-help`}
          >
            {!error ? supportText : error}
          </small>
        </div>
      )}
    </>
  );
};
