import React from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import classnames from 'classnames';

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
        'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      )}
      id={inputId}
      ref={ref}
      {...inputProps}
    />
  );
});

export default Input;
