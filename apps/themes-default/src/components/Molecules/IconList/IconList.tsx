import { Icon } from '@/components/Atoms/Icon/Icon';

type IconListProps = {
  className?: string;
};
export const IconList = ({ className }: IconListProps) => {
  return (
    <ul className={`block space-x-2 ${className ?? ''}`}>
      <li className="inline-block">
        <span className="sr-only">Wheelchair accessible</span>
        <Icon name="Wheelchair" width="24" height="24" title="Wheelchair" />
      </li>
      <li className="inline-block">
        <span className="sr-only">Closed captions</span>
        <Icon name="Captions" width="24" height="24" title="Captions" />
      </li>
    </ul>
  );
};
