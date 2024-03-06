'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Button from '../../components/common/button';
import Input from '../../components/common/input';
import { MessageResponse, SelectOption, SignupRequest } from '../../models/interface';
import { post } from '../../utils/http';
import { useState } from 'react';
import GroupList from '../../components/home/list';
import { redirect, useRouter } from 'next/navigation';

const Signup = () => {
	if (typeof window !== 'undefined' && localStorage.getItem('token')) {
		redirect('/');
	}

	const router = useRouter();
	const [selected, setSelected] = useState<SelectOption>();
	const { register, handleSubmit, formState } = useForm<SignupRequest>({ mode: 'onBlur' });
	const { errors } = formState;

	const fields = {
		email: register('email', { required: '이메일을 입력해주세요' }),
		nickname: register('nickname', { required: '닉네임을 입력해주세요' }),
		password: register('password', {
			required: '비밀번호를 입력해주세요',
		}),
		passwordCheck: register('passwordCheck', {
			required: '비밀번호를 한 번 더 입력해주세요',
		}),
	};

	const handleChangeGroup = (group: SelectOption) => {
		setSelected(group);
	};

	const onSubmit = async (body: SignupRequest) => {
		if (!selected?.value) {
			return alert('대학교를 선택해주세요');
		}
		body = Object.assign(body, { selectedId: selected.value });
		try {
			const data = await post<MessageResponse, SignupRequest>({ url: '/auth/join', body });
			if (data) {
				alert('회원가입에 성공하였습니다 ✧*.◟(ˊᗨˋ)◞.*✧');
				router.push('/signin');
			}
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<div>
			<h4 className="text-xl font-bold">회원가입</h4>
			<div className="my-4">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div>
						<label>대학교</label>
						<GroupList onChange={handleChangeGroup} />
					</div>
					<div>
						<label>이메일</label>
						<Input {...fields.email} type="text" required />
						<div className="text-red-400">{errors.email?.message?.toString()}</div>
					</div>
					<div>
						<label>닉네임</label>
						<Input {...fields.nickname} type="text" required />
						<div className="text-red-400">{errors.nickname?.message?.toString()}</div>
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
