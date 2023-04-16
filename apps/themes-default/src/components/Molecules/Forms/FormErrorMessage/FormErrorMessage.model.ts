import { FormikErrors, FormikTouched } from 'formik';

export interface FormErrorMessageProps {
  /**
   * A Key to value map for name and display text values.
   * Key is the field name and value is the display name.
   */
  propMatch: {
    [key: string]: string;
  };
  /**
   * The formik errors object.
   */
  errors: FormikErrors<any>;
  /**
   * The formik touched object.
   */
  touched: FormikTouched<any>;
}
