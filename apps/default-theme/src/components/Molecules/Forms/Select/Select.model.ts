export type SelectProps = {
  id: string;
  name?: string;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
  selectClassName?: string;
  labelVisible?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    value: string;
    text: string;
  }[]
}
