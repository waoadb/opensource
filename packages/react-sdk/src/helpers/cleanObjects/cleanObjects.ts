/**
 * Clean objects
 * Converts all blank strings to null values.
 * @param obj - The object to be cleaned.
 */
export const cleanObjects = (obj: any): any => {
  // Loop through the object.
  Object.keys(obj).forEach((key) => {
    // If the value is an object, clean it.
    if (obj[key] && typeof obj[key] === 'object') {
      cleanObjects(obj[key]);
    }
    // If the value is an empty string, set it to null.
    else if (obj[key] === '') {
      obj[key] = null;
    }
  });

  // Return the cleaned object.
  return obj;
};
