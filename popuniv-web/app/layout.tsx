import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '../components/common/navigation';
import classNames from 'classnames';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'popuniv',
	description: 'kigoonworld의 첫 번째 프로젝트',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={classNames(inter.className, 'overflow-y-hidden')}>
				<Navigation />
				<div className="py-16 px-32">{children}</div>
			</body>
		</html>
	);
}
