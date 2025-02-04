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
      className="bg-inherit rounded-md border-none border w-full h-12 p-3 shadow shadow-sky-600/90 hover:shadow-sky-300/100 transition-shadow duration-500 focus:outline-none focus:shadow-green-600/100"
    />
    {error && <span className="text-red-500 font-semibold mt-2">{error?.message}</span>}
  </div>
)};

export default InputUI;