import { FieldError, FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

type inputProps = {
  id : string;
  type : string;
  labelText : string;
  error?: FieldError;
  register : UseFormRegisterReturn
}

function InputUI ({id,type,labelText,error,register} : inputProps) {
  return (
  <div className="grid gap-2">
    <label htmlFor={id} className="text-sm sm:text-base">{labelText} <span className="text-red-500 font-semibold">*</span> </label>
    <input
      type={type}
      id={id}
      {...register}
      className="w-full h-12 p-3 border border-gray-700 rounded-md bg-gray-900/90 text-gray-300 placeholder-gray-400 shadow shadow-gray-600 outline-none focus:ring-1 focus:ring-green-900 focus:border-green-900 transition-all duration-300"
    />
    {error && <span className="text-red-500 font-semibold mt-2 pl-1">{error?.message}</span>}
  </div>
)};

export default InputUI;
