'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getUserInfo, setToken } from '../actions';
import Button from '../../components/common/button';
import Input from '../../components/common/input';
import { SigninRequest, SigninResponse } from '../../models/interface';
import { post } from '../../utils/http';

const Signin = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    redirect('/');
  }

  const { register, handleSubmit, formState } = useForm<SigninRequest>({ mode: 'onBlur' });
  const { errors } = formState;

  const fields = {
    email: register('email', { required: 'Id is required' }),
    password: register('password', {
      required: 'Password is required',
    }),
  };

  async function onSubmit(body: SigninRequest) {
    try {
      const res = await post<SigninResponse, SigninRequest>({ url: '/api/auth/login', body });
      const data = res?.data;
      if (data?.token) {
        await localStorage.setItem('token', data.token);
        await setToken(data.token);
        const userInfo = await getUserInfo();
        await localStorage.setItem('user', JSON.stringify(userInfo));
      } else {
        alert('문제가 발생하였습니다 ( ´△｀) 다시 시도해주세요');
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div>
      <h4 className='text-xl font-bold'>로그인</h4>
      <div className='my-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div>
            <label>이메일</label>
            <Input {...fields.email} type='text' required />
            <div className='text-red-400'>{errors.email?.message?.toString()}</div>
          </div>
          <div>
            <label>비밀번호</label>
            <Input
              {...fields.password}
              type='password'
              required
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className='text-red-400'>{errors.password?.message?.toString()}</div>
          </div>
          <div className='flex flex-col gap-4 mt-4'>
            <Button disabled={formState.isSubmitting}>
              {formState.isSubmitting && <span className='animate-spin'></span>}
              로그인
            </Button>
            <Link href='/signup'>
              아직 계정이 없나요? <u>회원가입</u>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
