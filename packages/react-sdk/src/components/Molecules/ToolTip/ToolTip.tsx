/* Dependencies */
import React from 'react';
import { createPopper } from '@popperjs/core';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Models
type ToolTipPosition =
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

type ToolTipOptions = {
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
};

type Props = {
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
};

/**
 * ToolTip Component
 */
export class ToolTip extends React.Component<Props> {
  /**
   * Component reference.
   */
  componentRef: React.RefObject<HTMLDivElement>;

  /**
   * Tool tip reference.
   */
  toolTipReference: {
    /**
     * Tool tip reference.
     */
    instance: any;
    /**
     * Message element.
     */
    message: HTMLElement;
    /**
     * Trigger element.
     */
    trigger: HTMLElement;
  } | null = null;

  /**
   * Tooltip config.
   */
  public config: ToolTipOptions[] = [
    {
      name: 'offset',
      options: {
        offset: [8, 8],
      },
    },
  ];

  constructor(props: Props) {
    super(props);
    this.componentRef = React.createRef();
  }

  /**
   * Retrieve the current component.
   */
  get component(): HTMLElement {
    return this.componentRef.current!;
  }

  /**
   * Lifecycle - Mount
   */
  public componentDidMount(): void {
    // Select the required elements.
    const message: HTMLElement = this.component.querySelector(
      '[data-tool-tip-message]'
    )!;
    const trigger: HTMLElement = this.component.querySelector(
      '[data-tool-tip-trigger]'
    )!;

    // Set the reference.
    this.toolTipReference = {
      instance: createPopper(trigger, message, {
        placement: this.props.position,
        modifiers: [...this.config],
      }),
      message,
      trigger,
    };

    // Bind the interaction events.
    this.bindEvents();
  }

  /**
   * Binds interaction events to the element.
   */
  public bindEvents(): void {
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach((event) => {
      this.toolTipReference!.trigger.addEventListener(
        event,
        this.show.bind(this)
      );
    });

    hideEvents.forEach((event) => {
      this.toolTipReference!.trigger.addEventListener(
        event,
        this.hide.bind(this)
      );
    });
  }

  /**
   * Set the tool tip as visible.
   */
  public show(): void {
    this.component.setAttribute('data-show', '');

    // Enable the popper scroll and resize events
    this.toolTipReference!.instance.setOptions({
      modifiers: [{ name: 'eventListeners', enabled: true }, ...this.config],
    });

    // We need to tell Popper to update the tooltip position
    // after we show the tooltip, otherwise it will be incorrect
    this.toolTipReference!.instance.update();
  }

  /**
   * Set the tool tip as hidden.
   */
  public hide(): void {
    this.component.removeAttribute('data-show');

    // Disable the popper scroll and resize events
    this.toolTipReference!.instance.setOptions({
      modifiers: [{ name: 'eventListeners', enabled: false }, ...this.config],
    });
  }

  /**
   * Lifecycle - Render
   */
  public render(): JSX.Element {
    return (
      <div className="tool-tip db-w-auto" ref={this.componentRef}>
        <button
          className="db-w-[30px] db-h-[30px]"
          data-tool-tip-trigger
          aria-describedby={this.props.id}
          title="Open Tooltip"
          type="button"
        >
          <QuestionMarkCircleIcon />
        </button>
        <div
          className="tool-tip__message db-bg-white db-hidden db-rounded-3 db-border db-border-black db-border-solid db-px-1 db-z-2 db-py-1 db-min-w-60"
          data-tool-tip-message
          id={this.props.id}
          role="tooltip"
        >
          <p className="my-0">{this.props.content}</p>
        </div>
      </div>
    );
  }
}
