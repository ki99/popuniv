'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
	// pathname에 따라 로그인 / 회원가입 또는 홈 링크 띄우기
	const path = usePathname();
	const isSigninSignup = path === '/signin' || path === '/signup';

	return <nav>{isSigninSignup ? <Logo /> : <SigninSignUp />}</nav>;
};

const Logo = () => {
	return (
		<div className="flex gap-4 pt-8 pl-16">
			<Link href="/">popuniv</Link>
		</div>
	);
};

const SigninSignUp = () => {
	return (
		<ul className="flex justify-end gap-4 pt-8 pr-16">
			<li>
				<Link href="/signin">로그인</Link>
			</li>
			<li>
				<Link href="/signup">회원가입</Link>
			</li>
		</ul>
	);
};

export default Navigation;
