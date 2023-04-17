/* Dependencies */
import React from 'react';
import Head from 'next/head';
import anime from 'animejs';
import classNames from 'classnames';
import { decode } from 'blurhash';

// Helpers
import { generateSrcSet } from '@/helpers/generateSrcSet/generateSrcSet';

// Sizes
const restrictedSize = {
  card: `(max-width: 400px) 300px, 600px`,
};

// Models
export type ImageRatio = '1:1' | '16:9' | '9:10' | '4:3' | 'auto';
type ImageFit =
  | 'object-fill'
  | 'object-cover'
  | 'object-contain'
  | 'object-none'
  | 'object-scale-down';
type ImagePosition =
  | 'object-bottom'
  | 'object-center'
  | 'object-left'
  | 'object-left-bottom'
  | 'object-left-top'
  | 'object-right'
  | 'object-right-bottom'
  | 'object-right-top'
  | 'object-top';

type ImageProps = {
  /**
   * Sets the outer container to position absolute.
   */
  absolute?: boolean;

  /**
   * Sets the accessible text applied to the image.
   */
  altText: string;

  /**
   * Sets the blurhash value to be used.
   */
  blurhash?: string;

  /**
   * Appends additional classes.
   */
  className?: string;

  /**
   * Sets the image source url.
   */
  imageSrc: string;

  /**
   * Lazyload
   */
  lazyload?: boolean;

  /**
   * Sets the image fit style.
   */
  fit: ImageFit;

  /**
   * Sets the image position.
   */
  position: ImagePosition;

  /**
   * Sets the image as a presentation image.
   */
  presentation?: boolean;

  /**
   * Sets the image ratio.
   */
  ratio: ImageRatio;

  /**
   * Restrict src set to a specific size.
   */
  restrictSize?: keyof typeof restrictedSize;
};

/**
 * Image Component
 * @class
 */
export class ImageAtom extends React.Component<ImageProps> {
  /**
   * Container element.
   */
  container: HTMLElement | null = null;
  /**
   * Image element
   */
  imageElement: HTMLElement | null = null;
  /**
   * Canvas Element
   */
  canvas: HTMLCanvasElement | null = null;
  /**
   * Generated image src.
   */
  imageSrcSet: string = '';

  /**
   * Component Reference
   */
  private componentRef: React.RefObject<HTMLDivElement>;

  constructor(props: ImageProps) {
    super(props);
    this.componentRef = React.createRef();
    this.imageSrcSet = generateSrcSet(this.props.imageSrc);
  }

  /**
   * Return the component element.
   */
  get component(): HTMLElement {
    return this.componentRef.current!;
  }

  /**
   * Lifecycle - Component Mount
   */
  componentDidMount(): void {
    this.container = this.component.querySelector('.image')!;
    this.imageElement = this.component.querySelector('img')!;
    this.canvas = this.component.querySelector('canvas')!;
    this.loadImage();
  }

  /**
   * Lifecycle - Component Prop Update
   * @param previousProps - The previous props.
   */
  componentDidUpdate(previousProps: ImageProps): void {
    if (previousProps.imageSrc !== this.props.imageSrc) {
      this.loadImage();
    }
  }

  /**
   * Load the image into view.
   */
  loadImage(): void {
    // Remove existing image src
    this.imageElement!.setAttribute('src', '');
    this.imageElement!.style.opacity = '0';

    // If there is no blurhash just show the new image.
    if (!this.props.blurhash) {
      this.imageElement!.setAttribute('srcSet', this.imageSrcSet);
      anime({
        targets: this.imageElement,
        opacity: [0, 1],
        duration: 200,
        delay: 500, // Prevent image flash
        easing: 'linear',
      });
      return;
    }

    // Render the blurhash
    this.renderBlurHash(() => {
      this.imageElement!.setAttribute('srcSet', this.imageSrcSet);
      anime({
        targets: this.imageElement,
        opacity: [0, 1],
        duration: 200,
        delay: 500, // Prevent image flash
        easing: 'linear',
      });
    });
  }

  /**
   * Renders a canvas blur hash to the user.
   * @param callback - Function that fires on completion.
   */
  renderBlurHash(callback: Function): void {
    if (!this.canvas) {
      return;
    }

    // Convert the blur hash
    const pixels = decode(this.props.blurhash!, 32, 32, 1);

    // Create the canvas context
    const ctx = this.canvas.getContext('2d')!;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Insert the blurhash
    const imageData = ctx.createImageData(32, 32);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    callback();
  }

  /**
   * Lifecycle - Render The Template
   */
  render(): JSX.Element {
    return (
      <>
        {!this.props.lazyload && this.props.lazyload !== undefined && (
          <Head>
            <link
              rel="preload"
              imageSrcSet={this.imageSrcSet}
              href={this.props.imageSrc}
              as="image"
            />
          </Head>
        )}
        <div
          className={classNames(
            'block w-full h-full',
            {
              absolute: this.props.absolute,
              relative: !this.props.absolute,
              'aspect-1': this.props.ratio === '1:1',
              'aspect-w-16 aspect-h-9': this.props.ratio === '16:9',
              'aspect-9-10': this.props.ratio === '9:10',
              'aspect-4-3': this.props.ratio === '4:3',
            },
            this.props.className
          )}
          ref={this.componentRef}
        >
          <canvas
            width="32"
            height="32"
            className="absolute w-full h-full left-0 top-0"
          ></canvas>
          <img
            srcSet="#"
            style={{ opacity: 0 }}
            data-src={this.imageSrcSet}
            {...(this.props.restrictSize && {
              sizes: restrictedSize[this.props.restrictSize],
            })}
            loading={
              this.props.lazyload === undefined || this.props.lazyload
                ? 'lazy'
                : 'eager'
            }
            className={`absolute w-full h-full left-0 top-0 z-0 ${this.props.fit} ${this.props.position}`}
            alt={this.props.presentation ? '' : this.props.altText}
          />
        </div>
      </>
    );
  }
}
