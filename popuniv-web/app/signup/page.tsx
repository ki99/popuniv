'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Button from '../../components/common/button';
import Input from '../../components/common/input';
import { SignupRequest } from '../../models/interface';
import { post } from '../../utils/http';

const Signup = () => {
	const { register, handleSubmit, formState } = useForm<SignupRequest>({ mode: 'onBlur' });
	const { errors } = formState;

	const fields = {
		loginId: register('loginId', { required: 'Id is required' }),
		password: register('password', {
			required: 'Password is required',
		}),
		passwordCheck: register('passwordCheck', {
			required: 'Password is required',
		}),
		nickname: register('nickname', { required: 'Nickname is required' }),
		email: register('email', { required: 'Email is required' }),
	};

	async function onSubmit(body: SignupRequest) {
		const data = await post<{}, SignupRequest>('/auth/join', body);
		console.log('회원가입>>>', data);
	}

	return (
		<div>
			<h4 className="text-xl font-bold">회원가입</h4>
			<div className="my-4">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div>
						<label>아이디</label>
						<Input {...fields.loginId} type="text" required />
						<div className="text-red-400">{errors.loginId?.message?.toString()}</div>
					</div>
					<div>
						<label>닉네임</label>
						<Input {...fields.nickname} type="text" required />
						<div className="text-red-400">{errors.nickname?.message?.toString()}</div>
					</div>
					<div>
						<label>이메일</label>
						<Input {...fields.email} type="text" required />
						<div className="text-red-400">{errors.email?.message?.toString()}</div>
					</div>
					<div>
						<label>비밀번호</label>
						<Input
							{...fields.password}
							type="password"
							required
							className={`form-control ${errors.password ? 'is-invalid' : ''}`}
						/>
						<div className="text-red-400">{errors.password?.message?.toString()}</div>
					</div>
					<div>
						<label>비밀번호 확인</label>
						<Input {...fields.passwordCheck} type="password" required />
						<div className="text-red-400">{errors.passwordCheck?.message?.toString()}</div>
					</div>
					<div className="flex flex-col gap-4 mt-4">
						<Button disabled={formState.isSubmitting}>
							{formState.isSubmitting && <span className="animate-spin"></span>}
							회원가입
						</Button>
						<Link href="/signin">
							이미 계정이 있나요? <u>로그인</u>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
