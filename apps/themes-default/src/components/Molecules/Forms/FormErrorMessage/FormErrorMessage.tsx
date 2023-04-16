/* Dependencies */
import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

// Component

// Models
import { FormErrorMessageProps } from './FormErrorMessage.model';

/**
 * Handles errors on the form and shows a related message.
 * @returns
 */
export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  propMatch,
  errors,
  touched,
}) => {
  const [errorMessage, setError] = useState<string | null>(null);

  /**
   * Lifecycle - Mount
   */
  useEffect(() => {
    const fieldsToFix: string[] = [];

    // Form the fields to fix.
    Object.keys(errors).forEach((key) => {
      if (key && touched[key]) {
        fieldsToFix.push(propMatch[key] || key);
      }
    });

    // Form the error messages.
    if (fieldsToFix.length) {
      setError(`Please fix the following fields: ${fieldsToFix.join(', ')}.`);
      return;
    }

    setError(null);
  }, [errors, touched, propMatch]);

  return (
    <>
      {errorMessage && (
        <div className="form-error-highlight w-full mb-2 p-2 bg-red-600 text-white">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
};
