'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import { deleteCookie } from '@/app/actions';
import { dynaPuff } from '@/app/fonts';
import { api } from '@/utils/ky';
import useFetch from '@/hooks/common/useFetch';
import type { UserInfo } from '@/models/interface';

const Navigation = () => {
  const path = usePathname();
  const isSigninSignup = path === '/signin' || path === '/signup';

  const { data: user } = useFetch<UserInfo>(() => api.get('api/auth/info'));

  return (
    <nav className='z-[999] flex flex-row justify-between p-8'>
      <Logo />
      {user ? <SignOut /> : !isSigninSignup && <SigninSignUp />}
    </nav>
  );
};

const Logo = () => {
  return (
    <div>
      <Link href='/'>
        <div className={classNames(dynaPuff.className, 'font-bold text-3xl')}>POPUNIV</div>
      </Link>
    </div>
  );
};

const SigninSignUp = () => {
  return (
    <ul className='flex justify-end gap-6'>
      <li>
        <Link href='/signin'>
          <div className='font-semibold'>로그인</div>
        </Link>
      </li>
      <li>
        <Link href='/signup'>
          <div className='font-semibold'>회원가입</div>
        </Link>
      </li>
    </ul>
  );
};

const SignOut = () => {
  const handleClick = () => {
    deleteCookie('token');
    window.location.reload();
  };

  return (
    <button onClick={handleClick}>
      <div className='font-semibold'>로그아웃</div>
    </button>
  );
};

export default Navigation;
