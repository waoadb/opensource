export interface GetDescribedByProps {
  /**
   * Error message.
   */
  error?: string;
  /**
   * Id.
   */
  id: string;
  /**
   * Property name.
   */
  name: string;
  /**
   * Support Text.
   */
  supportText?: string;
  /**
   * Tooltip text.
   */
  toolTip?: string;
}

/**
 * Sets the described by values for the field.
 * @param props - The props to be used.
 * @returns
 */
export const getDescribedBy = (props: GetDescribedByProps): string => {
  let describedBy = '';
  if (props.toolTip) {
    describedBy += `${props.id}_${props.name}-tooltip `;
  }

  if (props.error || props.supportText) {
    describedBy += `${props.id}_${props.name}-help`;
  }

  return describedBy;
};
