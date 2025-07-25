interface FormSelectProps {
  inputId: string;
  label: string;
  errorMsg?: string;
  listItems: Array<{ id: number; name: string }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const FormSelect = ({
  inputId,
  label,
  errorMsg,
  listItems,
  value,
  onChange,
}: FormSelectProps) => {
  return (
    <div className="flex-col items-center space-x-2 relative mb-2">
      <label className="whitespace-nowrap mb-2 w-34" htmlFor={inputId}>
        {label}
      </label>
      <select
        id={inputId}
        name={inputId}
        className={`w-full border p-2 rounded ${
          errorMsg ? "border-red-500 mb-1" : "mb-2"
        }`}
        value={value ?? ""}
        onChange={onChange}
      >
        <option value="">-- Select {label} --</option>
        {listItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {errorMsg && <p className="text-red-500 text-sm mb-1">{errorMsg}</p>}
    </div>
  );
};

export default FormSelect;
