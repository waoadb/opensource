/* Dependencies */
import { useMemo } from 'react';
import classNames from 'classnames';

// Helpers
import { getDescribedBy } from '@/helpers/getDescribedBy/getDescribedBy';
import { uniqueId } from '@/helpers/uniqueId/uniqueId';

// Components
import { ToolTip } from '../../ToolTip/ToolTip';

// Models
import { InputAutoComplete } from '../Input/Input';

type Props = {
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
   * Sets the field maximum character limit.
   */
  maxLength?: number;

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
   * Shows and emits character counts on the field.
   */
  showCharCount?: boolean;

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

export const TextArea = ({
  autoFocus,
  autoComplete,
  disabled,
  error,
  icon,
  label,
  labelVisible = true,
  maxLength,
  minLength,
  name,
  onChange,
  onBlur,
  placeholder,
  readOnly,
  required,
  supportText,
  toolTip,
  value,
}: Props) => {
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
          <textarea
            id={id}
            name={name}
            onChange={onChange.bind(this)}
            onBlur={onBlur.bind(this)}
            aria-invalid={error ? true : false}
            aria-describedby={describedBy}
            maxLength={maxLength}
            minLength={minLength}
            required={required}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value || ''}
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
