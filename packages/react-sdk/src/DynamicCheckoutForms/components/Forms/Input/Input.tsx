/* Dependencies */
import { useMemo } from 'react';
import classNames from 'classnames';

// Helpers
import { getDescribedBy } from '../../../helpers/getDescribedBy/getDescribedBy';

// Components
import { ToolTip } from '../../ToolTip/ToolTip';
import { uniqueId } from '../../../helpers/uniqueId/uniqueId';

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
  // State
  const id = useMemo(() => uniqueId(), []);

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
              'db-pr-8': toolTip,
              'db-block': labelVisible,
              'db-sr-only': !labelVisible,
            },
            'db-min-h-[30px] db-text-base'
          )}
        >
          {label}
          {required && <span className="db-text-indigo-500 db-ml-1">*</span>}
        </span>
        {toolTip && (
          <span className="db-w-auto db-absolute db-top-0 db-right-0">
            <ToolTip
              content={toolTip}
              position="top-end"
              id={`${id}_${name}-tooltip`}
            ></ToolTip>
          </span>
        )}
        <span className="db-relative db-block db-w-full db-box-border">
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
            className={classNames(
              'db-block db-w-full db-box-border db-rounded-md',
              {
                'db-pl-10': icon,
                'db-pl-4': !icon,
              }
            )}
          />
          {icon && (
            <span className="db-absolute db-left-2 db-top-0 db-h-full db-flex db-flex-col db-items-center db-justify-center db-overflow-hidden db-w-8 db-opacity-70 db-pointer-events-none db-select-none">
              {icon}
            </span>
          )}
        </span>
      </label>
      {(error || supportText) && (
        <div className="db-w-full db-flex db-flex-row db-items-start db-mt-2">
          <small
            className={classNames('db-w-full db-text-sm', {
              'db-text-red-600': error,
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
