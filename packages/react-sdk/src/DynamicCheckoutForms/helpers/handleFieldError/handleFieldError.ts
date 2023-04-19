/* Dependencies */
import { FormikErrors, FormikTouched, getIn } from 'formik';

/**
 * Handle Field errors.
 * @param errors - Formik Errors
 * @param touched - Formik Touched
 * @param property - Property to check
 * @returns
 */
export const handleFieldError = <T>(
  errors: FormikErrors<T>,
  touched: FormikTouched<T>,
  property: string
) => {
  return getIn(errors, property) && getIn(touched, property)
    ? getIn(errors, property)
    : undefined;
};
