'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
	const token = localStorage.getItem('token');
	const path = usePathname();
	const isSigninSignup = path === '/signin' || path === '/signup';

	return (
		<nav className="z-[999] flex flex-row justify-between p-8">
			<Logo />
			{token ? <SignOut /> : !isSigninSignup && <SigninSignUp />}
		</nav>
	);
};

const Logo = () => {
	return (
		<div>
			<Link href="/">
				<div className="font-extrabold uppercase tracking-wide">popuniv</div>
			</Link>
		</div>
	);
};

const SigninSignUp = () => {
	return (
		<ul className="flex justify-end gap-6">
			<li>
				<Link href="/signin">
					<div className="font-semibold">로그인</div>
				</Link>
			</li>
			<li>
				<Link href="/signup">
					<div className="font-semibold">회원가입</div>
				</Link>
			</li>
		</ul>
	);
};

const SignOut = () => {
	const handleClick = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};

	return (
		<button onClick={handleClick}>
			<div className="font-semibold">로그아웃</div>
		</button>
	);
};

export default Navigation;
