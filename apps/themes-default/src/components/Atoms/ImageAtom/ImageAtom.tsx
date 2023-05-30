/* Dependencies */
import {
  useEffect,
  useCallback,
  FunctionComponent,
  useRef,
  useMemo,
} from 'react';
import Head from 'next/head';
import anime from 'animejs';
import classNames from 'classnames';
import { decode } from 'blurhash';

// Helpers
import { generateSrcSet } from '@/helpers/generateSrcSet/generateSrcSet';
import { getBlurhashUrl } from '@/helpers/getBlurhashUrl/getBlurhashUrl';

// Sizes
const restrictedSize = {
  card: `(max-width: 400px) 300px, (max-width: 500px) 475px, 600px`,
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
   * If a blurhash should be used.
   */
  blurhash?: boolean;

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
export const ImageAtom: FunctionComponent<ImageProps> = ({
  absolute = false,
  altText = '',
  blurhash = true,
  className = '',
  fit = 'object-cover',
  imageSrc = '',
  position = 'object-center',
  presentation = false,
  ratio = 'ratio-16-9',
  restrictSize,
  lazyload = true,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageSrcSet = useMemo(() => generateSrcSet(imageSrc), [imageSrc]);

  const loadBlurhash = useCallback(async () => {
    // Retrieve the blurhash string
    const blurhashString = await fetch(getBlurhashUrl(imageSrc))
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Image not found');
        }
        return response.text();
      })
      .catch(() => '');

    // Handle invalid blurhash
    if (!blurhashString) {
      loadNormalImage();
      return;
    }

    // Convert the blur hash
    const pixels = decode(blurhashString, 32, 32, 1);

    // Create the canvas context
    const ctx = canvasRef.current!.getContext('2d');
    ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    // Insert the blurhash
    const imageData = ctx!.createImageData(32, 32);
    imageData.data.set(pixels);
    ctx!.putImageData(imageData, 0, 0);

    // Render the image
    imageRef.current!.setAttribute('srcSet', imageSrcSet);
    anime({
      targets: imageRef.current,
      opacity: [0, 1],
      duration: 200,
      delay: 500, // Prevent image flash
      easing: 'linear',
    });
  }, [imageSrc, canvasRef]);

  const loadNormalImage = useCallback(() => {
    imageRef.current!.setAttribute('srcSet', imageSrcSet);
    anime({
      targets: imageRef.current,
      opacity: [0, 1],
      duration: 200,
      delay: 500, // Prevent image flash
      easing: 'linear',
    });
  }, [imageSrc, imageRef]);

  useEffect(() => {
    // Remove existing image src
    imageRef.current!.setAttribute('srcSet', '');
    imageRef.current!.style.opacity = '0';

    // If there is no blurhash just show the new image.
    if (!blurhash || imageSrc.includes('.svg')) {
      loadNormalImage();
    } else {
      loadBlurhash();
    }
  }, [imageSrc]);

  return (
    <>
      {!lazyload && lazyload !== undefined && (
        <Head>
          <link
            rel="preload"
            imageSrcSet={imageSrcSet}
            href={imageSrc}
            as="image"
          />
        </Head>
      )}
      <div
        className={classNames(
          'block w-full h-full',
          {
            absolute: absolute,
            relative: !absolute,
            'aspect-1': ratio === '1:1',
            'aspect-w-16 aspect-h-9': ratio === '16:9',
            'aspect-9-10': ratio === '9:10',
            'aspect-4-3': ratio === '4:3',
          },
          className
        )}
      >
        <canvas
          width="32"
          height="32"
          className="absolute w-full h-full left-0 top-0"
          ref={canvasRef}
        ></canvas>
        <img
          src="#"
          style={{ opacity: 0 }}
          data-src={imageSrcSet}
          {...(restrictSize && {
            sizes: restrictedSize[restrictSize],
          })}
          loading={lazyload === undefined || lazyload ? 'lazy' : 'eager'}
          className={`absolute w-full h-full left-0 top-0 z-0 ${fit} ${position}`}
          alt={presentation ? '' : altText}
          ref={imageRef}
        />
      </div>
    </>
  );
};
