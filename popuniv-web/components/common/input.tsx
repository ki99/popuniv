import classnames from 'classnames';
import React from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<FieldValues>;
  label?: string;
  error?: any;
}

const Input = React.forwardRef(function Input(
  { className, label, error, ...inputProps }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const inputId = React.useId();

  return (
    <input
      className={classnames(
        className,
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      )}
      id={inputId}
      ref={ref}
      {...inputProps}
    />
  );
});

export default Input;
