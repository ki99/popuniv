import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...rest }: ButtonProps) => {
	return (
		<button
			className={classnames(
				className,
				'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400'
			)}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
