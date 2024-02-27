'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
	// pathname에 따라 로그인 / 회원가입 또는 홈 링크 띄우기
	const path = usePathname();
	const isSigninSignup = path === '/signin' || path === '/signup';

	return <nav className="z-[999]">{isSigninSignup ? <Logo /> : <SigninSignUp />}</nav>;
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
		<ul className="flex justify-end gap-6 pt-8 pr-16">
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

export default Navigation;
