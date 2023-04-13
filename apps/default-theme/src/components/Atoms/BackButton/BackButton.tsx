import { Icon } from '@/components/Atoms/DemoIcons/DemoIcons';
type BackButtonProps = {
  className?: string;
  text?: string;
}
export const BackButton = ({ className, text = 'Go back' }: BackButtonProps) => {
  return             <button className={`group inline-flex items-center flex-row gap-2 text-xl ${className ?? 'text-white'}`}>
    <Icon name={'ArrowFullLeft'} width={24} height={24} ariaVisible={false} />
    <span className="underline underline-offset-4">{text}</span>
  </button>;
};
