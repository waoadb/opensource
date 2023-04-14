/* Dependencies */
import { FormikErrors, FormikTouched } from 'formik';

/**
 * Form Array Error Check
 * @param objectId - The object to be checked.
 * @param name - The property name to be checked.
 * @param index - The index to be checked.
 * @param errors - The Formik errors object.
 * @param touched - The Formik touched object.
 * @returns
 */
export const formArrayErrorCheck = <T>(
  objectId: string,
  name: string,
  index: number,
  errors: FormikErrors<T>,
  touched: FormikTouched<T>
): boolean => {
  if (!errors[objectId] || !touched[objectId]) {
    return false;
  }

  if (!errors[objectId][index] || !touched[objectId][index]) {
    return false;
  }

  if (!errors[objectId][index][name] || !touched[objectId][index][name]) {
    return false;
  }

  return true;
};
