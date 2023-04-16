/* Dependencies */
import { PropsWithChildren } from 'react';

// Models
type Props = PropsWithChildren<{
  /**
   * Sets the fieldset error.
   */
  error?: string;

  /**
   * Sets the fieldset contents as required.
   */
  required?: boolean;

  /**
   * Sets the fieldset title.
   */
  title: string;

  /**
   * Title Size
   */
  titleSize?: 'p' | 'h4';
}>;

/**
 * Fieldset Component
 */
export const FieldSet = ({
  children,
  error,
  title,
  titleSize,
  required,
}: Props) => {
  return (
    <div
      className={`w-full ${
        error ? 'border border-error border-solid p-1' : ''
      }`}
    >
      <fieldset className="block w-full">
        <legend className={`${titleSize ? titleSize : 'p'} w-full mt-0`}>
          {title} {required && <span className="text-primary">*</span>}
          {error && <span className="w-full text-error block">{error}</span>}
        </legend>
        {children}
      </fieldset>
    </div>
  );
};
