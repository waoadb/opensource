/* Dependencies */
import { useMemo } from 'react';
import classNames from 'classnames';

// Helpers
import { getDescribedBy } from '../../../helpers/getDescribedBy/getDescribedBy';
import { uniqueId } from '../../../helpers/uniqueId/uniqueId';

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
  // State
  const id = useMemo(() => uniqueId(), []);

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
        <span className="db-w-full db-relative">
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
            className={classNames(
              'db-block db-w-full db-box-border db-rounded-md',
              {
                'db-pl-10': icon,
                'db-pl-4': !icon,
              }
            )}
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
            <span className="db-absolute db-left-2 db-top-1/2 db--translate-y-1/2 db-h-full db-flex db-flex-col db-items-center db-justify-center db-overflow-hidden db-w-8 db-opacity-70 db-pointer-events-none db-select-none">
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
    </>
  );
};
