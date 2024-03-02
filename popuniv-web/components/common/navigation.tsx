'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { deleteToken } from '../../app/actions';
import { dynaPuff } from '../../app/fonts';

const Navigation = () => {
	const path = usePathname();
	const isSigninSignup = path === '/signin' || path === '/signup';

	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		setToken(localStorage.getItem('token'));
	}, []);

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
				<div className={classNames(dynaPuff.className, 'font-bold text-3xl')}>POPUNIV</div>
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
		deleteToken();
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
