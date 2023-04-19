type CheckboxProps = {
  id: string;
  name: string;
  label: string;
};
export const Checkbox = ({ id, name, label }: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className="db-flex db-gap-2 db-flex-row db-flex-nowrap db-items-center db-w-full db-cursor-pointer"
    >
      <input
        type="checkbox"
        name={name}
        id={id}
        className="db-transition-colors db-border-2 db-border-gray-400 checked:db-bg-indigo-600 hover:db-border-indigo-600 db-rounded-sm focus:db-outline-indigo-600 hover:db-checked:db-bg-indigo-600 focus:checked:db-bg-indigo-600"
      />
      <span>{label}</span>
    </label>
  );
};
