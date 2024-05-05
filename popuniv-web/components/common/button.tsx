import { ButtonHTMLAttributes } from 'react';

import classnames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={classnames(
        className,
        'border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100'
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
