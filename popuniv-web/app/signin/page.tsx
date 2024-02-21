'use client';

import { useForm } from 'react-hook-form';
import { SigninRequest } from '../../models/interface';
import { post } from '../../utils/http';
import Link from 'next/link';
import Button from '../../components/common/button';
import Input from '../../components/common/input';

const Signin = () => {
	const { register, handleSubmit, formState } = useForm<SigninRequest>({ mode: 'onBlur' });
	const { errors } = formState;

	const fields = {
		loginId: register('loginId', { required: 'Id is required' }),
		password: register('password', {
			required: 'Password is required',
		}),
	};

	async function onSubmit(body: SigninRequest) {
		const data = await post<Response, SigninRequest>('/auth/login', body);
		console.log('로그인>>>', data);
	}

	return (
		<div>
			<h4 className="text-xl font-bold">로그인</h4>
			<div className="my-4">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div>
						<label>아이디</label>
						<Input {...fields.loginId} type="text" required />
						<div className="text-red-400">{errors.loginId?.message?.toString()}</div>
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
					<div className="flex flex-col gap-4 mt-4">
						<Button disabled={formState.isSubmitting}>
							{formState.isSubmitting && <span className="animate-spin"></span>}
							회원가입
						</Button>
						<Link href="/signup">
							아직 계정이 없나요? <u>회원가입</u>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signin;
