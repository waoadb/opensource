/* Dependencies */
import Link from 'next/link';
import classNames from 'classnames';

// Components
import { Icon } from '@/components/Atoms/DemoIcons/DemoIcons';

// Models
type BackButtonProps = {
  /**
   * Class names to be applied to the component.
   */
  className?: string;
  /**
   * Title to be displayed.
   */
  title: string;
  /**
   * Accessible title.
   */
  accessibleTitle: string;
  /**
   * Link to be used.
   */
  href: string;
};

/**
 * Back Button
 * @param props - Component props.
 */
export const BackButton = ({
  className,
  title = 'Go back',
  href,
  accessibleTitle,
}: BackButtonProps) => {
  return (
    <Link
      className={classNames(
        'inline-flex items-center flex-row gap-2 text-lg text-white',
        className
      )}
      href={href}
      title={accessibleTitle}
    >
      <Icon name={'ArrowFullLeft'} width={24} height={24} ariaVisible={false} />
      <span className="underline underline-offset-4">{title}</span>
    </Link>
  );
};
