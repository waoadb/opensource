type RadioProps = {
  id: string;
  name: string;
  label: string;
}
export const Radio = ({ id, name, label }: RadioProps) => {
  return (
    <label htmlFor={id} className="flex gap-2 flex-row flex-nowrap items-center w-full cursor-pointer">
      <input type='radio' name={name} id={id} className="transition-colors border-2 border-gray-400 checked:bg-indigo-600 hover:border-indigo-600 rounded-full focus:outline-indigo-600 hover:checked:bg-indigo-600 focus:checked:bg-indigo-600"/>
      <span>{label}</span>
    </label>
  );
};
