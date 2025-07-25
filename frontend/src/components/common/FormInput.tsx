interface FormInputProps {
  inputId: string;
  label: string;
  type?: string;
  errorMsg?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput = ({
  inputId,
  label,
  type = "text",
  errorMsg,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div className="flex-col items-center space-x-2">
      <label className="whitespace-nowrap mb-2 w-30" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        name={inputId}
        type={type}
        className={`w-full border p-2 rounded ${
          errorMsg ? "border-red-500 mb-1" : "mb-2"
        }`}
        value={value ?? ""}
        onChange={onChange}
      />
      {errorMsg && <p className="text-red-500 text-sm mb-1">{errorMsg}</p>}
    </div>
  );
};

export default FormInput;
