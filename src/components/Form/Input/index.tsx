import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
  error?: FieldError;
}

export function Input({ error, ...rest }: InputProps) {
  return (
    <>
      <input 
      {...rest}
      className={`bg-zinc-900 py-3 px-4 rounded text-xs md:text-sm placeholder:text-zinc-500
      ${error ? "border border-red-600" : "border-transparent"}`}
    />

    {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </>
  );
}