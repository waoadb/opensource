/**
 * Returns the value from a given input element.
 * @param element - The Input element.
 * @param type - The type of element, i.e text, url, email etc.
 */
export const getInputValue = (element: HTMLInputElement, type: string): any => {
  let value: any;

  switch (type) {
    case 'checkbox': {
      value = element.checked;
      break;
    }
    case 'file': {
      value = element.files.length > 0 ? element.files[0] : null;
      break;
    }
    default: {
      value = element.value;
      break;
    }
  }

  return value;
};
