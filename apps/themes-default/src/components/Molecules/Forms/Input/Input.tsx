/* Dependencies */
import { useMemo } from 'react';
import classNames from 'classnames';

// Helpers
import { getDescribedBy } from '@/helpers/getDescribedBy/getDescribedBy';

// Components
import { ToolTip } from '../../ToolTip/ToolTip';

// Models
export type InputType =
  | 'text'
  | 'email'
  | 'number'
  | 'tel'
  | 'search'
  | 'password'
  | 'url'
  | 'date';

export type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

export type InputAutoComplete =
  | 'on'
  | 'name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization'
  | 'organization-title'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo';

type InputProps = {
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
   * Icon
   */
  icon?: React.ReactNode;

  /**
   * ID to be used
   */
  id: string;

  /**
   * Sets the input mode for the field.
   */
  inputMode: InputMode;

  /**
   * Sets the field label.
   */
  label: string;

  /**
   * Label Visible
   */
  labelVisible?: boolean;

  /**
   * Sets the maximum number value allowed for the field.
   */
  max?: number;

  /**
   * Sets the field maximum character limit.
   */
  maxLength?: number;

  /**
   * Sets the minimum number value allowed for the field.
   */
  min?: number;

  /**
   * Sets the field minimum character limit.
   */
  minLength?: number;

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
   * Sets the field placeholder.
   */
  placeholder?: string;

  /**
   * Sets the field as readonly.
   */
  readOnly?: boolean;

  /**
   * Sets the field as required.
   */
  required?: boolean;

  /**
   * Sets the support text on the field.
   */
  supportText?: string;

  /**
   * Sets the tooltip content for the field.
   */
  toolTip?: string;

  /**
   * Sets the type of input for the field.
   */
  type: InputType;

  /**
   * Sets the field value.
   */
  value: string | number;
};

export const Input = ({
  autoFocus,
  autoComplete,
  disabled,
  error,
  icon,
  id,
  inputMode,
  label,
  labelVisible = true,
  max,
  maxLength,
  min,
  minLength,
  name,
  onChange,
  onBlur,
  placeholder,
  readOnly,
  required,
  supportText,
  toolTip,
  type,
  value,
}: InputProps) => {
  // Set the Tool tip on ID Change
  const describedBy = useMemo(
    () => getDescribedBy({ error, id, name, supportText, toolTip }),
    [id, error, name, supportText, toolTip]
  );

  return (
    <div className="w-full">
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
        <span className="relative block w-full box-border">
          <input
            id={id}
            type={type}
            name={name}
            onChange={onChange.bind(this)}
            onBlur={onBlur.bind(this)}
            aria-invalid={error ? true : false}
            aria-describedby={describedBy}
            max={max}
            maxLength={maxLength}
            min={min}
            minLength={minLength}
            required={required}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value || value === 0 ? value : ''}
            inputMode={inputMode ? inputMode : 'text'}
            className={classNames('block w-full box-border rounded-md', {
              'pl-10': icon,
              'pl-4': !icon,
            })}
          />
          {icon && (
            <span className="absolute left-2 top-0 h-full flex flex-col items-center justify-center overflow-hidden w-8 opacity-70 pointer-events-none select-none">
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
    </div>
  );
};
