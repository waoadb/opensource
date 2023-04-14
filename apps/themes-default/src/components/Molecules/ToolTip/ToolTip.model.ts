/**
 * Tooltip position.
 */
export type ToolTipPosition =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface ToolTipOptions {
  /**
   * Name
   */
  name: string;
  /**
   * Options
   */
  options: {
    /**
     * Offset
     */
    offset: number[];
  };
}

export interface ToolTipProps {
  /**
   * The component id.
   */
  id: string;

  /**
   * The text content to be rendered within the component.
   */
  content: string;

  /**
   * The desired position of the tooltip
   */
  position: ToolTipPosition;
}
