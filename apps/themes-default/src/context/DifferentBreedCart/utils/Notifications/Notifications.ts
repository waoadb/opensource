/* Depedencies */
import { uniqueId } from '../../../../helpers/uniqueId/uniqueId';

// Models
export type NotificationItem = {
  /**
   * Unique Id
   */
  id: string;
  /**
   * Title
   */
  title: string;
  /**
   * Content
   */
  content: string;
  /**
   * Type
   */
  type: 'success' | 'warning' | 'error' | 'info';
  /**
   * Aria Live Attribute
   */
  ariaLive?: 'polite' | 'assertive' | 'off';
};
type Listener = (item: NotificationItem) => void;

/**
 * Notifications
 * @class
 */
class Notifications {
  /**
   * Event Listeners
   */
  public listeners: Array<Listener> = [];

  /**
   * Adds a listener for the toast service.
   * @param listener - The function to fire when a toast is fired.
   */
  public listen(listener: Listener): void {
    this.listeners.push(listener);
  }

  /**
   * Removes a listener for the toast service.
   * @param listener - The function to remove.
   */
  public unlisten(listener: Listener): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  /**
   * Sets the toast notification to be shown.
   * @param item - The toast item to be shown.
   */
  public setToast(item: NotificationItem): void {
    this.listeners.forEach((listener) => listener(item));
  }

  /**
   * Sets a success notification.
   * @param title - The title of the toast.
   * @param message - The message to be shown.
   */
  public showSuccessToast(title: string, message: string): void {
    this.setToast({
      id: uniqueId(),
      title,
      content: message,
      type: 'success',
      ariaLive: 'polite',
    });
  }

  /**
   * Sets a warning notification.
   * @param title - The title of the toast.
   * @param message - The message to be shown.
   */
  public showWarningToast(title: string, message: string): void {
    this.setToast({
      id: uniqueId(),
      title,
      content: message,
      type: 'warning',
      ariaLive: 'polite',
    });
  }

  /**
   * Sets an error notification.
   * @param title - The title of the toast.
   * @param message - The message to be shown.
   */
  public showErrorToast(title: string, message: string): void {
    this.setToast({
      id: uniqueId(),
      title,
      content: message,
      type: 'error',
      ariaLive: 'assertive',
    });
  }

  /**
   * Sets an information notification.
   * @param title - The title of the toast.
   * @param message - The message to be shown.
   */
  public showInformationToast(title: string, message: string): void {
    this.setToast({
      id: uniqueId(),
      title,
      content: message,
      type: 'info',
      ariaLive: 'polite',
    });
  }
}

// Exports
export const notifications = new Notifications();
