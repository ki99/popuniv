'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import classNames from 'classnames';

import { deleteToken } from '../../app/actions';
import { dynaPuff } from '../../app/fonts';

interface NavigationProps {
  isAuth: boolean;
}

const Navigation = ({ isAuth }: NavigationProps) => {
  const path = usePathname();
  const isSigninSignup = path === '/signin' || path === '/signup';

  return (
    <nav className="z-[999] flex flex-row justify-between p-8">
      <Logo />
      {isAuth ? <SignOut /> : !isSigninSignup && <SigninSignUp />}
    </nav>
  );
};

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <div className={classNames(dynaPuff.className, 'text-3xl font-bold')}>POPUNIV</div>
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
  const handleClick = async () => {
    await deleteToken();
    await localStorage.removeItem('token');
    await localStorage.removeItem('user');
    await window.location.reload();
  };

  return (
    <button onClick={handleClick}>
      <div className="font-semibold">로그아웃</div>
    </button>
  );
};

export default Navigation;
