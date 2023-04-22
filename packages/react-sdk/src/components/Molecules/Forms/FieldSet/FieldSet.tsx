/* Dependencies */
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

// Styles
const variants = Object.freeze({
  h1: 'db-text-3xl md:db-text-5xl',
  h2: 'db-text-2xl md:db-text-3xl',
  h3: 'db-text-xl md:db-text-2xl',
  h4: 'db-text-lg md:db-text-xl',
  h5: 'db-text-base',
  base: 'db-text-base',
});

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
  titleSize?: keyof typeof variants;
}>;

/**
 * Fieldset Component
 */
export const FieldSet = ({
  children,
  error,
  title,
  titleSize = 'base',
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
          className={classNames(
            'db-w-full db-font-semibold',
            variants[titleSize]
          )}
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
