/* Dependencies */
import React, { useState, useEffect } from 'react';
import { FormikErrors, FormikTouched } from 'formik';

// Models
type PropMatch = {
  [key: string]: any | { [key: string]: any };
};

type Props = {
  /**
   * A Key to value map for name and display text values.
   * Key is the field name and value is the display name.
   */
  propMatch: PropMatch;
  /**
   * The formik errors object.
   */
  errors: FormikErrors<any>;
  /**
   * The formik touched object.
   */
  touched: FormikTouched<any>;
};

/**
 * Handles errors on the form and shows a related message.
 * @returns
 */
export const FormErrorMessage = ({ propMatch, errors, touched }: Props) => {
  const [errorMessage, setError] = useState<string | null>(null);

  /**
   * Lifecycle - Mount
   */
  useEffect(() => {
    const fieldsToFix: string[] = [];

    // Loop through the errors.
    for (const key in errors) {
      // Array
      if (Array.isArray(errors[key])) {
        if (key && touched[key]) {
          fieldsToFix.push(propMatch[key] || key);
        }
      }
      // Nested object
      else if (typeof errors[key] === 'object') {
        // Loop through the nested object.
        for (const nestedKey in errors[key] as Object) {
          // Check if the field is touched.
          if (
            touched[key] &&
            // @ts-ignore
            touched[key][nestedKey] &&
            propMatch[key] &&
            propMatch[key][nestedKey]
          ) {
            fieldsToFix.push(propMatch[key][nestedKey] || nestedKey);
          }
        }
      }
      // Normal field
      else {
        if (key && touched[key]) {
          fieldsToFix.push(propMatch[key] || key);
        }
      }
    }

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
