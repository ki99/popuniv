'use client';

interface IButtonProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
}

const Button = ({ onClick, children }: IButtonProps) => {
	return (
		<button
			className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
