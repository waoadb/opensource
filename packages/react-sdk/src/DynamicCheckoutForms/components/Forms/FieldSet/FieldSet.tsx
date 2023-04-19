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
  titleSize?: 'db-text-base' | 'db-text-xl';
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
      className={`db-w-full ${
        error ? 'db-border db-border-red-600 db-border-solid db-p-1' : ''
      }`}
    >
      <fieldset className="db-block db-w-full">
        <legend
          className={`${
            titleSize ? titleSize : 'db-text-base'
          } db-w-full db-mt-0`}
        >
          {title} {required && <span className="db-text-indigo-600">*</span>}
          {error && (
            <span className="db-w-full db-text-red-600 db-block">{error}</span>
          )}
        </legend>
        {children}
      </fieldset>
    </div>
  );
};
