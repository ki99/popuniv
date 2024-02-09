'use client';

import { useState } from 'react';
import ClickBox from '../../components/home/box';
import DashBoard from '../../components/home/dashboard';
import Button from '../../components/common/button';

const Home = () => {
	const [resetCount, setResetCount] = useState(false);

	const handleResetCount = () => {
		setResetCount(!resetCount);
	};

	const handleClickSignup = () => {
		// 회원가입 버튼을 클릭했을 때 수행할 동작을 여기에 작성합니다.
		console.log('회원가입 버튼 클릭');
	};

	const handleClickSignin = () => {
		// 회원가입 버튼을 클릭했을 때 수행할 동작을 여기에 작성합니다.
		console.log('로그인 버튼 클릭');
	};

	return (
		<div className="h-full py-8 px-48">
			<div className="flex justify-end gap-4 pb-20">
				<Button onClick={handleClickSignup}>로그인</Button>
				<Button onClick={handleClickSignin}>회원가입</Button>
			</div>
			<div className="grid grid-cols-2 gap-8">
				<ClickBox handleResetCount={handleResetCount} />
				<DashBoard key={Number(resetCount)} />
			</div>
		</div>
	);
};

export default Home;
